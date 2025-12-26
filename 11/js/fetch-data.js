const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const loadData = () =>
  fetch(`${SERVER_URL}/data`).then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось получить данные с сервера');
    }
    return response.json();
  });

const uploadData = (data) =>
  fetch(SERVER_URL, {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить данные на сервер');
    }
    return response.json();
  });

export { loadData, uploadData };
