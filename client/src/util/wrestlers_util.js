import axios from 'axios';

export const getWrestler = webId => {
  return axios.get(`/api/wrestlers/${webId}`)
};