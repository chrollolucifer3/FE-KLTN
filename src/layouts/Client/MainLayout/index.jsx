import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import AppHeader from "../MainLayout/Header";
import styles from "./styles.module.scss";

const { Content, Footer } = Layout;

const menuItems = [
  { key: "/", label: "Trang chủ" },
  { key: "/document", label: "Tài liệu" },
  { key: "/new-post", label: "Bài viết" },
];

const SubHeader = () => {
  const location = useLocation();

  return (
    <div className={styles.subHeader}>
      <div className={styles.inner}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className={styles.menu}
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />
      </div>
    </div>
  );
};

const MainClientLayout = ({ children }) => {
  return (
    <Layout className={styles.layoutWrap}>
      <AppHeader />
      <SubHeader />
      <div className={styles.contentContainer}>
        <Content>{children}</Content>
      </div>
      <Footer className={styles.footer}>
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default MainClientLayout;
