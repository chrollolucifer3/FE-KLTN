import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export const routeMap = [
  {
    label: "Trang chủ",
    icon: <HomeOutlined />,
    path: "/admin",
    routeActive: ["/"],
    permissions: ["home_page"],
  },
  {
    label: "Quản lý tài khoản",
    icon: <UserOutlined />,
    path: "/admin/employee",
    routeActive: ["/employee"],
    permissions: ["employee_page"],
  },
  {
    label: "Quản lý bài viết",
    icon: <FileTextOutlined />,
    path: "/admin/post",
    routeActive: ["/post"],
    permissions: ["post_page"],
  },
  {
    label: "Quản lý báo cáo",
    icon: <ExclamationCircleOutlined />,
    path: "/admin/report",
    routeActive: ["/report"],
    permissions: ["report_page"],
  },
  {
    label: "Quản lý tài liệu",
    icon: <FileDoneOutlined />,
    path: "/admin/document",
    routeActive: ["/document"],
    permissions: ["document_page"],
  },
  {
    label: "Quản lý Danh mục",
    icon: <AppstoreOutlined />,
    path: "/admin/category",
    routeActive: ["/category"],
    permissions: ["category_page"],
  },
];
