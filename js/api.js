import { ErrorMessage } from './constants.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const loadData = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {
      method,
      body
    });

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  } catch {
    throw new Error(errorText);
  }
};

const getData = () => loadData(Route.GET_DATA, ErrorMessage.GET_DATA);

const sendData = (body) => loadData(
  Route.SEND_DATA,
  ErrorMessage.SEND_DATA,
  Method.POST,
  body
);

export { getData, sendData };
