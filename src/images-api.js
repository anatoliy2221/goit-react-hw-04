import axios from "axios";

const API_KEY = "9dBnCYYMis5TN469-oy7VTuwPbh7tW7p85V0e1ZwDbQ";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  client_id: API_KEY,
  orientation: "landscape",
  per_page: 15,
};

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `search/photos/?query=${query}&page=${page}`
  );

  return data;
};


