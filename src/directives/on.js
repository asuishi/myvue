export default {
    update(value) {
    	let node = this.node,
	    prop = this.prop,
	    scope = this.vm,
	    expression = this.expression;
	    if(typeof value == "function"){
	    	node.addEventListener(prop, value.bind(scope))
	    }else{
	        node.addEventListener(prop, scope[expression].bind(scope))
	    }

    }
}
