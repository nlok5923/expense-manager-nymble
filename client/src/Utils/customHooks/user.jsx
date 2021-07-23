import useToken from "./token";
import Axios from "axios";

const useAuthStatus = () => {
  const { getToken } = useToken();
  const token = getToken();
  const getStatus = async () => {
    try {
      if (!token || token.length === 0) return false;
      var response = await Axios.get("https://aqueous-ridge-34051.herokuapp.com/check-authorization", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      window.location.href = "/";
      return false;
    }
  };
  return {
    getStatus,
  };
};

export default useAuthStatus;
