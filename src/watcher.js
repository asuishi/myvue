import Dep from './dep'
import utils from './utils/index'

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
		if(!utils.isEqual(this.value,newValue)){
			this.callback(newValue);
			this.value = utils.deepCopy(newValue);
		}
	}
	
	get(){
		let result = '';
		if(/\./.test(this.exp)){
			let exps = this.exp.split('.');
			result = this.scope[exps[0]];
			exps = exps.slice(1);
			exps.forEach(e =>{
				result = result[e];
			});
		}else{
			result = this.scope[this.exp];
		}
		
		return result;
	}
}