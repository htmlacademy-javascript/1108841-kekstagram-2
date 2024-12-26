import { ValidationSettings, ErrorMessage } from './constants.js';

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);

  if (hashtags.length > ValidationSettings.MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => ValidationSettings.VALID_HASHTAG_PATTERN.test(hashtag));
};

const getHashtagsErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length > ValidationSettings.MAX_HASHTAGS) {
    return ErrorMessage.HASHTAG_COUNT;
  }

  if (uniqueHashtags.size !== hashtags.length) {
    return ErrorMessage.HASHTAG_DUPLICATE;
  }

  const invalidHashtag = hashtags.find((hashtag) => !ValidationSettings.VALID_HASHTAG_PATTERN.test(hashtag));
  if (invalidHashtag) {
    if (invalidHashtag === '#') {
      return ErrorMessage.HASHTAG_EMPTY;
    }
    if (!invalidHashtag.startsWith('#')) {
      return ErrorMessage.HASHTAG_START;
    }
    if (invalidHashtag.length > ValidationSettings.MAX_HASHTAG_LENGTH) {
      return ErrorMessage.HASHTAG_LENGTH;
    }
    return ErrorMessage.HASHTAG_PATTERN;
  }

  return '';
};

const validateComment = (value) => value.length <= ValidationSettings.MAX_COMMENT_LENGTH;

export { validateHashtags, validateComment, getHashtagsErrorMessage };
