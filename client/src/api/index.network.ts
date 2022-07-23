import axios from 'axios';

export function getRequest(url:string) {
  const promise = axios.get(`${process.env.REACT_APP_SERVER_URL}${url}`,  {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return promise.then((response) => response.data);
}

export function postRequest(url:string, body:object) {
  const promise = axios.post(`${process.env.REACT_APP_SERVER_URL}${url}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return promise.then((response) => response.data);
}

export function rawPostRequest(url:string, body:object) {
  const promise = axios.post(`${process.env.REACT_APP_SERVER_URL}${url}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return promise.then((response) => response);
}
