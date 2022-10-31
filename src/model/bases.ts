export interface ISelectable {
  isSelected: boolean;
}

export class Selectable implements ISelectable {
  isSelected: boolean;

  constructor(isSelected: boolean) {
    this.isSelected = isSelected;
  }
}
