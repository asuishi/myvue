/**
 * @authors     : asuishi
 * @date        : 17-3-19
 * @version     : 1.0
 * @description : Observer，实现对viewModel的监视，当发生变更时发出变更消息
 */

import Dep from './dep'

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
		Object.defineProperty(obj,key,{
			get(){
				if(Dep.target){
					// (dep.subs.indexOf(Dep.target)<0 ) && dep.addSub(Dep.target);
					dep.addSub(Dep.target);
				}
				return val;
			},
			set(v){
				if(v == val){
					return;
				}
				val = v;
				dep.notify();
			}
		});
	}
}