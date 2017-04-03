import utils from './utils/index';

import watcher from './watcher';

import updater from './updater'

export default class Compiler{
	constructor(el,vm){
		this.$el =el;
		this.$vm = vm;
		this.$fragment = nodeToFragment(this.$el);
		this.compiler(this.$fragment,this.$vm,vm);
		this.$el.appendChild(this.$fragment);

	}

	compiler(fragment,vm){
		utils.slice.call(fragment.childNodes).forEach(ele=>{
			if(utils.isIgnorable(ele)){
				return;
			}
			switch(ele.nodeType){
				case 1:
					this.compileElementNode(ele,vm)
					break;
				case 3:
					this.compileTextNode(ele,vm);
					break;
				default:
					break;		
			}
		})
	}

	compileTextNode(node,vm){
		let reg = /\{\{([^\{\}]*)\}\}/;
		if(reg.test(node.nodeValue)){
			let exp = RegExp.$1.trim();
			this.textHandler(exp,vm,node,'text');
		}
		this.compiler(node,vm);
	}
	/**
		节点元素，可能的指令有 
		v-model, v-text, v-bind, v-on, v-for, v-if等
	*/
	compileElementNode(node,vm){
		let attrs = utils.slice.call(node.attributes);
		let lazy = false;
		attrs.forEach(attr =>{
			let directive = getDirective(attr.name);

			if(directive.type){
				let exp = attr.value;
				this[directive.type+'Handler'](exp,vm,node,directive.type,directive.prop);
				node.removeAttribute(attr.name);
			}
			if(directive.type === 'for'){
				lazy =true;
			}

		});
		if(!lazy){
			this.compiler(node,vm);
		}
	}

	/**
		系列指令处理函数 model text on
	*/
	modelHandler(exp,scope,node,dir){
		switch(node.type){
			case 'checkbox':
				node.addEventListener('change',(e)=>{
					let isArray = Array.isArray(scope[exp]);
					if(isArray){   // 数组形式，待添加
						let value = e.target.value;
						let index = scope[exp].indexOf(value);
						if(index<0 && e.target.checked){  //
							scope[exp].push(value);
						}else if(index>-1 && !e.target.checked){
							scope[exp].splice(index,1);
						}
					}else{
						scope[exp] = e.target.checked;
					}
				});
				this.bindWatch(node,scope,exp,'checkbox');
				break;
			case 'radio':
				node.addEventListener('change',(e)=>{
					scope[exp] = e.target.value;
				});
				this.bindWatch(node,scope,exp,'radio');
				break;	
			case 'file':
				console.log(node);
				break
			default:
				let compositionLock = false;
				node.addEventListener('compositionstart',(e)=>{
					compositionLock = true;
				});
				node.addEventListener('compositionend',(e)=>{
					compositionLock = false;
					scope[exp] = e.target.value;
				});
				node.addEventListener('input',(e)=>{
					if(compositionLock){
						return;
					}
					scope[exp] = e.target.value;
				});
				this.bindWatch(node,scope,exp,dir);
				break;
		}
		
	}

	textHandler(exp,scope,node,dir){
		this.bindWatch(node,scope,exp,dir);
	}

	onHandler(exp,scope,node,dir,prop){
		if(!prop){
			return console.error("事件绑定方式错误");
		}
		node.addEventListener(prop,scope[exp].bind(scope))
	}

	forHandler(exp,scope,node,dir){
		let expObj = exp.split("in");
		let newExp = expObj[1].trim();
		let item = expObj[0].trim();
		let parentNode = node.parentNode;
		let startNode = document.createTextNode('');
		let endNode = document.createTextNode('');
		let range = document.createRange();
		parentNode.replaceChild(endNode, node); // 去掉原始模板
		parentNode.insertBefore(startNode, endNode);
		// parentNode.removeChild(node);
		node.removeAttribute("v-for");
		new watcher(newExp,scope,(newValue)=>{
			// debugger
			// while(parentNode.lastChild){
			// 	parentNode.removeChild(parentNode.lastChild);
			// }
			range.setStart(startNode, 0);
			range.setEnd(endNode, 0);
			range.deleteContents();
			newValue.forEach((val,index) =>{
				let clone = node.cloneNode(true);
				let forscope = Object.create(scope);
				forscope.$index = index;
				forscope[item] = val;
				parentNode.insertBefore(clone,endNode);
				// debugger
				this.compiler(clone,forscope);
			});
		})
	}

	ifHandler(exp,scope,node,dir){
		this.compiler(node, scope);
		const refNode = document.createTextNode('');
		node.parentNode.insertBefore(refNode,node);
		node.parentNode.removeChild(node);
		this.bindWatch(node,scope,exp,dir,refNode)
		// this.bindWatch(node,scope,exp,dir);
	}

	showHandler(exp,scope,node,dir){
		this.bindWatch(node,scope,exp,dir);
	}

	bindHandler(exp,scope,node,dir,prop){
		switch(prop){
			case 'class':
				let originClass = node.getAttribute('class')?node.getAttribute('class') + ' ':'';
				exp = '"' + originClass + '" +'+ utils.parseClassExp(exp,scope);
				break;
			case 'style':
				let originStyle = node.getAttribute('style')?node.getAttribute('style') + ' ':'';
				exp = '"' + originStyle + ';" +'+ utils.parseStyleExp(exp,scope);
				break;
			default:
				break;		
		}
		this.bindWatch(node,scope,exp,dir,prop)
	}

	bindWatch(node,scope,exp,dir,prop){
		let fn = updater[dir];
		new watcher(exp,scope,(newValue)=>{
			fn(node,newValue,prop);
		});
	}



}

function nodeToFragment(node){
	let fragment = document.createDocumentFragment(),
		child;
	while(child = node.firstChild){
		if(utils.isIgnorable(child)){
			node.removeChild(child);
		}else{
			fragment.append(child);
		}
		
	}
	return fragment;
}

function getDirective(attrName){
	const directive = {};
	if(attrName.indexOf('v-')>-1){
		let parse = attrName.slice(2).split(":");
		directive.type = parse[0];
		directive.prop = parse[1];
	}
	return directive;
}