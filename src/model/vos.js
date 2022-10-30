import { Selectable } from '@/model/bases.js';

export class QueryVO extends Selectable {
  static fromString(text) {
    const raw = JSON.parse(text);
    return new QueryVO(raw.id, raw.name, raw.command);
  }
  constructor(id, name, command = '') {
    super(false);
    this.id = id;
    this.name = name;
    this.command = command;
    this.results = null;
  }
}

export class SourceVO extends Selectable {
  static fromString(text) {
    const raw = JSON.parse(text);
    return new SourceVO(raw.id, raw.name);
  }
  constructor(id, name) {
    super(false);
    this.id = id;
    this.name = name;
    this.data = [];
  }
}

export class ResultRowVO extends Selectable {
  constructor(index, values) {
    super(false);
    this.index = index;
    this.values = values;
  }
}

export class ResultsVO {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
  }
}
