let myvue = require("../dist/bundle.js");
window.ob = new myvue({
	el:'#root', 
	data:{
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
	    items3:[
	        [
	            { label: '互联网社区的9大特征1' },
	            { label: '互联网社区的9大特征2' }
        	]
        ],
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
		    'font-size': '13px'
		},
		a:1,
		awatch:'watch',
	},
	computed: {
		// 仅读取，值只须为函数
		aDouble: function() {
			return this.text + "computed";
		},
		// 读取和设置
		aPlus: {
			get: function() {
				return this.a + 1
			},
			set: function(v) {
				this.a = v - 1
			}
		}
	},
	watch:{
		a:function(newValue){
			this.awatch = newValue + "watch";
		}
	},
	methods:{
		doclick: function() {
	        this.text = "text"
	    }
	}
});
