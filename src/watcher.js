import Dep from './dep'

export default class Watcher{
	constructor(exp,scope,callback){
		this.value = null;
		this.exp = exp;
		this.scope = scope;
		this.callback = callback;
		Dep.target = this;
		this.update();
		Dep.target = null;
	}

	update(){
		let newValue = this.get();
		if(this.value !== this.newValue){
			this.callback(newValue);
			this.value = newValue;
		}
	}
	
	get(){
		return this.scope[this.exp];
	}
}