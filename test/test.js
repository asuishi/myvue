let  myvue = require( "../dist/bundle.js");
window.ob = new myvue('root',{
	text:'text',
	checkbox:true,
	checkArray:['Jack'],
	picked:'',
	items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ],
    items2: [
      [
      "Hello",
      "World"
    	],
    	[
	      "Hello2",
	      "World2"
    	],
    ],
	doclick:function(){
		this.text = "text"
	},
	show:true,
	ifshow:true,
});