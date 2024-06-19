import axios from "axios";

const fetchGetData = async <TData>(url: string, signal?: AbortSignal) => {
  let data: TData;
  let error = false;
  let errorMag = "";
  await axios
    .get<TData>(url, { signal })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      error = true;
      errorMag = err.message;
    });
  return { error, errorMag, data };
};

export default fetchGetData;
