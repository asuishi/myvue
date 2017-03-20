import observer from "./observer"
import compiler from "./compiler"

export default class myvue{
	constructor(element,data){
		this._data = (new observer(data)).data;
		new compiler(element,data);
	}
}
