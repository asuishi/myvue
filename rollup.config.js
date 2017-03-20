// import json from "rollup-plugin-json";
// import babel from "rollup-plugin-babel";

export default {
	entry:"src/main.js",
	format:"umd",
	 moduleName: 'myvue',
	// plugins:[json()],
	dest:'./dist/bundle.js',
	sourceMap:true,
}