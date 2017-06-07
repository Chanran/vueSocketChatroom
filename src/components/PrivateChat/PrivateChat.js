import {
  Divider } from 'vux';
import Avatar from '../Avatar';

export default {
  name: 'PrivateChat',
  props: ['records', 'user'],
  components: {
    Avatar,
    Divider,
  },
  data() {
    return {

    };
  },
  mounted() {
    console.log(this.records);
    console.log(this.user);
  },
  methods: {

  },
};
