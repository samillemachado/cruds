import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

async function get(url: string) {
  const response = await api.get(url);

  return response.data;
}

export { get };
