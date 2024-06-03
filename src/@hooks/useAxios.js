import axios from "axios";

const useAxios = () => {
  const sendRequest = async (axiosCallback) => {
    try {
      const response = await axiosCallback();
      return response.data;
    } catch (err) {
      console.error(err);
      const error = err?.response?.data || err?.response || err?.message;
      return error;
    }
  };

  const callService = ({ url }) => {
    return {
      get: async (config = {}) => {
        const request = async () => await axios.get(url, config);
        return await sendRequest(request);
      },
      post: async (data = {}, config = {}) => {
        const request = async () => await axios.post(url, data, config);
        return await sendRequest(request);
      },
      put: async (data = {}) => {
        const request = async () => await axios.put(url, data);
        return await sendRequest(request);
      },
      delete: async (data = {}) => {
        const request = async () => await axios.delete(url, data);
        return await sendRequest(request);
      },
    };
  };

  return { callService };
};

export default useAxios;
