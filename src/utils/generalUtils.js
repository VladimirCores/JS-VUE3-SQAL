export function utilFindSelectableByIdInListAndMarkIt(list, id) {
  const selectable = list.find((vo) => vo.id === id);
  if (selectable) selectable.isSelected = true;
  return selectable;
}

export function utilFindSelectableAndPassToSetter(list, setter) {
  const result = list.find((selectable) => selectable.isSelected);
  if (result) setter(result);
  return result;
}

export function utilDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
