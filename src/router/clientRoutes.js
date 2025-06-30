import React from "react";
import HomeClient from "../pages/client/Home";
import Login from "pages/client/Auth/Login";
import PostEditor from "pages/client/Post";
import ListCategory from "pages/client/ListCategory";
import ListPost from "pages/client/ListPost";
import PostDetail from "pages/client/PostDetail";
import UserProfile from "pages/client/UserProfile";
import DocumentForClient from "pages/client/Document";
import NewPostPage from "pages/client/NewPost";
import ListMyPosts from "pages/client/MyPost";
import FollowedAuthorsPage from "pages/client/ListAuthorFollow";
import AuthorDetailPage from "pages/client/AuthorDetailPage";
import NotificationPage from "pages/client/notificationPage";
import Register from "pages/client/Auth/Register";
import ForgotPassword from "pages/client/Auth/ForgotPassword";
import UpdatePassword from "pages/client/Auth/UpdatePassword";
import MyDocument from "pages/client/MyDoc";
import UpdatePost from "pages/client/UpdatePost";
import ListPostLike from "pages/client/ListPostLike";
import { userLoader } from "../router/clientLoader";

export const clientRoutes = [
  {
    path: "",
    element: <HomeClient />,
    loader: ({ request }) => userLoader({ request },false, "LOAD_HOME_CLIENT_PAGE"),
  },
  {
    path: "/login",
    element: <Login />,
    loader: ({ request }) => userLoader({ request },false, "LOAD_LOGIN_CLIENT_PAGE"),
  },
  {
    path: "/edit-post/:id",
    element: <UpdatePost />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_UPDATE_POST_PAGE"),
  },
  {
    path: "/post-like",
    element: <ListPostLike />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_POST_CLIENT_PAGE"),  
  },
  {
    path: "/register",
    element: <Register />,
    loader: ({ request }) => userLoader({ request },false, "LOAD_REGISTER_CLIENT_PAGE"),
  },
  {
    path: "/my-documents",
    element: <MyDocument />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_DOCUMENT_CLIENT_PAGE"),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    loader: ({ request }) => userLoader({ request },false, "LOAD_FORGOT_PASSWORD_CLIENT_PAGE"),
  },
  {
    path: "/reset-password",
    element: <UpdatePassword />,
    loader: ({ request }) => userLoader({ request },false, "LOAD_UPDATE_PASSWORD_CLIENT_PAGE"),
  },
  {
    path:"/post",
    element: <PostEditor />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_CREATE_POST_PAGE"),
  },
    {
      path:"/users/:id",
      element: <AuthorDetailPage />,
      loader: ({ request }) => userLoader({ request },true, "LOAD_AUTHOR_DETAIL_PAGE"),
    },
  {
    path:"/followed-authors",
    element: <FollowedAuthorsPage />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_FOLLOWED_AUTHORS_PAGE"),
  },
  {
    path:"/new-post",
    element: <NewPostPage />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_NEW_POST_PAGE"),
  },

  {
    path:"/document",
    element: <DocumentForClient />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_DOCUMENT_CLIENT_PAGE"),
  },
  {
    path:"/notification",
    element: <NotificationPage />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_NOTIFICATION_PAGE"),
  },
  {
    path:"/my-posts",
    element: <ListMyPosts />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_MY_POST_PAGE"),
  },
  {
    path:"/category/:id",
    element: <ListCategory />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_LIST_CATEGORY_PAGE"),
  },
  {
    path:"/:id/post",
    element: <ListPost />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_LIST_POST_PAGE"),
  },
  {
    path:"/post/:id",
    element: <PostDetail />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_POST_PAGE_DETAIL"),
  },
  {
    path:"/profile",
    element: <UserProfile />,
    loader: ({ request }) => userLoader({ request },true, "LOAD_USER_PROFILE_PAGE"),
  },

];
