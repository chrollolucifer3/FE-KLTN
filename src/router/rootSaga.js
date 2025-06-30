import loadAuthSaga from "../states/modules/auth/saga";
import loadHomeSaga from "../states/modules/home/saga";
import loadAboutSaga from "../states/modules/about/saga";
import loadProfileSaga from "../states/modules/profile/saga";
import loadEmployeeSaga from "../states/modules/employee/saga";
import loadHomeClientSaga from "../states/modules/client/home/saga";
import loadPostSaga from "states/modules/post/saga";
import loadCategorySaga from "states/modules/category/saga";
import loadReportSaga from "states/modules/report/saga";
import loadDocumentSaga from "states/modules/document/saga";
import loadNotificationSaga from "states/modules/notification/saga";





export const ROUTE_SAGAS = {
  LOAD_AUTH_PAGE: loadAuthSaga,
  LOAD_HOME_PAGE: loadHomeSaga,
  LOAD_ABOUT_PAGE: loadAboutSaga,
  LOAD_PROFILE_PAGE: loadProfileSaga,
  LOAD_EMPLOYEE_PAGE: loadEmployeeSaga,
  LOAD_HOME_CLIENT_PAGE: loadHomeClientSaga,
  LOAD_LOGIN_CLIENT_PAGE: loadAuthSaga,
  LOAD_CREATE_POST_PAGE: loadPostSaga,
  LOAD_POST_PAGE: loadPostSaga,
  LOAD_LIST_CATEGORY_PAGE: loadCategorySaga,
  LOAD_LIST_POST_PAGE: loadPostSaga,
  LOAD_POST_PAGE_DETAIL: loadPostSaga,
  LOAD_USER_PROFILE_PAGE: loadAuthSaga,
  LOAD_REPORT_PAGE: loadReportSaga,
  LOAD_DOCUMENT_PAGE: loadDocumentSaga,
  LOAD_CATEGORY_PAGE: loadCategorySaga,
  LOAD_DOCUMENT_CLIENT_PAGE: loadDocumentSaga,
  LOAD_NEW_POST_PAGE: loadPostSaga,
  LOAD_MY_POST_PAGE: loadPostSaga,
  LOAD_FOLLOWED_AUTHORS_PAGE: loadEmployeeSaga,
  LOAD_AUTHOR_DETAIL_PAGE: loadEmployeeSaga,
  LOAD_NOTIFICATION_PAGE: loadNotificationSaga,
  LOAD_REGISTER_CLIENT_PAGE: loadAuthSaga,
  LOAD_FORGOT_PASSWORD_CLIENT_PAGE: loadAuthSaga,
  LOAD_UPDATE_PASSWORD_CLIENT_PAGE: loadAuthSaga,
  LOAD_UPDATE_POST_PAGE: loadPostSaga,
  LOAD_POST_CLIENT_PAGE: loadPostSaga,
};

