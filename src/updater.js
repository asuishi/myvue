export default {
	model:function(node,val){
		node.value = val;
	},
	text:function(node,val){
		node.textContent = val;
	},
	checkbox:function(node,val){
		if(typeof val ==="boolean"){
			node.checked = val;
		}else{
			let value = node.value;
			console.log(value);
		}
		
	},
	radio:function(node,val){
		let value = node.value;
		if(val == value){
			node.checked = true;
		}else{
			node.checked = false;
		}
	},
	show(node,val){
		node.style.display = val?'initial':'none'; 
	},

	if:function(node,val,refNode){
		if(val){
			refNode.parentNode.insertBefore(node,refNode);
		}else{
			refNode.parentNode.removeChild(node);
		}
	}
}