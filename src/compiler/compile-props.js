import Directive from '../directive'

export function compileProps(el,propOptions,vm){
	let  names = Object.keys(propOptions);
	let props = [];

	names.forEach((name)=>{
		let options = propOptions[name] || {};
		let prop = {
            name,
            options
        };
        let value;
        if(value =  getBindAttr(el,name) ){
			prop.raw = value;
			prop.dynamic = true;
        }else if(value =  getAttr(el,name)){
        	prop.raw = value;
			prop.dynamic = false;
        }
        props.push(prop);
	})
	return props;
}


export function applyProps(props,vm){
	props.forEach((prop)=>{
		let {name,raw,dynamic} = prop;
		if (dynamic) {
			let parent = vm.$parent;
			let directives = vm.$options.directives;
            // 动态props
            
            // 指令

            /*let token = {
            	expression:prop,
				def:directives['prop'],
				name:'prop',
				value:'',
            };
            new Directive(token,vm,'');*/


            //  watch
    		parent.$watch(raw,function(newValue){
    			vm.$data[name] = newValue;
    		})
            vm.$data[name] = parent[raw];
        } else {
            vm.$data[name] = raw;
        }
	})
}


function getBindAttr(node,name){
	return getAttr(node,`:${name}`)
}

function getAttr(node,name){
	let val = node.getAttribute(name);
	if(val){
		node.removeAttribute(name);
	}
	return val;
}