import Watcher from "./watcher";


function noop () {}

export default class Directive{
	constructor(descriptor,vm,node){
		this.vm = vm;
		this.node = node;
		this.descriptor = descriptor;

		this.name = descriptor.name; // 指令名
  		this.expression = descriptor.expression; // 绑定的data
  		this.prop = descriptor.prop;
  		this._bind();
	}

	_bind(){
		let name = this.name;
  		let descriptor = this.descriptor;

  		let attr = 'v-' + name;
  		if(this.prop){
  			attr += `:${this.prop}`;
  		}
    	this.node && this.node.removeAttribute && this.node.removeAttribute(attr)

		// 更新函数
		let def = descriptor.def
		if (typeof def === 'function') {
			this.update = def
		} else {
			Object.assign(this, def);
		}

		// initial bind
		if (this.bind) {
			this.bind();
		}

		if (this.update) {
			this._update = (val, oldVal) => {
				this.update(val, oldVal);
			}
		} else {
			this._update = noop;
		}

		let watcher;
		watcher = this._watcher = new Watcher(
			this.expression,
			this.vm,
			this._update, // callback
			this.prop
		);


		//指令
		/*if(this.name === 'prop'){
			watcher = this._watcher = new Watcher(
				this.expression.raw,
				this.vm.$parent,
				this._update, // callback
				this.prop
			);
		}else{
			watcher = this._watcher = new Watcher(
				this.expression,
				this.vm,
				this._update, // callback
				this.prop
			);
		}*/
	}
}