/**
 * @authors     : asuishi
 * @date        : 17-3-19
 * @version     : 1.0
 * @description : Observer，实现对viewModel的监视，当发生变更时发出变更消息
 */

import Dep from '../dep'

import {def,isArray} from '../utils/lang'

import {arrayProxyMethod} from './array-argument'

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();  // 每个对象有一个dep,对象的每个属性也有dep,重复???
        
        def(value,'__ob__',this); // 1,数组获取dep; 2,??
        if(isArray(value)){ // array
            this.observeArray(value);
        }else{ // object
            this.walk(value);
        }
    }

    walk(obj) {
        Object.keys(obj).forEach((key) => {
            this.defineReactive(obj, key, obj[key]);
        })
    }

    /**
     * 数据转换主要函数
     */
    defineReactive(obj, key, val) {
        let dep = new Dep(obj);
        let self = this;
        let childObj = observe(val); // 递归

        Object.defineProperty(obj, key, {
            enumerable: true, // 枚举
            configurable: true, // 不可再配置
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newValue) {
                if (newValue == val) {
                    return;
                }
                val = newValue;
                childObj = observe(newValue); // 新添加的属性也要进行转换

                dep.notify();
            }
        });
    }

    /**
     * 数组
     */

    observeArray(arr) {
        arr.__proto__ = arrayProxyMethod;  //添加方法，直接遍历子属性
        arr.forEach(ele => {
            observe(ele);
        })
    }
}


export function observe(data) {
    if (!data || typeof data !== 'object') {  // 终止条件
        return;
    }
    return new Observer(data);
}
