export default function(myVue) {
    myVue.prototype.$on = function(event,fn) {
		(this._events[event] || (this._events[event] = [])).push(fn);
		return this;
    }

    myVue.prototype.$emit = function(event) {

    	if(!(typeof event === 'string')){
    		return;
    	}
    	let cbs = this._events[event];

    	if(cbs){
    		let args = Array.prototype.slice.call(arguments,1);
    		cbs.forEach((fn)=>{
    			fn.apply(this,args);
    		});
    	}
    }
}