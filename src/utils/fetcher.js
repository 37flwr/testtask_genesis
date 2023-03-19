import axios from "axios";

export async function fetcher({ url, params, handleGracefully }) {
  const paramsObj = {};
  params && params.map((param) => (paramsObj[param[0]] = param[1]));
  try {
    const rsp = await axios.get(url, params && { params: paramsObj });
    if (rsp.status === 200) {
      return rsp.data;
    } else {
      const error = new Error("An error occurred while fetching the data");
      // Attach extra info to the error object.
      error.info = await rsp.json();
      error.status = rsp.status;
      throw error;
    }
  } catch (err) {
    const error = new Error("An error occurred while fetching the data");
    // Attach extra info to the error object.
    error.response = err.response.data.message;
    error.status = err.response.status;
    throw error;
  }
}
