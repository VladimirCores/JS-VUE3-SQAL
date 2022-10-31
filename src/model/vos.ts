import { ISelectable, Selectable } from '@/model/bases';

export interface IQueryCommandVO extends ISelectable {
  id: string;
  key: string;
  params: string;
}

export interface ISourceVO extends ISelectable {
  id: string;
  name: string;
  data?: string[] | null | undefined;
}

export interface IQueryVO extends ISelectable {
  id: string;
  name: string;
  command: string;
  commands: any[];
  results?: ResultsVO | null;
}

export interface IResultRowVO extends ISelectable {
  index: number;
  values: any[];
}

export interface IResultsVO {
  columns: string[];
  rows: ResultRowVO[];
}

export class QueryVO extends Selectable implements IQueryVO {
  static fromString(text) {
    const raw = JSON.parse(text);
    return new QueryVO(raw.id, raw.name, raw.command, raw.commands, raw.results);
  }

  id: string;
  name: string;
  command: string;
  commands: any[];
  results?: ResultsVO | null;

  constructor(id, name, command = '', commands = [], results = null) {
    super(false);
    this.id = id;
    this.name = name;
    this.command = command;
    this.commands = commands;
    this.results = results;
  }
}

export class QueryCommandVO extends Selectable implements IQueryCommandVO {
  id: string;
  key: string;
  params: string;

  constructor(id, key, params) {
    super(false);
    this.id = id;
    this.key = key;
    this.params = params;
  }
}

export class SourceVO extends Selectable implements ISourceVO {
  static fromString(text) {
    const raw = JSON.parse(text);
    return new SourceVO(raw.id, raw.name, raw.data);
  }

  id: string;
  name: string;
  data: string[];

  constructor(id, name, data = []) {
    super(false);
    this.id = id;
    this.name = name;
    this.data = data;
  }
}

export class ResultRowVO extends Selectable implements IResultRowVO {
  index: number;
  values: any[];

  constructor(index, values) {
    super(false);
    this.index = index;
    this.values = values;
  }
}

export class ResultsVO implements IResultsVO {
  columns: string[];
  rows: ResultRowVO[];

  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
  }
}
