export default {
    update(value) {
    	let node = this.node,
	    prop = this.prop,
	    scope = this.vm,
	    expression = this.expression;
        node.addEventListener(prop, scope[expression].bind(scope))
    }
}
