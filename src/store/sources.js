import { defineStore } from 'pinia';
import { SourceVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import { utilFindSelectableAndPassToSetter, utilFindSelectableByIdInListAndMarkIt } from '@/utils/generalUtils.js';

export const useSourcesStore = defineStore('sources', {
  state: () => ({
    list: [
      new SourceVO('categories', 'Categories'),
      new SourceVO('customers', 'Customers'),
      new SourceVO('employees', 'Employees'),
      new SourceVO('orders', 'Orders'),
      new SourceVO('products', 'Products'),
      new SourceVO('regions', 'Regions'),
      new SourceVO('shippers', 'Shippers'),
      new SourceVO('suppliers', 'Suppliers'),
      new SourceVO('territories', 'Territories'),
    ],
    selected: null,
  }),
  actions: {
    select(id) {
      console.log('> useSourcesStore -> select:', { id });
      if (!id && !(this.selected = null)) return;
      if (this.selected) this.selected.isSelected = false;
      this.selected = utilFindSelectableByIdInListAndMarkIt(this.list, id);
    },
  },
  persist: {
    storage: localStorage,
    deserialize: SourceVO.fromString,
    key: LocalStorageKeys.SOURCES_STORE,
    afterRestore: ({ store }) => {
      const result = utilFindSelectableAndPassToSetter(store.list, (s) => store.select(s.id));
      console.log('> useSourcesStore -> afterRestore:', { selectedQueryVO: result });
    },
  },
});
