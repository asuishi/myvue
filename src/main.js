import {observe} from "./observer/index"
import compiler from "./compiler/compile"
import directives from "./directives/index"

import dataAPI from './instance/api/data'

import installGlobalAPI from './global-api'
import {compileProps,applyProps} from './compiler/compile-props'



export default class myvue {
    constructor(options) {

        this._init(options);
    }


    _init(options){
         // this._data = (new observer(data)).data;
        options = Object.assign({}, // 添加默认属性
            {
                computed: {},
                methods: {},
                data: {},
                props:{},
            },
            options,
            this.constructor.options
        );

        this.$options = options;
        this.$data = options.data;
        this.$compiler = compiler;
        this.$children = [];


        this.$parent = options.parent; // 组件
        if(this.$parent){
            this.$parent.$children.push(this);
        }

        this._initProps(options);       
        
        observe(this.$data);

        this._proxy(options);
        this._proxyComputed(options);
        this._proxyMethods(options.methods);
        this.initWatch();

        new compiler(options, this);
    }

    _proxy(options) {
        const self = this;
        for (let d in options.data) {
            Object.defineProperty(self, d, {
                enumerable: true, // 枚举
                configurable: false, // 不可再配置
                get() {
                    return self.$data[d];
                },
                set(v) {
                    if (v == self.$data[d]) {
                        return;
                    }
                    self.$data[d] = v;
                }
            });
        }
    }

    _proxyComputed(options) {
        const self = this;
        for (let d in options.computed) {
            Object.defineProperty(self, d, {
                enumerable: true, // 枚举
                configurable: false, // 不可再配置
                get() {
                    if (self.$options.computed[d].get) {
                        return self.$options.computed[d].get.call(self)
                    } else {
                        return self.$options.computed[d].call(self);
                    }

                },
                set(v) {
                    if (v == self.$options.computed[d]) {
                        return;
                    }
                    if (self.$options.computed[d].set) {
                        self.$options.computed[d].set.call(self, v)
                    }
                }
            });
        }
    }
        /**
        	方法添加到 vm
        */
    _proxyMethods(methods) {
        Object.keys(methods).forEach(m => {
            this[m] = this.$options.methods[m];
        });
    }



    _initProps(options){
        let {props,el,isComponent} = options;
        let compiledProps;
        if(isComponent ){
           compiledProps = compileProps(el,props,this);
           applyProps(compiledProps,this);
        }
    }

    initWatch(){
        registerCallbacks(this,'$watch',this.$options.watch);
    }
}
dataAPI(myvue);
installGlobalAPI(myvue);

myvue.options = {
    directives,
    components:{},
};
window.myvue = myvue;

function registerCallbacks(scope,action,hash){
    if(!hash){
        return;
    }
    let key;

    for(let key in hash){
       scope[action](key,hash[key].bind(scope)) 
    }
}
