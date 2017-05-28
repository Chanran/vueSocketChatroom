import {actions} from './store';
import Card from './components/card';
import List from './components/list';
import myText from './components/myText';
import Message from './components/message';
import store from './store.js';
export default {
  components: { Card, List, myText, Message },
  store: store,
  vuex: {
    actions: actions
  }
}
