import React from 'react';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Employee from '../pages/Employee';
import About from '../pages/About';
import Report from '../pages/Report';
import Document from '../pages/Document';
import Category from '../pages/Category';
import { adminLoader } from './adminLoader';
import Post from 'pages/Post';

export const adminRoutes = [
   {
    path: '/admin/login',
    element: <Login/>,
    loader: ({request}) => adminLoader(
      {request},false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/admin/forgot-password',
    element: <ForgotPassword/>,
    loader: ({request}) => adminLoader(
      {request}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/admin/profile',
    element: <Profile/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_PROFILE_PAGE'
    )
  },
  {
    path: '/admin',
    element: <Home/>,
    loader: ({request}) => adminLoader(
      {request}, true, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/admin/about',
    element: <About/>,
    loader: ({request}) => adminLoader(
      {request}, true, 'LOAD_ABOUT_PAGE'
    ),
    children: [
      {
        path: ":id",
        element: <About/>,
        loader: ({request}) => adminLoader(
          {request}, true, 'LOAD_ABOUT_PAGE'
        ),
      },
    ],
  },
  {
    path: '/admin/employee',
    element: <Employee/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_EMPLOYEE_PAGE'
    )
  },
  {
    path: '/admin/post',
    element: <Post/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_POST_PAGE'
    )
  },
  {
    path: '/admin/report',
    element: <Report/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_REPORT_PAGE'
    )
  },
  {
    path: '/admin/document',
    element: <Document/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_DOCUMENT_PAGE'
    )
  },
  {
    path: '/admin/category',
    element: <Category/>,
    loader: ({request}) => adminLoader(
      {request},true, 'LOAD_CATEGORY_PAGE'
    )
  }
];
