export const mergeSort = (
  arr: Record<string, any>[],
  key: string,
): Record<string, any>[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, key), mergeSort(right, key), key);
};

const merge = (
  left: Record<string, any>[],
  right: Record<string, any>[],
  key: string,
): Record<string, any>[] => {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][key] < right[rightIndex][key]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
