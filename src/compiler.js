import utils from './utils/index';

import watcher from './watcher'

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
		})
	}

	compileTextNode(node){
		let reg = /\{\{([^\{\}]*)\}\}/;
		if(reg.test(node.nodeValue)){
			let name = RegExp.$1.trim();
			// node.nodeValue = this.$vm[directive];
			new watcher(name,this.$vm,(newValue)=>{
				node.nodeValue = newValue;
			})
		}
	}

	compileElementNode(node){
		utils.slice.call(node.attributes).forEach(attr =>{
			if(attr.nodeName === 'v-model'){
				let name = attr.nodeValue
				// node.value = this.$vm[name];

				node.addEventListener('input',(e)=>{
					this.$vm[name] = e.target.value;

				})
				new watcher(name,this.$vm,(newValue)=>{
					node.value = newValue;
				})
				node.removeAttribute('v-model');
			}

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