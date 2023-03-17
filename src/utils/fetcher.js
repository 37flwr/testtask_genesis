import axios from "axios";

export async function fetcher({ url, params, handleGracefully }) {
  const paramsObj = {};
  params && params.map((param) => (paramsObj[param[0]] = param[1]));
  const rsp = await axios.get(url, params && { params: paramsObj });
  if (rsp.status === 200) {
    return rsp.data;
  } else {
    if (handleGracefully) {
      return rsp.statusText;
    } else {
      throw new Error(rsp.statusText);
    }
  }
}
