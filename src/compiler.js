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
				this.compiler(ele,vm);
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
		utils.slice.call(node.attributes).forEach(attr =>{
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
	}

	textHandler(exp,scope,node,dir){
		this.bindWatch(node,scope,exp,dir);
	}

	onHandler(exp,scope,node,dir,prop){
		node.addEventListener(prop,(e)=>{
			scope[exp].call(scope,e);
		})
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