export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression;
    	this.attr = "value";
        let compositionLock = false;
        node.addEventListener('compositionstart', (e) => {
            compositionLock = true;
        });
        node.addEventListener('compositionend', (e) => {
            compositionLock = false;
            scope[expression] = e.target.value;
        });
        node.addEventListener('input', (e) => {
            if (compositionLock) {
                return;
            }
            scope[expression] = e.target.value;
        });
    },

    update(value) {
        this.node[this.attr] = value;
    }
}