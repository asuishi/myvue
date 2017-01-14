import util from './utils/index';

export default class Observer{
	constructor(data){
		Object.assign(this,data);
		this.walk(this);
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
		Object.defineProperty(obj,key,{
			get(){
				console.log("get is invoke");
				return val;
			},
			set(v){
				if(v == val){
					return;
				}
				console.log("set is invoke");
				val = v;
			}
		});
	}
}