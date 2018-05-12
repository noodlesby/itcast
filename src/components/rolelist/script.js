export default {
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await this.$http.get('/roles');
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data;
        this.loading = false;
      }
    }
  }
};
