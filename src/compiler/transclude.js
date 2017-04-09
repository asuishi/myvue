export default function(options) {
    let tpl = options.template,
        $el;

    if(tpl){
        let parser = new DOMParser();
        let doc = parser.parseFromString(tpl, 'text/html');
        $el = doc.querySelector('body').firstChild;
    }else{
        $el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el || document.body;
    }
    return $el;
};
