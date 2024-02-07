export function craw() {
  items = Array.from(document.getElementsByClassName("ibpage-mcq-problems__item")).map((item) => {
    try {
      return {
          question: item.children[0].children[1].textContent.trim(),
          answer: item.children[2].children[1].textContent.trim(),
          options: [
              item.children[1].children[0].textContent.trim(),
              item.children[1].children[1].textContent.trim(),
              item.children[1].children[2].textContent.trim(),
              item.children[1].children[3].textContent.trim(),
          ],
      }
    }
    catch {
      return null;
    }
  });
  
  setTimeout(
    () => navigator.clipboard.writeText(JSON.stringify(data))
    .catch(console.error)
    .finally(() => console.log('Done')),
  3000);
}