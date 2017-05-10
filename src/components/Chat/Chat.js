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
      if (this.message.trim() !== '') {
        this.$socket.emit('sendMsg', this.message);
        this.message = '';
      } else {
        alert('输入不能为空');
      }
    },
    talkToThis(index) {
      this.talkingTo = index;
    },
    click(value) {
      for (let i = 0; i < this.people.length; i += 1) {
        if (this.people[i].value === value) {
          if (this.talkToPeople.includes(i)) {
            this.talkingTo = i;
          } else {
            this.talkToPeople.push(i);
            this.talkingTo = i;
          }
          break;
        }
      }
    },
  },
  beforeMount() {
    this.$options.sockets.private = function () {
      console.log('test');
    };
  },
};
