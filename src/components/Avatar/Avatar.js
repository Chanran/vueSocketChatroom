export default {
  name: 'Avatar',
  props: ['name'],
  data() {
    return {
      shortName: '',
    };
  },
  mounted() {
    this.shortName = this.name.trim().substring(0, 1).toUpperCase();
    // console.log(this.shortName);
  },
};
