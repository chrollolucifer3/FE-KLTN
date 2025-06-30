import axios from "axios";
import {
  getClientToken,
  getAdminToken,
  setClientToken,
  setAdminToken,
} from "../utils/localStorage";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

// Interceptor để xử lý lỗi 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Xác định role từ URL: nếu URL chứa "/admin" → isAdmin = true
        const isAdmin = originalRequest.url.includes("/admin");

        // Lấy token cũ theo role
        const oldToken = isAdmin ? getAdminToken() : getClientToken();

        if (!oldToken) {
          throw new Error("No token found");
        }

        // Endpoint refresh tương ứng
        const refreshEndpoint = isAdmin
          ? `${baseURL}/admin/refresh`
          : `${baseURL}/auth/refresh`;

        // Gửi request refresh token
        const { data } = await axios.post(
          refreshEndpoint,
          { token: oldToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newToken = data.result.token;

        // Lưu token mới vào localStorage theo role
        if (isAdmin) {
          setAdminToken(newToken);
        } else {
          setClientToken(newToken);
        }

        // Gán token mới vào header Authorization và gửi lại request cũ
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //Có thể redirect về login tương ứng khi refresh thất bại
        // window.location.href = isAdmin ? "/admin/login" : "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
