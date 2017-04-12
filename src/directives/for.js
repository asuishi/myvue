import utils from '../utils/index';
export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression,
    	 	prop = this.prop;  
		let expObj = expression.split("in");
		this.expression = expObj[1].trim();
		let item = this.item = expObj[0].trim();

        let parentNode =  this.parentNode = node.parentNode;
        let startNode = this.startNode = document.createTextNode('');
        let endNode = this.endNode = document.createTextNode('');


        parentNode.replaceChild(endNode, node); // 去掉原始模板
        parentNode.insertBefore(startNode, endNode);

    },

    update(val) {
        let node = this.node,
        	scope = this.vm;

        let range = document.createRange();
            range.setStart(this.startNode, 0);
            range.setEnd(this.endNode, 0);
            range.deleteContents();
            val.forEach((val, index) => {
                let clone = this.node.cloneNode(true);
                let forscope = Object.create(scope);
                forscope.$index = index;
                forscope[this.item] = val;
                this.parentNode.insertBefore(clone, this.endNode);
                // debugger
                new this.vm.$compiler({el:clone}, forscope);
            });
	}
}