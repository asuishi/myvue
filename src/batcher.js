/**
 * 批处理构造函数
 */
class Batcher{
	constructor(){
		this.has = {};
		this.queue = [];
		this.waiting = false;
	}
	reset(){
		this.has = {};
		this.queue = [];
		this.waiting = false;
	}

	pushWatcher(watch) {
	    if (!this.has[watch.id]) {
	        this.queue.push(watch);
	        this.has[watch.id] = watch;
	        if (!this.waiting) {
	            this.waiting = true;
	            setTimeout(() => {
	                // isFlushing, 此字段用来处理多重异步队列的问题
	                this.isFlushing = true;
	                this.flush();
	                this.isFlushing = false;
	            });
	        }
	    }
	}
	flush() {
		let queue = this.queue;
		let watcher;
		for(let i=0;i<queue.length;i++){
			watcher = queue[i];
			watcher.callback(watcher.value);
		};
		this.reset();
	}
}

export default function batcher(){
	return new Batcher();
}
