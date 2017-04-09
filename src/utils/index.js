const toString = {}.toString;
const slice = Array.prototype.slice;

function isEqual(a, b) {
	return (
		isObject(a) && isObject(b)
			? JSON.stringify(a) === JSON.stringify(b)
			: a == b
	)
}

/**
 * 是否为对象(包括数组、正则等)
 */
function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}

/**
 * 复制对象，若为对象则深度复制
 */
function deepCopy(from) {
	var r;
	if (isObject(from)) {
		r = JSON.parse(JSON.stringify(from));
	} else {
		r = from;
	}
	return r;
}

// 忽略注释节点和换行节点
export function isIgnorable(node) {
	// ignore comment node || a text node
	var regIgnorable = /^[\t\n\r]+$/;
	return (node.nodeType == 8) || ((node.nodeType == 3) && (regIgnorable.test(node.textContent)));
}

/**
 * 解析class表达式，
 * <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

 */
function parseClassExp(exp,scope) {
	if (!exp) {
		return;
	}
	var regObj = /\{(.+?)\}/g;
	var regArr = /\[(.+?)\]/g;
	var result = [];
	if (regObj.test(exp)) {
		var subExp = exp.replace(/[\s\{\}]/g, '').split(',');
		subExp.forEach(function (sub) {
			var key = '"' + sub.split(':')[0].replace(/['"`]/g, '') + ' "';
			var value = sub.split(':')[1];
			result.push('((' + value + ')?' + key + ':"")')
		});
	} else if (regArr.test(exp)) {
		var subExp = exp.replace(/[\s\[\]]/g, '').split(',');
		result = subExp.map(function (sub) {
			return '(' + sub + ')' + '+" "';
		});
	}else{
		let e  = scope[exp];
		for(let cls in e){
			result.push( '((' + exp +'["'+cls+'"])?"' +cls + ' ":"")' );
		}
	}
	return result.join('+');  // 拼成 (a?"acls ":"")+(b?"bcls ":"")的形式
}


/**
 * 解析style表达式
 * <div v-bind:style="{ color: activeColor, font-size: fontSize }"></div>
 * <div v-bind:style="[baseStyles, overridingStyles]">
 */
function parseStyleExp(exp,scope) {
	if (!exp) {
		return;
	}
	var regObj = /\{(.+?)\}/g;
	var regArr = /\[(.+?)\]/g;
	var result = [];
	
	if (regObj.test(exp)) {
		var subExp = exp.replace(/[\s\{\}]/g, '').split(',');
		subExp.forEach(function (sub) {
			var key = '"' + sub.split(':')[0].replace(/['"`]/g, '') + ':"+';
			var value = '(' + sub.split(':')[1] + ')';
			result.push(key + value + '+";"');
		});
	} else if (regArr.test(exp)) {
		var subExp = exp.replace(/[\s\[\]]/g, '').split(',');
		result = subExp.map(function (sub) {
			return '(' + sub + ')' + '+";"';
		});
	}else{ // 第二种对象语法
		let styles  = scope[exp];
		for(let style in styles){
			var key = '"' + style.replace(/['"`]/g, '') + ':"+';
			var value = '(' + exp +'["' + style+ '"])';
			result.push(key + value + '+";"');
		}
	}
	return result.join('+');  // 拼成 (a?"acls ":"")+(b?"bcls ":"")的形式
}


export default {toString,slice,isEqual,deepCopy,parseClassExp,parseStyleExp}