import { App } from 'vue';
import MyTable from './table/myTable.vue';
import MyQuery from './query/myQuery.vue';

export default {
  install(app: App) {
    app.component('MyTable', MyTable);
    app.component('MyQuery', MyQuery);
  },
};