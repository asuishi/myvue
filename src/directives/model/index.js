import text from './text';
import radio from './radio';
import checkbox from './checkbox'

const handlers = {
  text,
  checkbox,
  radio
}

export default {
    bind() {
        let node = this.node,
            handler = handlers[node.type];
        handler.bind.call(this);
        this.update = handler.update;
    },
}