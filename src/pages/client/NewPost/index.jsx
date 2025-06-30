import React, { useEffect, useState } from "react";
import { Card, Pagination, Typography, Spin, Select } from "antd";
import { Link } from "react-router-dom";
import {
  LikeOutlined,
  EyeOutlined,
  UserOutlined,
  FolderOpenOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostForClient } from "../../../api/post";
import he from "he";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "./styles.module.scss";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const NewPostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoadingListPost = useSelector((state) => state.post.isLoadingListPost);
  const paginationListPost = useSelector((state) => state.post.paginationListPost);

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    order: "desc",
    column: "createdAt",
  });

  useEffect(() => {
    dispatch(getAllPostForClient(dataFilter));
  }, [dispatch, dataFilter]);

  const changeCurrentPage = (page) => {
    setDataFilter((prev) => ({ ...prev, page }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getPlainText = (html) => {
    return he.decode(html.replace(/<[^>]+>/g, ""));
  };

  const renderContentWithMath = (content) => {
    const text = getPlainText(content).slice(0, 300);
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith("$") && part.endsWith("$")) {
            const latex = part.slice(1, -1);
            return <InlineMath key={index}>{latex}</InlineMath>;
          }
          return <span key={index}>{part}</span>;
        })}
        ...
      </>
    );
  };

  return (
    <MainClientLayout>
      <div className={styles.pageContainer}>
        <Title level={3} className={styles.header}>Danh sách bài viết</Title>

        <div className={styles.sortFilter}>
          <span className={styles.label}>Sắp xếp theo:</span>
          <Select
            value={dataFilter.order}
            className={styles.select}
            onChange={(value) =>
              setDataFilter((prev) => ({
                ...prev,
                order: value,
                column: "createdAt",
                page: 1,
              }))
            }
          >
            <Option value="desc">Mới nhất</Option>
            <Option value="asc">Cũ nhất</Option>
          </Select>
        </div>

        {isLoadingListPost ? (
          <div className={styles.loading}>
            <Spin size="large" />
          </div>
        ) : posts.length === 0 ? (
          <Paragraph className={styles.noPost}>Không có bài viết nào.</Paragraph>
        ) : (
          <>
            {posts.map((post) => (
              <Card
                key={post.id}
                className={styles.card}
                title={
                  <Link to={`/post/${post.id}`} className={styles.titleLink}>
                    {post.title || "Không có tiêu đề"}
                  </Link>
                }
              >
                <Paragraph className={styles.content}>
                  {renderContentWithMath(post.content)}
                </Paragraph>
                <div className={styles.info}>
                  <div className={styles.item}><CalendarOutlined /><Text>{formatDate(post.createdAt)}</Text></div>
                  <div className={styles.item}><UserOutlined /><Text>{post.authorName}</Text></div>
                  <div className={styles.item}><FolderOpenOutlined /><Text>{post.categoryName}</Text></div>
                  <div className={styles.item}><LikeOutlined /><Text>{post.likesCount}</Text></div>
                  <div className={styles.item}><EyeOutlined /><Text>{post.viewsCount}</Text></div>
                </div>
              </Card>
            ))}
            <Pagination
              current={paginationListPost.currentPage}
              pageSize={paginationListPost.perPage}
              total={paginationListPost.totalRecord}
              onChange={changeCurrentPage}
              className={styles.pagination}
            />
          </>
        )}
      </div>
    </MainClientLayout>
  );
};

export default NewPostPage;
