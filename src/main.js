import observer from "./observer"

class myvue{
	constructor(elememt,data){
		this._data = new observer(data);
		console.log(this._data.a);
		this._data.a =5;
		console.log(this._data.a);
	}
}

var ob = new myvue('',{a:3});