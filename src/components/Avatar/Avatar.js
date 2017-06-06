export default {
  name: 'Avatar',
  props: ['name'],
  data() {
    return {
      shortName: '',
    };
  },
  mounted() {
    console.log(this.name);
    this.shortName = this.name.substring(0, 1).toUpperCase();
  },
};
