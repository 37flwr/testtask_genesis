import axios from "axios";

export async function fetcher({ url, params }) {
  const paramsObj = {};
  params && params.map((param) => (paramsObj[param[0]] = param[1]));
  try {
    const rsp = await axios.get(url, params && { params: paramsObj });
    if (rsp.status === 200) {
      return rsp.data;
    }
  } catch (err) {
    const error = new Error("An error occurred while fetching the data");
    error.response = err.response.data.message;
    error.status = err.response.status;
    throw error;
  }
}
