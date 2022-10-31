import { defineStore } from 'pinia';
import { ISourceVO, SourceVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import {
  utilDelay,
  utilFindSelectableAndPassToSetter,
  utilFindSelectableByIdInListAndMarkIt,
} from '@/utils/generalUtils';

const SOURCE_URL = import.meta.env.VITE_SOURCES_URL;
console.log('> useSourcesStore -> setup: SOURCES_URL =', SOURCE_URL);

interface ISourcesStoreState {
  list: ISourceVO[];
  selected?: ISourceVO | null | undefined;
  isLoadingSource: boolean;
  isAttributesPanelOpened: boolean;
}

export const useSourcesStore = defineStore('sources', {
  state: (): ISourcesStoreState => ({
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
    isLoadingSource: false,
    isAttributesPanelOpened: true,
  }),
  actions: {
    triggerVisibilityOfAttributesPanel() {
      this.isAttributesPanelOpened = !this.isAttributesPanelOpened;
    },
    async select(id) {
      console.log('> useSourcesStore -> select:', { id });
      if (!id && !(this.selected = null)) return;
      if (this.selected) this.selected.isSelected = false;
      this.selected = utilFindSelectableByIdInListAndMarkIt(this.list, id);
      const selected = this.selected;
      if (!!selected && selected.data?.length) {
        this.isLoadingSource = true;
        selected.data = await utilDelay(1000).then(() =>
          fetch(`${SOURCE_URL}${this.selected?.id}.csv`, {
            mode: import.meta.env.DEV ? 'no-cors' : 'cors',
          })
            .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
            .then((text) => text.split('\n')[0].split(','))
            .catch((error) => {
              console.log('\t fetch(error): status =', error);
              return [];
            }),
        );

        console.log('> \t selected.data:', this.selected?.data);
        this.isLoadingSource = false;
      }
    },
  },
  persist: {
    storage: localStorage,
    key: LocalStorageKeys.Store.SOURCES,
    afterRestore: ({ store }) => {
      const result = utilFindSelectableAndPassToSetter(store.list, (s) => store.select(s.id));
      console.log('> useSourcesStore -> afterRestore:', { selectedQueryVO: result });
    },
  },
});
