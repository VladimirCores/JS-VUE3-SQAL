import { defineStore } from 'pinia';
import { QueryVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import { utilFindSelectableAndPassToSetter, utilFindSelectableByIdInListAndMarkIt } from '@/utils/generalUtils.js';

export const useQueriesStore = defineStore('queries', {
  state: () => ({ list: [], selected: null }),
  actions: {
    add(name) {
      console.log('> useQueriesStore -> add:', { name });
      const queryVO = new QueryVO(`${Date.now()}`, name);
      this.list.push(queryVO);
      this.select(queryVO.id);
    },
    select(id) {
      console.log('> useQueriesStore -> select:', { id });
      if (!id && !(this.selected = null)) return;
      if (this.selected) this.selected.isSelected = false;
      this.selected = utilFindSelectableByIdInListAndMarkIt(this.list, id);
    },
    deleteSelected() {
      console.log('> useQueriesStore -> deleteSelected', this.selected);
      if (this.selected) {
        const selectedIndex = this.list.indexOf(this.selected);
        this.list.splice(selectedIndex, 1);
        const nextIndex = this.list.length > selectedIndex ? selectedIndex : selectedIndex - 1;
        this.select(this.list[nextIndex]?.id);
      }
    },
    updateSelectedName(value) {
      console.log('> useQueriesStore -> updateSelectedName:', { value });
      this.selected.name = value;
    },
  },
  persist: {
    storage: localStorage,
    deserialize: QueryVO.fromString,
    key: LocalStorageKeys.QUERIES_STORE,
    afterRestore: ({ store }) => {
      const result = utilFindSelectableAndPassToSetter(store.list, (s) => store.select(s.id));
      console.log('> useQueriesStore -> afterRestore:', { selectedQueryVO: result });
    },
  },
});
