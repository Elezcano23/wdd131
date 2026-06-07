const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
  displayList(chapter);
});

button.addEventListener('click', () => {

  if (input.value.trim() !== '') {

    displayList(input.value);

    chaptersArray.push(input.value);

    setChapterList();

    input.value = '';

    input.focus();
  }
});

function displayList(item) {

  const li = document.createElement('li');
  const deleteButton = document.createElement('button');

  li.textContent = item;

  deleteButton.textContent = '❌';

  deleteButton.setAttribute(
    'aria-label',
    `Eliminar ${item}`
  );

  deleteButton.classList.add('delete');

  li.append(deleteButton);

  list.append(li);

  deleteButton.addEventListener('click', () => {

    list.removeChild(li);

    deleteChapter(li.textContent);

    input.focus();

  });
}

function setChapterList() {

  localStorage.setItem(
    'myFavBOMList',
    JSON.stringify(chaptersArray)
  );

}

function getChapterList() {

  return JSON.parse(
    localStorage.getItem('myFavBOMList')
  );

}

function deleteChapter(chapter) {

  chapter = chapter.slice(0, chapter.length - 1);

  chaptersArray = chaptersArray.filter(
    item => item !== chapter
  );

  setChapterList();

}