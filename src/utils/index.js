const toString = {}.toString;
const slice = Array.prototype.slice;

function isEqual(a, b) {
	return a == b || (
		isObject(a) && isObject(b)
			? JSON.stringify(a) === JSON.stringify(b)
			: false
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
function isIgnorable(node) {
	// ignore comment node || a text node
	var regIgnorable = /^[\t\n\r]+$/;
	return (node.nodeType == 8) || ((node.nodeType == 3) && (regIgnorable.test(node.textContent)));
}


export default {toString,slice,isEqual,deepCopy,isIgnorable}