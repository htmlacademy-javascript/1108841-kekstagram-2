import { ErrorMessage, ValidationSettings } from './constants.js';

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return hashtags.length <= ValidationSettings.MAX_HASHTAGS &&
    uniqueHashtags.size === hashtags.length &&
    hashtags.every((hashtag) => ValidationSettings.VALID_HASHTAG_PATTERN.test(hashtag));
};

const getHashtagsErrorMessage = (value) => {
  if (!value) {
    return '';
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);
  const invalidHashtag = hashtags.find((hashtag) => !ValidationSettings.VALID_HASHTAG_PATTERN.test(hashtag));

  const errors = {
    [hashtags.length > ValidationSettings.MAX_HASHTAGS]: ErrorMessage.HASHTAG_COUNT,
    [uniqueHashtags.size !== hashtags.length]: ErrorMessage.HASHTAG_DUPLICATE,
    [invalidHashtag === '#']: ErrorMessage.HASHTAG_EMPTY,
    [invalidHashtag && !invalidHashtag.startsWith('#')]: ErrorMessage.HASHTAG_START,
    [invalidHashtag && invalidHashtag.length > 20]: ErrorMessage.HASHTAG_LENGTH,
    [invalidHashtag && ValidationSettings.VALID_HASHTAG_PATTERN.test(invalidHashtag) === false]: ErrorMessage.HASHTAG_PATTERN
  };

  return Object.entries(errors).find(([condition]) => condition === true)?.[1] || '';
};

const validateComment = (value) => value.length <= ValidationSettings.MAX_COMMENT_LENGTH;

export { validateHashtags, validateComment, getHashtagsErrorMessage };
