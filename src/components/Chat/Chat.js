import {
  Divider,
  Actionsheet,
  XHeader,
  TransferDom,
  Popup,
  Tab,
  TabItem,
  Group } from 'vux';

export default {
  name: 'Chat',
  directives: {
    TransferDom,
  },
  components: {
    Divider,
    Actionsheet,
    XHeader,
    Popup,
    Tab,
    TabItem,
    Group,
  },
  data() {
    return {
      people: [
        {
          label: 'test',
        },
        {
          label: 'test2',
        },
      ],
      talkingTo: -1,
      talkToPeople: [],
      showMenus: false,
    };
  },
  methods: {
    sendMsg() {
      this.$socket.emit('sendMsg', 'test');
    },
    talkToThis(index) {
      this.talkingTo = index;
    },
  },
  beforeMount() {
    this.$options.sockets.private = (data) => {
      console.log(data);
      console.log('test');
    };
  },
};
