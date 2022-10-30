import { Selectable } from '@/model/bases.js';

export class QueryVO extends Selectable {
  static fromString(text) {
    const raw = JSON.parse(text);
    return new QueryVO(raw.id, raw.name);
  }
  constructor(id, name) {
    super(false);
    this.id = id;
    this.name = name;
    this.commands = [];
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
