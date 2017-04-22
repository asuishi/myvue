let callbacks = [];
let pending = false;
let timerFunc = null;


if(typeof MutationObserver !== 'undefined'){
	let counter = 1,
		observer = new MutationObserver(nextTickHandler),
		textNode = document.createTextNode(counter);
	observer.observe(textNode,{
		characterData:true
	});
	timerFunc = function(){
		counter = (counter + 1)%2; // 1-2-1-2-1
		textNode.data = counter;
	}
}


function nextTickHandler() {
    let cb = null;
    for (let i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        cb();
    }
    callbacks = [];
    pending = false;
}

export const nextTick = function(cb, ctx) {
    let func = ctx 
    	? function() { cb.call(ctx) } 
    	: cb;
    callbacks.push(func);

    if (pending) return; // 只添加一次
    pending = false;
    timerFunc();
}
