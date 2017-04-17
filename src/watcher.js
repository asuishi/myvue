import Dep from './dep'
import utils from './utils/index'
import Batcher from './batcher'
import {parseExpression,computeExpression} from './parse/expression'


const batcher = Batcher();
let id = 0;

export default class Watcher{
	constructor(exp,scope,callback){
		this.value = null;
		this.exp = exp;
		this.scope = scope;
		this.callback = callback;
		this.id = id++;
		Dep.target = this;
		this.update();
		Dep.target = null;
	}

	update(){
		let newValue = this.get();
		this.value = newValue;
		batcher.pushWatcher(this);
			
	// 	debugger
	// 	if(!utils.isEqual(this.value,newValue)){
	// 		debugger
	// 		console.log("update.........................");
	// 		this.value = newValue;
	// 		if(this.iswatch){
	// 			this.callback(newValue);
	// 			return;
	// 		}
			
	// 	}
	}
	
	get(){
		let fn = computeExpression(this.exp,this.scope);
		return fn(this.scope);
	}
}