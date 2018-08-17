export default class Dep{
	constructor(key){
		this.key = key
		this.subs = [];
	}

	addSub(sub){
		this.subs.push(sub);
	}

	notify(){
		var a  = this.key
		this.subs.forEach(ele=>{
			ele.update();
		})
	}
}