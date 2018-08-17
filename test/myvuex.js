(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.myVuex = factory());
}(this, (function () { 'use strict';

function assert( conditon, msg) {
  if(!conditon) {
    throw new Error(`[Vuex] ${msg}`)
  }
}

function applyMixin (myvue) {
  myvue.mixin({
    beforeCreate: function vuexInit() {
      const options = this.$options;
      // store injection
      if (options.store) {
        this.$store = options.store;
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    } 
  });
}

// let myvue;

class Store {
  constructor(options = {}) {
    // assert(myvue, `must call myvue.use(Vuex) before creating a store instance`);
    const {
      state = {}
    } = options;
    this._committing = true;
    this._mutations = Object.create(null);

    const store = this;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    };
    installModule(this, state, options);
    resetStoreVM(this, state);
    
  }
  get state () {
    return this._vm.state
  }
  set state(v) {
    assert(false, `cannot store state.`);
  }

  commit(type, payload, options) {
    const entry = this._mutations[type];
    this._withCommit(() => {
      entry(payload);
    });
  }
  _withCommit(fn) {
    const committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  }
}

function resetStoreVM(store, state) {
  store._vm = new myvue({
    data: { state },
  });
  enableStrictMode(store);
}
function installModule(store, rootState, module) {
  const {
    mutations
  } = module;

  if (mutations) {
    Object.keys(mutations).forEach(key => {
      const handler = mutations[key];
      const entry = store._mutations[key] = function(payload) {
        handler(store.state, payload);
      };
    });
  }
}
function enableStrictMode(store) {
  store._vm.$watch('state', () => {
    assert(store._committing, `Do not mutate vuex store state outside mutation handlers.`);
  }, { deep: true, sync: true });
}

function install (_Vue) {
  if (myvue) {
    console.error(
      '[vuex] already installed. myvue.use(Vuex) should be called only once.'
    );
    return
  }
  myvue = _Vue;
  applyMixin(myvue);
}

var index = {
  install,
  Store
}

return index;

})));
