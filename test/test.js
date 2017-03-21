let  myvue = require( "../dist/bundle.js");
window.ob = new myvue('root',{
	text:'text',
	doclick:()=>{
		console.log("doclick");
	}
});