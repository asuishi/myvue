let  myvue = require( "../dist/bundle.js");
window.ob = new myvue('root',{
	text:'text',
	checkbox:false,
	checkArray:[],
	picked:'',
	items: [
      {message: 'Foo' },
      {message: 'Bar' }
    ],
    items2: [
      "Hello",
      "World"
    ],
	doclick:function(){
		this.text = "text"
	},
	show:true,
	ifshow:true,
});