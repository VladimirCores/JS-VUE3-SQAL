export function utilFindSelectableByIdInListAndMarkIt(list: any[], id: string) {
  const selectable = list.find((vo) => vo.id === id);
  if (selectable) selectable.isSelected = true;
  return selectable;
}

export function utilFindSelectableAndPassToSetter(list: any[], setter: (s: any) => void) {
  const result = list.find((selectable) => selectable.isSelected);
  if (result) setter(result);
  return result;
}

export function utilDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
