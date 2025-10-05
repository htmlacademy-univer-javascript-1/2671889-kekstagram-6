const PHOTOS_DESCRIPTIONS = [
  'Море',
  'Закат',
  'Машина',
  'Пляж',
  'Сафари',
  'Еда'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Ольга',
  'Алексей',
  'Елена',
  'Андрей',
  'Наталья',
  'Иван',
  'Татьяна',
  'Михаил',
  'Юлия',
  'Максим',
  'Екатерина',
  'Артём',
  'Ирина',
  'Владимир',
  'Светлана'
];

const PHOTOS_COUNT = 25;

const AVATARS_COUNT = 6;

const LIKES_MIN = 15;

const LIKES_MAX = 200;

const COMMENTS_MIN = 0;

const COMMENTS_MAX = 30;

const photos = [];


const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min) + min;


const getRandomArrayElement = (array) =>
  array[getRandomInt(0, array.length - 1)];


const createCommentObject = (index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomInt(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


const getRandomComments = () => {
  const count = getRandomInt(COMMENTS_MIN, COMMENTS_MAX);
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(createCommentObject(i));
  }
  return result;
};


const createPhotoObject = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(PHOTOS_DESCRIPTIONS),
  likes: getRandomInt(LIKES_MIN, LIKES_MAX),
  comments: getRandomComments()
});


const addPhotos = () => {
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    photos.push(createPhotoObject(i));
  }
};


addPhotos();
