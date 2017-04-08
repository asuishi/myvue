export default {
    bind() {
            this.attr = this.node.nodeType === 3 ? 'data' : 'textContent';
    },

    update(value) {
        this.node[this.attr] = value;
    }
}
