import {
  Divider,
  Actionsheet,
  XHeader,
  TransferDom,
  Popup,
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  XButton,
  XInput,
  Grid,
  GridItem,
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
    Tabbar,
    TabbarItem,
    XButton,
    XInput,
    Grid,
    GridItem,
    Group,
  },
  data() {
    return {
      people: [
        {
          label: 'test',
          value: 'test',
        },
        {
          label: 'test2',
          value: 'test2',
        },
      ],
      talkingTo: -1,
      talkToPeople: [],
      showMenus: false,
      message: '',
    };
  },
  methods: {
    sendMsg() {
      this.$socket.emit('sendMsg', 'test');
    },
    talkToThis(index) {
      this.talkingTo = index;
    },
    click(value) {
      for (let i = 0; i < this.people.length; i += 1) {
        if (this.people[i].value === value) {
          this.talkToPeople.push(i);
          console.log(this.talkToPeople);
          break;
        }
      }
    },
  },
  beforeMount() {
    this.$options.sockets.private = (data) => {
      console.log(data);
      console.log('test');
    };
  },
};
