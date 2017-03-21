export default {
	model:function(node,val){
		node.value = val;
	},
	text:function(node,val){
		node.nodeValue = val;
	}
}