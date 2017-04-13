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
        if(fragment.hasChildNodes()){
            this.compilerNodeList(fragment.childNodes,vm)
        }
    }

    compilerNodeList(nodeList,vm){
        let ele;
        for(let i=0,len=nodeList.length;i<len;i++){
            ele = nodeList[i];
            if (isIgnorable(ele)) {
                continue;
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
        }
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

        

        let attrs = node.hasAttributes() && utils.slice.call(node.attributes);

        let terminal; // 是否有 终止 指令
        let lazy;

        if(attrs){
            terminal = _checkTerminalDirectives(node,attrs,vm);
        }

        if(!terminal){
            if(_checkComponentDirs(node,vm)){
                return;   
            }
        }
        if(!terminal &&　attrs){
            attrs.forEach(attr => {
                let token = getDirective(attr,vm.$options);
                if (token) {
                     // 绑定指令
                    new Directive(token,vm,node);
                    
                }
            });
        }
        if(!terminal){
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


// 高优先级指令
const PRIORITY_DIRECTIVES = ['for','if'];

function _checkTerminalDirectives(node,attrs,vm){
    let priorityAttr;
    let attr;
    for(let j=0,l=attrs.length;j<l;j++){
        attr = attrs[j];
        for(let i=0,len=PRIORITY_DIRECTIVES.length;i<len;i++){
            priorityAttr = 'v-' + PRIORITY_DIRECTIVES[i];
        
            if(attr.name == priorityAttr ){
                let directive = getDirective(attr,vm.$options);
                if (directive) {
                     // 绑定指令
                    new Directive(directive,vm,node);
                    return true;
                }
            }
        }
    }
    return false;
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
