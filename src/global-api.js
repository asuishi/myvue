
export default function (myVue) {
    /**
     * 组件构造器
     * 返回组件构造函数
     * @param extendOptions {Object} 组件参数
     * @returns {myVueComponent}
     */
    myVue.extend = function (extendOptions) {
        let Super = this;
        extendOptions = extendOptions || {};
        let Sub = createClass();
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = Object.assign({},Super.options, extendOptions);
        return Sub;
    };

    /**
     * 构造组件构造函数本身
     * 为什么不能直接定义,而要每声明一个组件,都new一个构造函数呢?
     * 因为在extend函数中,我们把options当做自定义属性,
     * 那么就意味着如果我们一直使用同一个构造函数的话, 那么所有组件最终的options都会是一样的
     * 这显然不妥
     * @returns {Function}
     */
    function createClass() {
        return new Function(`return function Component(options){ this._init(options)}`)();  // eslint-disable-line
    }

    /**
     * 注册组件
     * @returns {*}
     */
    myVue.component = function (id, definition) {
        this.options.components[id] = definition;
        return definition;
    };

    myVue.directive = function (id, definition) {
        this.options.directives[id] = definition;
        return definition;
    };
};
