export default {
    bind() {
        let {name,raw} = this.expression;
        let parent = this.vm.$parent;
        this.vm.$data[name] = parent[raw];
    },

    update(value) {
    	let {name,raw} = this.expression;
        let parent = this.vm.$parent;
        this.vm[name] = parent[raw];
    }
}
