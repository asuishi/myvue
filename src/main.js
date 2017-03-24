import observer from "./observer"
import compiler from "./compiler"

export default class myvue{
	constructor(element,data){
		// this._data = (new observer(data)).data;
		let _data = new observer(data);
		this._proxy(_data,this)
		new compiler(element,data);
	}

	_proxy(data,vm){
		for(let d in data.data){
			Object.defineProperty(vm,d,{
				enumerable  : true,    // 枚举
	        	configurable: false,   // 不可再配置
				get(){
					return data.data[d];
				},
				set(v){
					if(v == data.data[d]){
						return;
					}
					data.data[d] = v;	
				}
			});
		}
	}
}
