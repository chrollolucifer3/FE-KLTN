import {
  redirect
} from "react-router-dom";
import {
  getAdminToken
} from "../utils/localStorage";
import store from "../states/configureStore";
import {
  getMe
} from "../api/auth";
import {
  initialSaga
} from "../states/modules/routing";

const publicPaths = ["/admin/login", "/admin/register", "/admin/forgot-password"];

export const adminLoader = async ({
  request
}, requireAuth = false, sagaType = null) => {
  const {
    pathname
  } = new URL(request.url);

  // Kiểm tra token admin
  const adminToken = getAdminToken();

  let {
    auth
  } = store.getState();

  const isPublicPath = publicPaths.includes(pathname);
  if (isPublicPath) {
    if (adminToken && !auth.isAuthSuccess) {
      await store.dispatch(getMe());
      auth = store.getState().auth;
    }
    return null;
  }

  // Nếu có token mà chưa xác thực => gọi getMe
  if (adminToken && !auth.isAuthSuccess) {
    try {
      await store.dispatch(getMe());
      auth = store.getState().auth;
    } catch (error) {
      return redirect("/admin/login");
    }
  }

  if (requireAuth) {
    // Nếu không có adminToken hoặc user không có quyền admin
    if (!adminToken) {
      return redirect("/admin/login");
    }

    // Nếu cần xử lý thêm các actions từ saga
    if (sagaType) {
      store.dispatch(initialSaga(sagaType));
    }

    return null;
  }

  return null;
};