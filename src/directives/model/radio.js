export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression;
        node.addEventListener('change', (e) => {
            scope[expression] = e.target.value;
        });
    },

    update(val) {
        let node = this.node,
        	value = node.value;
		if(val == value){
			node.checked = true;
		}else{
			node.checked = false;
		}
    }
}



