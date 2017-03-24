let  myvue = require( "../dist/bundle.js");
window.ob = new myvue('root',{
	text:'text',
	checkbox:false,
	checkArray:[],
	picked:'',
	doclick:function(){
		this.text = "text"
	}
});