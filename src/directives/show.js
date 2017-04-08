export default {
    update(value) {
    	let node = this.node,
	    prop = this.prop,
	    scope = this.vm,
	    expression = this.expression;
       	node.style.display = value?'initial':'none'; 
    }
}
