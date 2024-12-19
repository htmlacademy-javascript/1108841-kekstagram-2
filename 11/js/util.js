import { messages, names } from './data.js';

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateComment = (id) => ({
  id,
  avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
  message: messages[getRandomInt(0, messages.length - 1)],
  name: names[getRandomInt(0, names.length - 1)],
});

const generateComments = () =>
  Array.from({ length: getRandomInt(1, 30) }, (_, i) => generateComment(i + 1));

const generatePhotos = () =>
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `./photos/${i + 1}.jpg`,
    description: `Описание фотографии #${i + 1}`,
    likes: getRandomInt(15, 200),
    comments: generateComments(),
  }));

export {generatePhotos};
