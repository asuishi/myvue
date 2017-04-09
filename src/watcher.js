import Dep from './dep'
import utils from './utils/index'
import Batcher from './batcher'


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
		let result = '';
		result = computeExpression(this.exp,this.scope);
		return result;
	}
}

/**`
 * 解析表达式
 */
function computeExpression(exp, scope) {
	let realExp = addScope(exp);
	let fn = new Function('scope','return '  + realExp);
	return fn(scope);
}

/**
* 为变量添加作用域
*/

function addScope(exp){
	let realExp;
	const reg = /\(([^\(\)]+)\)/g;
	if(reg.test(exp)){
		realExp = exp.replace(reg,(match,group)=>{
			return 'scope.' + group;
		})
	}else{
		realExp = "scope." + exp;
	}
	return realExp;
}