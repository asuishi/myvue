/**
* Defined a property
*/

export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}


export const isArray = Array.isArray;


export function toArray (list) {
	return [].slice.call(list);
}