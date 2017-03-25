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


export default {toString,slice,isEqual,deepCopy}