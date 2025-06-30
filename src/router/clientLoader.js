import {
  redirect
} from "react-router-dom";
import {
  getClientToken
} from "../utils/localStorage";
import store from "../states/configureStore";
import {
  getMeUser
} from "../api/auth";
import {
  initialSaga
} from "../states/modules/routing";

const publicPaths = ["/login", "/register", "/forgot-password"];

export const userLoader = async ({ request }, requireAuth = false, saga = null) => {
  const { pathname } = new URL(request.url);
  const clientToken = getClientToken();
  let { auth } = store.getState();

  // Nếu có token mà chưa xác thực => gọi getMe
  if (clientToken && !auth.isAuthSuccess) {
    await store.dispatch(getMeUser());
    auth = store.getState().auth;
  }

  // Nếu requireAuth = true mà chưa đăng nhập => redirect
  if (requireAuth && !auth.isAuthSuccess) {
    return redirect("/login");
  }

  // Nếu đã đăng nhập và vào trang public như /login, /register => redirect về home
  if (auth.isAuthSuccess && publicPaths.includes(pathname)) {
    return redirect("/");
  }

  // Nếu có saga thì chạy
  if (saga) {
    store.dispatch(initialSaga(saga));
  }

  return null;
};
