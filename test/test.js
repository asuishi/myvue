let myvue = require("../dist/bundle.js");


function log(content){
    console.log(content);
}




var MyComponent = myvue.extend({
    props: {
    	myMessage:'',
    	dynamic:'',
    },
    methods:{
    	input:function(){
    		this.$emit('event');
    	}
    },
    template:'<div><span>{{ myMessage }}</span><div v-on:click="input">{{ dynamic }}</div></div>'
});

myvue.component('child', MyComponent);

myvue.directive('html', {
    update (value) {
        this.node.innerHTML = value;
    }
});

window.ob = new myvue({
	el:'#root', 
	data:{
	    text: 'texfgt',
        html:"<p>提示：此题考查的是分数混合运算的简便计算。</p><p>解答：带分数可以拆分成一个整数和一个真分数，故：<img latex=\"1\\frac{4}{5} ＝1 + \\frac{4}{5} \" src=\"http://cdn.17zuoye.com/fs-image/118497c220bd8767ec3704a97aa3a727\" width=\"73\" height=\"35\" density=\"105\">，根据乘法分配律进行简便计算：<img latex=\"1\\frac{4}{5} \\times 25＝（1 + \\frac{4}{5} ）\\times 25＝1\\times 25 + \\frac{4}{5} \\times 25\n\" src=\"http://cdn.17zuoye.com/fs-resource/55f290a62ed9b62c8548d93e\" _src=\"http://cdn.17zuoye.com/fs-resource/55f290a62ed9b62c8548d93e\" width=\"373\" height=\"46\">，故此题答案为1。</p>",
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
		message:'components message',
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
	        this.$emit("a",this.text);
	    },
	    componentEvent:function(){
	    	console.log('componentEvent');
	    	this.text = "vm.$parent"
	    }
	}
});

ob.$on("a",(args)=>{
	console.log("a is invoke " + args);
})


ob.text = 'new message' // 更改数据
log(ob.$el.querySelector('input').value === 'new message') // false
ob.$nextTick(function () {
  log(ob.$el.querySelector('input').value === 'new message') // true
})
