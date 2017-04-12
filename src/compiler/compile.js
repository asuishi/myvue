import { isIgnorable } from '../utils/index';
import utils from '../utils/index';

import Directive from '../directive'

import { parseDirective } from "../parse/directive"

import _initElement from './transclude'

export default class Compiler {
    constructor(options, vm) {
        
        let $el = vm.$el =  _initElement(options);
        this.$vm = vm;
        this.$fragment = nodeToFragment($el);
        this.compiler(this.$fragment, this.$vm);
        vm.$el.appendChild(this.$fragment);

    }

    compiler(fragment, vm) {
        utils.slice.call(fragment.childNodes).forEach(ele => {
            if (isIgnorable(ele)) {
                return;
            }
            switch (ele.nodeType) {
                case 1:
                    this.compileElementNode(ele, vm)
                    break;
                case 3:
                    this.compileTextNode(ele, vm);
                    break;
                default:
                    break;
            }
        })
    }

    compileTextNode(node, vm) {
        if (/^[\t\n\r\s]+$/.test(node.nodeValue)) {
            return;
        }

        // 解析指令	
       /**
       	*expression:
		*def:指令
		*name:指令名字
		*value:nodevalu
		*/
        let token = parseDirective(node.nodeValue);
        // 绑定指令
        token && (new Directive(token,vm,node));

    }
        /**
        	节点元素，可能的指令有 
        	v-model, v-text, v-bind, v-on, v-for, v-if等
        */
    compileElementNode(node, vm) {
        if(_checkComponentDirs(node,vm)){
            return;   
        }
        let attrs = utils.slice.call(node.attributes);
        let lazy = false;
        attrs.forEach(attr => {
            let token = getDirective(attr,vm.$options);
            if (token) {
                 // 绑定指令
                new Directive(token,vm,node);
                if (token.name === 'for') {
                    lazy = true;
                }
            }
        });
        if (!lazy) {
            this.compiler(node, vm);
        }
    }
}

function nodeToFragment(node) {
    let fragment = document.createDocumentFragment(),
        child;
    while (child = node.firstChild) {
        if (isIgnorable(child)) {
            node.removeChild(child);
        } else {
            fragment.append(child);
        }

    }
    return fragment;
}

function getDirective(attr,options) {
    let token = null,
        attrName = attr.name;
    if (attrName.indexOf('v-') > -1) {
        let parse = attrName.slice(2).split(":");
        token = {
            expression:attr.value,
            def:options.directives[parse[0]],
            name:parse[0],
            prop:parse[1]
        }
    }
    return token;
}

/**
 * 判断节点是否是组件指令,如 <my-component></my-component>
 * 如果是,则构建组件指令
 * @param node {Element}
 * @returns {boolean}
 * @private
 */
function _checkComponentDirs(node,vm) {
    let options = vm.$options;
    let tagName = node.tagName.toLowerCase();
    if (options.components[tagName]) {
        let token = {
            def:options.directives['component'],
            name:tagName,
        }
        new Directive(token, vm, node)
        return true;
    }
};
