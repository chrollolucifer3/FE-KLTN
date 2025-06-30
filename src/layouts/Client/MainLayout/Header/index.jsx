// AppHeader.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Drawer,
  Button,
  Grid,
  Avatar,
  Dropdown,
  AutoComplete,
  Input,
  Spin,
  message,
} from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  StarOutlined,
} from "@ant-design/icons";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeClientToken } from "utils/localStorage";
import { logOutUser } from "../../../../api/auth";
import styles from "./styles.module.scss";
import NotificationBell from "components/UI/BELL";
import logoVnua from "../../../../assets/images/logo/logo-vnua.png";

const { Header } = Layout;
const { useBreakpoint } = Grid;
const BASE_URL = process.env.REACT_APP_API_URL;

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const dispatch = useDispatch();

  const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess);
  const authUser = useSelector((state) => state.auth.authUser);

  const handleLogout = () => {
    console.log("Logging out...");
    
    dispatch(logOutUser()).then(() => {
      removeClientToken();
      navigate("/login");
    });
  };

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/post/getAllForClient`, {
        params: {
          search: value,
          page: 0,
          size: 5,
          sortBy: "createdAt",
          order: "DESC",
        },
      });
      const posts = res?.data?.result?.posts || [];
      setOptions(
        posts.map((post) => ({
          value: post.title,
          label: post.title,
          id: post.id,
        }))
      );
    } catch (err) {
      message.error("Không thể tải kết quả tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, 500),
    []
  );
  useEffect(
    () => () => debouncedFetchSuggestions.cancel(),
    [debouncedFetchSuggestions]
  );

  const handleSelect = (_, option) => navigate(`/post/${option.id}`);

  return (
    <Header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img
            style={{ width: "50px", height: "100%",
               objectFit: "contain" }}
            src={logoVnua}
            alt="Logo VNUA"
          />
        </div>

        <div className={styles.search}>
          {screens.md && (
            <AutoComplete
              options={options}
              onSearch={(value) => debouncedFetchSuggestions(value)}
              onSelect={handleSelect}
              style={{ width: "100%" }}
              notFoundContent={
                loading ? <Spin size="small" /> : "Không có kết quả"
              }
            >
              <Input
                placeholder="Tìm kiếm..."
                prefix={<SearchOutlined />}
                allowClear
              />
            </AutoComplete>
          )}
        </div>

        <div className={styles.right}>
          {screens.md ? (
            <a onClick={() => navigate("/post")} className={styles.postLink}>
              Đăng bài
            </a>
          ) : (
            <>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
              <Drawer
                title="Menu"
                placement="right"
                onClose={() => setVisible(false)}
                open={visible}
              >
                <a
                  onClick={() => {
                    navigate("/post");
                    setVisible(false);
                  }}
                  className={styles.drawerLink}
                >
                  Đăng bài
                </a>
              </Drawer>
            </>
          )}

          {isAuthSuccess && <NotificationBell />}

          {isAuthSuccess ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: "Thông tin cá nhân",
                    onClick: () => navigate("/profile"),
                  },
                  {
                    key: "my-posts",
                    icon: <FileTextOutlined />,
                    label: "Danh sách bài viết",
                    onClick: () => navigate("/my-posts"),
                  },
                  {
                    key: "followed-authors",
                    icon: <StarOutlined />,
                    label: "Tác giả đã theo dõi",
                    onClick: () => navigate("/followed-authors"),
                  },
                  {
                    key: "post-like",
                    icon: <FileTextOutlined />,
                    label: "Bài viết yêu thích",
                    onClick: () => navigate("/post-like"),
                  },
                  {
                    key: "my-documents",
                    icon: <FileDoneOutlined />,
                    label: "Tài liệu của tôi",
                    onClick: () => navigate("/my-documents"),
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Đăng xuất",
                    onClick: handleLogout,
                  },
                ],
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                src={
                  authUser?.avatarUrl
                    ? `${BASE_URL}${authUser.avatarUrl}`
                    : null
                }
                icon={!authUser?.avatarUrl && <UserOutlined />}
                className={styles.avatar}
              />
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
