import utils from '../utils/index';
export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression,
    	 	prop = this.prop;
        switch (prop) {
            case 'class':
                let originClass = node.getAttribute('class') ? node.getAttribute('class') + ' ' : '';
                this.expression = '"' + originClass + '" +' + utils.parseClassExp(expression, scope);
                break;
            case 'style':
                let originStyle = node.getAttribute('style') ? node.getAttribute('style') + ' ' : '';
                this.expression = '"' + originStyle + ';" +' + utils.parseStyleExp(expression, scope);
                break;
            default:
                break;
        }
    },

    update(val) {
        let node = this.node,
        	prop = this.prop;
       	node.setAttribute(prop, val);
    }
}


