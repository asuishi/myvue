import utils from '../utils/index';
export default {
    bind() {

        let node = this.node,
            scope = this.vm,
            expression = this.expression,
            name = this.name;

        let anchor = document.createComment(`component`);
        node.parentNode.insertBefore(anchor, node);
        node.parentNode.removeChild(node); 
        

        let Component = this.vm.$options.components[name];

        let options = {
            name: this.name,
            el: this.node.cloneNode(),
            parent: this.vm,
            isComponent: true
        };
        let child = new Component(options);

        anchor.parentNode.insertBefore(child.$el, anchor);
    },

    update(val) {
        
    }
}