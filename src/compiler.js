import utils from './utils/index';

import watcher from './watcher';

import updater from './updater'

export default class Compiler{
	constructor(el,vm){
		this.$el = document.getElementById(`${el}`);
		this.$vm = vm;
		this.$fragment = nodeToFragment(this.$el);
		this.compiler(this.$fragment,this,vm);
		this.$el.appendChild(this.$fragment);

	}

	compiler(fragment,vm){
		utils.slice.call(fragment.childNodes).forEach(ele=>{
			switch(ele.nodeType){
				case 1:
					this.compileElementNode(ele)
					break;
				case 3:
					this.compileTextNode(ele);
					break;
				default:
					break;		
			}
			if(ele.childNodes){
				this.compiler(ele,vm); //子节点
			}
		})
	}

	compileTextNode(node){
		let reg = /\{\{([^\{\}]*)\}\}/;
		if(reg.test(node.nodeValue)){
			let exp = RegExp.$1.trim();
			this.textHandler(exp,this.$vm,node,'text');
		}
	}
	/**
		节点元素，可能的指令有 
		v-model, v-text, v-bind, v-on, v-for, v-if等
	*/
	compileElementNode(node){
		let attrs = utils.slice.call(node.attributes)
		attrs.forEach(attr =>{
			let directive = getDirective(attr.name);
			if(directive.type){
				let exp = attr.nodeValue
				this[directive.type+'Handler'](exp,this.$vm,node,directive.type,directive.prop);
				node.removeAttribute(attr.name);
			}

		});
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
						// let index = scope[exp].indexOf(value);
						// if(index>-1 && e.target.checked){  //
						// 	scope[exp].push(value);
						// }else if(index<0 && !e.target.checked){
						// 	scope[exp].splice(index,1);
						// }
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

	bindWatch(node,scope,exp,dir){
		let fn = updater[dir];
		new watcher(exp,scope,(newValue)=>{
			fn(node,newValue);
		});
	}

}

function nodeToFragment(node){
	let fragment = document.createDocumentFragment(),
		child;
	while(child = node.firstChild){
		fragment.append(child);
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