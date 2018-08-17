let myvue = require("../dist/bundle.js");
window.ob = new myvue({
	el:'#root', 
	data:{
	    text: 'text',
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
	}
});
