import { defineStore } from 'pinia';
import { QueryVO, ResultRowVO, ResultsVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import {
  utilDelay,
  utilFindSelectableAndPassToSetter,
  utilFindSelectableByIdInListAndMarkIt,
} from '@/utils/generalUtils.js';
import { utilMathRandomRange } from '@/utils/mathUtils.js';
import { faker } from '@faker-js/faker';

export const useQueriesStore = defineStore('queries', {
  state: () => ({ list: [], selected: null, isLoadingResults: false }),
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
    async executeCurrentQueryCommand() {
      console.log('> useQueriesStore -> executeCurrentQueryCommand:', { command: this.selected.command });
      this.isLoadingResults = true;
      const resultsVO = await utilDelay(1000).then(() => {
        const columns = [...Array(utilMathRandomRange(10, 3))].map(() => {
          return Math.random() > 0.5 ? '' : 10;
        });
        return new ResultsVO(
          columns.map(() => faker.lorem.word()),
          [...Array(utilMathRandomRange(20, 5))].map((v, index) => {
            return new ResultRowVO(
              index,
              columns.map((data) => {
                if (typeof data === 'string') return faker.lorem.sentence(utilMathRandomRange(10, 1));
                if (typeof data === 'number') return faker.datatype.number(10000000);
                return null;
              }),
            );
          }),
        );
      });
      console.log('> \t resultsVO:', resultsVO);
      this.updateSelectedResults(resultsVO);
      this.isLoadingResults = false;
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
    updateSelectedCommand(text) {
      console.log('> useQueriesStore -> updateSelectedCommand:', { text });
      this.selected.command = text;
    },
    updateSelectedResults(results) {
      console.log('> useQueriesStore -> updateSelectedData:', { results });
      this.selected.results = results;
    },
  },
  getters: {
    isQueryNotSelected: (state) => {
      return state.selected === null;
    },
    canExecuteQuery: (state) => {
      return state.selected?.command?.length > 0 || false;
    },
  },
  persist: {
    storage: localStorage,
    key: LocalStorageKeys.Store.QUERIES,
    afterRestore: ({ store }) => {
      const result = utilFindSelectableAndPassToSetter(store.list, (s) => store.select(s.id));
      console.log('> useQueriesStore -> afterRestore:', { selectedQueryVO: result });
    },
  },
});