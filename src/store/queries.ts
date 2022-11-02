import { defineStore } from 'pinia';

import { IQueryVO, QueryCommandVO, QueryVO, ResultRowVO, ResultsVO } from '@/model/vos';
import LocalStorageKeys from '@/constants/local';
import {
  utilDelay,
  utilFindSelectableAndPassToSetter,
  utilFindSelectableByIdInListAndMarkIt,
} from '@/utils/generalUtils';
import { utilMathRandomRange } from '@/utils/mathUtils';
import { utilRandomText } from '@/utils/textUtils';

interface IQueriesStoreState {
  list: IQueryVO[];
  selected?: IQueryVO | null | undefined;
  isLoadingResults: boolean;
  lastExecutedQuery: string;
}

export const useQueriesStore = defineStore('queries', {
  state: (): IQueriesStoreState => ({
    list: [],
    selected: null,
    isLoadingResults: false,
    lastExecutedQuery: '',
  }),
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
      console.log('> useQueriesStore -> executeCurrentQueryCommand:', { command: this.selected?.command });
      this.isLoadingResults = true;
      const currentQuery = this.selected;
      await utilDelay(5000)
        .then(() => {
          const columns = [...Array(utilMathRandomRange(10, 3))].map(() => {
            return Math.random() > 0.5 ? '' : 10;
          });
          return new ResultsVO(
            columns.map(() => utilRandomText(8, 3)),
            [...Array(utilMathRandomRange(20, 5))].map((v, index) => {
              return new ResultRowVO(
                index,
                columns.map((data) => {
                  if (typeof data === 'string') return utilRandomText(10, 3, utilMathRandomRange(10, 1));
                  if (typeof data === 'number') return utilMathRandomRange(1000000, 10);
                  return null;
                }),
              );
            }),
          );
        })
        .then((resultsVO) => {
          console.log('> \t currentQuery:', currentQuery);
          currentQuery!.results = resultsVO;
        });
      // await this.updateSelectedResults(resultsVO);
      this.lastExecutedQuery = this.selected?.command || '';
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
        this.selected!.name = value;
      });
    },
    updateSelectedCommand(text) {
      console.log('> useQueriesStore -> updateSelectedCommand:', { text });
      return this._selectedGuard().then(() => {
        this.selected!.command = text;
        if (text?.length === 0) {
          this.selected!.commands = [];
        }
      });
    },
    updateSelectedResults(results) {
      console.log('> useQueriesStore -> updateSelectedData:', { results });
      return this._selectedGuard().then(() => {
        this.selected!.results = results;
      });
    },
    appendToSelectedCommand(text) {
      console.log('> useQueriesStore -> appendToSelectedCommand:', { text });
      return this._selectedGuard().then(async () => {
        const param = `${text},`;
        await this.updateSelectedCommand(this.selected!.command + param);
        this.selected!.commands[this.selected!.commands.length - 1].params += param;
      });
    },
    appendCommandToSelected() {
      console.log('> useQueriesStore -> appendCommandToSelected');
      return this._selectedGuard().then(() => {
        this.selected!.commands.push(new QueryCommandVO(Date.now(), '', ''));
      });
    },
    removeCommandFromSelected(command) {
      console.log('> useQueriesStore -> removeCommandFromSelected', command);
      return this._selectedGuard().then(async () => {
        const index = this.selected!.commands.indexOf(command);
        this.selected!.commands.splice(index, 1);
        return this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    changeCommandKeyForSelected(command, key) {
      console.log('> useQueriesStore -> changeCommandKeyForSelected', command);
      return this._selectedGuard().then(() => {
        command.key = key;
        return this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    changeCommandParamsForSelected(command, params) {
      console.log('> useQueriesStore -> changeCommandKeyForSelected', command);
      return this._selectedGuard().then(() => {
        command.params = params;
        return this.updateSelectedCommand(this.selectedQueryCommandFomCommands);
      });
    },
    _selectedGuard() {
      return new Promise((resolve: (s: string) => void, reject) => {
        if (this.isQueryNotSelected) {
          const message = 'No query selected to modify';
          window.alert(message);
          reject(message);
        } else resolve('');
      });
    },
  },
  getters: {
    isQuerySelected: (state: IQueriesStoreState) => {
      return state.selected !== null;
    },
    isQueryNotSelected: (state: IQueriesStoreState) => {
      return state.selected === null;
    },
    isSelectedQueryWithResults: (state: IQueriesStoreState) => {
      return state.selected?.results != null;
    },
    isQueryWithCommands: (state: IQueriesStoreState) => {
      return (!!state.selected && state.selected.commands?.length > 0) || false;
    },
    canExecuteQuery: (state: IQueriesStoreState) => {
      return (!!state.selected && state.selected.command?.length > 0) || false;
    },
    selectedQueryCommandFomCommands: (state: IQueriesStoreState) =>
      state.selected?.commands
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
