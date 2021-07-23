import useToken from "./token";
import Axios from "axios";

const useAdminAuthStatus = () => {
  const { getToken } = useToken();
  const token = getToken();
  const getStatus = async () => {
    try {
      if (!token || token.length === 0) return false;
      var response = await Axios.get("https://aqueous-ridge-34051.herokuapp.com/check-admin-authorization", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return {
    getStatus,
  };
};

export default useAdminAuthStatus;
