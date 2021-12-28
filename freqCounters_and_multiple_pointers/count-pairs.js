// add whatever parameters you deem necessary
function countPairs(arr, sumGoal) {
  let front = 0;
  let end = arr.length - 1;
  let sumPairs = 0;

  while (front < end) {
    if (arr[front] + arr[end] == sumGoal) {
      sumPairs++;
      end--;
    } else {
      end--;
    }

    if (end == front) {
      end = arr.length - 1;
      front++;
    }
  }
  return sumPairs;
}

module.exports = { countPairs };
