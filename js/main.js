import { generatePhotos } from './util.js';
import { renderPictures } from './render-thumbnails.js';
import { MOCK_PHOTO } from './mocks-photo.js';
import './form.js';

generatePhotos();
renderPictures(MOCK_PHOTO);
