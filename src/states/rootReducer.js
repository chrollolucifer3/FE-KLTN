import appReducer from './modules/app';
import authReducer from './modules/auth';
import profileReducer from './modules/profile';
import homeReducer from './modules/home';
import aboutReducer from './modules/about';
import employeeReducer from './modules/employee';
import homeClientReducer from './modules/client/home';
import postClientReducer from './modules/post';
import categoryReducer from './modules/category';
import commentReducer from './modules/comment';
import reportReducer from './modules/report';
import documentReducer from './modules/document';
import notificationReducer from './modules/notification';


const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  about: aboutReducer,
  employee: employeeReducer,
  homeClient: homeClientReducer,
  post: postClientReducer,
  category: categoryReducer,
  comment: commentReducer,
  report: reportReducer,
  document: documentReducer,
  notification: notificationReducer,
}

export default rootReducer
