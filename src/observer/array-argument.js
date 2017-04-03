import { toArray } from '../utils/lang'

const proxyMethods = [
    'pop',
    'push',
    'sort',
    'shift',
    'splice',
    'unshift',
    'reverse'
];

const arrayProto = Array.prototype;
export const arrayProxyMethod = Object.create(arrayProto);

proxyMethods.forEach(method => {
    const oldMethod = arrayProto[method];
    arrayProxyMethod[method] = function() {
        let args = toArray(arguments);
        let result = oldMethod.apply(this, args);
        let insert;
        const ob = this.__ob__;
        switch (method) {
            case 'push':
            case 'unshift':
                insert = args;
                break;
            case 'splice':
                insert = args.slice(2);
        }
        if (insert) {
            ob.observeArray(insert,this);
        }
        ob.dep.notify();
        return result;
    }
});