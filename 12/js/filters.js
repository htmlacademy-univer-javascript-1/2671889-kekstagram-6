import { debounce, isButton, shuffleArray } from './util.js';
import { renderPhotos, removePhotos } from './photo-render.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PHOTOS_COUNT = 10;

const filtersContainerElement = document.querySelector('.img-filters');
const filterButtonsElements = filtersContainerElement.querySelectorAll('.img-filters__button');

let photoObjects = [];
let currentFilterId = FilterId.DEFAULT;

const getRandomPhotoObjects = () => shuffleArray([...photoObjects]).slice(0, RANDOM_PHOTOS_COUNT);

const getDiscussedPhotoObjects = () =>
  [...photoObjects].sort((firstObject, secondObject) => secondObject.comments.length - firstObject.comments.length);

const getFilteredPhotoObjects = (filterType) => {
  switch (filterType) {
    case FilterId.RANDOM:
      return getRandomPhotoObjects();
    case FilterId.DISCUSSED:
      return getDiscussedPhotoObjects();
    default:
      return photoObjects;
  }
};

const updatePhotos = debounce((filteredPhotoObjects) => {
  removePhotos();
  renderPhotos(filteredPhotoObjects);
}, 500);

const onFiltersContainerClick = (evt) => {
  if (!isButton(evt)) {
    return;
  }
  const clickedButton = evt.target;
  const newFilterId = clickedButton.id;
  if (newFilterId === currentFilterId) {
    return;
  }
  filterButtonsElements.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
  clickedButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilterId = newFilterId;
  const filteredPhotoObjects = getFilteredPhotoObjects(currentFilterId);
  updatePhotos(filteredPhotoObjects);
};

const initializeFiltering = (loadedPhotoObjects) => {
  photoObjects = [...loadedPhotoObjects];
  renderPhotos(photoObjects);
  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', onFiltersContainerClick);
};

export { initializeFiltering };
