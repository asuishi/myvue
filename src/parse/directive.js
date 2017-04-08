import directives from "../directives/index"

export function parseDirective (nodeValue) {
	let token;
	let reg = /\{\{([^\{\}]*)\}\}/;
	if(reg.test(nodeValue)){
		let exp = RegExp.$1.trim();
		token = {
			expression:exp,
			def:directives['text'],
			name:'text',
			value:nodeValue,
		}
	}
	return token;
}