export default function sortItems(listToSort) {
  return listToSort.sort((a, b) => {
    if (a.isRead && !b.isRead) {
      return 1; // a comes before b
    } else if (!a.isRead && b.isRead) {
      return -1; // b comes before a
    } else {
      return 0; // no change in order
    }
  });
}
