/**
* 处理表达式
* 添加scope   a => scope.a
*/

export function parseExpression(exp){
	let realExp;
	const reg = /\(([^\(\)]+)\)/g;
	if(reg.test(exp)){
		realExp = exp.replace(reg,(match,group)=>{
			return '(scope.' + group + ')';
		});
		if(realExp.slice(0,1) != "'" && realExp.slice(0,1) != '"' ){  //  
			realExp = "scope." + realExp;
		}
	}else{
		realExp = "scope." + exp;
	}
	return realExp;
}

/**`
 * 解析表达式
 */
export function computeExpression(exp, scope) {
	let realExp = parseExpression(exp);
	let fn = new Function('scope','return '  + realExp);
	return fn;
}



/**
* 判断 exp 是否是简单表达式  （此处判断是不是函数）
* 此处只处理最简单的情况
* 只要表达式中不包含（）即可
* 限制很多语言，暂时这样处理，待解决
*/

const complexPathRe = /[a-zA-Z]\(.*\)/
export function isSimplePath(exp){
	return  !complexPathRe.test(exp);
}
