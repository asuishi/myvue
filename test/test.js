let myvue = require("../dist/bundle.js");
window.ob = new myvue('root', {
    text: 'text',
    checkbox: true,
    checkArray: ['Jack'],
    picked: '',
    items: [
        { message: 'Foo' },
        { message: 'Bar' }
    ],
    items2:[{
        tab: '今天',
        datalist: [
            { label: '互联网社区的9大特征1' },
            { label: '互联网社区的9大特征2' }
        ]
    }],
    doclick: function() {
        this.text = "text"
    },
    show: true,
    ifshow: true,
    urlSrc:'http://www.baidu.com',
    id:'black',

    isActive: true,
  	hasError: true,

  	activeClass: 'active',
	errorClass: 'text-danger',
	classObject: {
		active: true,
		'text-danger': false
	},

	activeColor: 'red',
  	fontSize: 30,

  	styleObjectA:'color:orange',
  	styleObjectB:'font-size:80px',


  	styleObject: {
	    color: 'red',
	    fontSize: '13px'
	 }
});
