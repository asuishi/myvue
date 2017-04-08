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
        	refNode = this.refNode;
       	if(val){
			refNode.parentNode.insertBefore(node,refNode);
		}else{
			refNode.parentNode.removeChild(node);
		}
	}
}