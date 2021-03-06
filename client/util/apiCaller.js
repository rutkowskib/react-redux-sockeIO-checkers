import axios from 'axios';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

/*
export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
*/

export function callApiGet(URL, query) {
  return axios
    .get(`${API_URL}/${URL}`, {
      params: {
        query
      }
    });
}

export function callApiPost(URL, body) {
  return axios
    .post(`${API_URL}/${URL}`, body);
}

export function callApiPut(URL, body) {
  return axios
    .put(`${API_URL}/${URL}`, body);
}

export function callApiDelete(URL, body) {
  return axios
    .put(`${API_URL}/${URL}`, {body});
}
