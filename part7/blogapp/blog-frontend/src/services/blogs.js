import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlog = async (id) => {
  console.log("Fetching blog with id:", id);
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateLikes = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("Updating likes for blog with id:", id);
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  console.log(response.data)
  return response.data;
};

const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    throw error;
  }
};

export default { getAll, create, setToken, updateLikes, deleteBlog, getBlog };
