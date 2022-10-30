import { defineStore } from 'pinia';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

import { QueryCommandVO, QueryVO, ResultRowVO, ResultsVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import {
  utilDelay,
  utilFindSelectableAndPassToSetter,
  utilFindSelectableByIdInListAndMarkIt,
} from '@/utils/generalUtils.js';
import { utilMathRandomRange } from '@/utils/mathUtils.js';

export const useQueriesStore = defineStore('queries', {
  state: () => ({ list: [], selected: null, isLoadingResults: false, lastExecutedQuery: '' }),
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
          columns.map(() => minifaker.word()),
          [...Array(utilMathRandomRange(20, 5))].map((v, index) => {
            return new ResultRowVO(
              index,
              columns.map((data) => {
                if (typeof data === 'string')
                  return minifaker.array(utilMathRandomRange(10, 1), () => minifaker.word()).join(' ');
                if (typeof data === 'number') return utilMathRandomRange(1000000, 10);
                return null;
              }),
            );
          }),
        );
      });
      console.log('> \t resultsVO:', resultsVO);
      this.updateSelectedResults(resultsVO);
      this.lastExecutedQuery = this.selected.command;
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
      return this._selectedGuard().then(() => {
        this.selected.name = value;
      });
    },
    updateSelectedCommand(text) {
      console.log('> useQueriesStore -> updateSelectedCommand:', { text });
      return this._selectedGuard().then(() => {
        this.selected.command = text;
        if (text?.length === 0) {
          this.selected.commands = [];
        }
      });
    },
    updateSelectedResults(results) {
      console.log('> useQueriesStore -> updateSelectedData:', { results });
      return this._selectedGuard().then(() => {
        this.selected.results = results;
      });
    },
    appendToSelectedCommand(text) {
      console.log('> useQueriesStore -> appendToSelectedCommand:', { text });
      return this._selectedGuard().then(() => {
        const param = `${text},`;
        this.updateSelectedCommand(this.selected.command + param);
        this.selected.commands[this.selected.commands.length - 1].params += param;
      });
    },
    appendCommandToSelected() {
      console.log('> useQueriesStore -> appendCommandToSelected');
      return this._selectedGuard().then(() => {
        this.selected.commands.push(new QueryCommandVO(Date.now(), '', ''));
        this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    removeCommandFromSelected(command) {
      console.log('> useQueriesStore -> removeCommandFromSelected', command);
      return this._selectedGuard().then(() => {
        const index = this.selected.commands.indexOf(command);
        this.selected.commands.splice(index, 1);
        this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    changeCommandKeyForSelected(command, key) {
      console.log('> useQueriesStore -> changeCommandKeyForSelected', command);
      return this._selectedGuard().then(() => {
        command.key = key;
        this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    changeCommandParamsForSelected(command, params) {
      console.log('> useQueriesStore -> changeCommandKeyForSelected', command);
      return this._selectedGuard().then(() => {
        command.params = params;
        this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    _selectedGuard() {
      return new Promise((resolve, reject) => {
        if (this.isQueryNotSelected) {
          const message = 'No query selected to modify';
          window.alert(message);
          reject(message);
        } else resolve();
      });
    },
  },
  getters: {
    isQuerySelected: (state) => {
      return state.selected !== null;
    },
    isQueryNotSelected: (state) => {
      return state.selected === null;
    },
    isSelectedQueryWithResults: (state) => {
      return state.selected?.results?.length > 0;
    },
    isQueryWithCommands: (state) => {
      return state.selected?.commands.length > 0;
    },
    canExecuteQuery: (state) => {
      return state.selected?.command?.length > 0 || false;
    },
    selectedQueryCommandFomCommands: (state) =>
      state.selected.commands
        .filter((c) => !!c.key)
        .map((c) => `${c.key} ${c.params}`)
        .join(' '),
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
