/**
 * @authors     : asuishi
 * @date        : 17-3-19
 * @version     : 1.0
 * @description : Observer，实现对viewModel的监视，当发生变更时发出变更消息
 */

import Dep from './dep'


const proxyMethods = [
	'pop',
	'push',
	'sort',
	'shift',
	'splice',
	'unshift',
	'reverse'
];

export default class Observer{
	constructor(data){
		this.data = data;
		this.walk(data);
	}

	walk(data){
		// 终止条件
		if(!data || typeof data != 'object' ){
			return;
		}
		Object.keys(data).forEach((key)=>{
			this.defineReactive(data,key,data[key]);
		})	
	}
	defineReactive(obj,key,val){
		let dep = new Dep();
		let self = this;
		// 递归
		if (Array.isArray(val)) {
			self.observeArray(val, dep);  // 递归监视，数组的监视要分开
		} else {
			self.walk(val);   // 递归对象属性到基本类型为止
		}

		Object.defineProperty(obj,key,{
			enumerable  : true,    // 枚举
			configurable: false,   // 不可再配置
			get(){
				Dep.target && dep.addSub(Dep.target);
				return val;
			},
			set(v){
				if(v == val){
					return;
				}
				val = v;
				if(Array.isArray(v)){
					self.observeArray(val);
				}else{					
					self.walk(val);
				}
				
				dep.notify();
			}
		});

	}

	observeArray(arr,dep){
		const self = this;
		const arrayProxy = Object.create(Array.prototype);
		proxyMethods.forEach(method =>{
			const oldMethod = Array.prototype[method];
			arrayProxy[method] = function(){
				let args = [].slice.call(arguments);
				let result = oldMethod.apply(this,args);
				let insert;
				switch(method){
					case 'push':
					case 'unshift':
						insert = args;
						break;
					case 'splice':
						insert = args.slice(2);
				}
				if(insert){
					self.walk(insert)	
				}
				dep.notify();
				return result;
			}
		});
		arr.__proto__ = arrayProxy;
		arr.forEach(ele =>{
			this.walk(ele);
		})
	}
}