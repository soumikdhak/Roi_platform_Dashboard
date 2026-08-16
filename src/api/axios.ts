import axios from "axios";  

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true
});

const refreshToken = async () => {
  try {
    const resp = await axiosInstance.post("/users/refreshAccessToken");
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error",e);   
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  async (error) => {
    console.log("Response status:", error.response?.status);

    const originalRequest = error.config;

    if (originalRequest.url === "/users/refreshAccessToken") {
        return Promise.reject(error);
    }

    if(error.response?.status === 401 && !originalRequest.isretry){
        originalRequest.isretry = true;
        try {
          await refreshToken();
          return axiosInstance(originalRequest);
        } catch (err) {

          window.location.href = "/auth/login";
          return Promise.reject(err);
        }
    }

    return Promise.reject(error);
  }
);
