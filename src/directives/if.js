import utils from '../utils/index';
export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression,
    	 	prop = this.prop;  
	        let refNode =  this.refNode = document.createTextNode('');
	        node.parentNode.insertBefore(refNode, node);
	        node.parentNode.removeChild(node);
    },

    update(val) {
        let node = this.node,
        	prop = this.prop,
            scope = this.vm,
        	refNode = this.refNode;
       	if(val){
            let clone = this.node.cloneNode(true);
			refNode.parentNode.insertBefore(clone,refNode);
            new this.vm.$compiler({el:clone}, scope);
		}else{
			refNode.parentNode.removeChild(node);
		}
	}
}