export default {
    bind() {
    	let node = this.node,
    	    scope = this.vm,
    	    expression = this.expression;

        node.addEventListener('change', (e) => {
            let isArray = Array.isArray(scope[expression]);
            if (isArray) {
                let value = e.target.value;
                let index = scope[expression].indexOf(value);
                if (index < 0 && e.target.checked) { //
                    scope[expression].push(value);
                } else if (index > -1 && !e.target.checked) {
                    scope[expression].splice(index, 1);
                }
            } else {
                scope[expression] = e.target.checked;
            }
        });
    },

    update(val) {
        let node = this.node;
        if(typeof val ==="boolean"){
            node.checked = val;
        }else{
            let value = node.value;
            let index = val.indexOf(value);

            if(index<0 && node.checked){
                node.checked = false;
            }else if(index>-1  && !node.checked){
                node.checked = true;
            }
        }
    }
}


