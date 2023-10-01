import axios from "axios";

const offset = 0
const limit = 5

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
});


export default api;