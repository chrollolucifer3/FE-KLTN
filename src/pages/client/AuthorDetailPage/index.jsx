import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Avatar, Tag, List, Pagination, Spin, Empty, Space, Typography } from "antd";
import { LikeOutlined, EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorDetailForClient } from "../../../api/employee";
import { getPostsByUserIdForClient } from "../../../api/post";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;

const AuthorDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const BASE_API_URL = process.env.REACT_APP_API_URL;
  const author = useSelector((state) => state.employee.authorDetail);
  const posts = useSelector((state) => state.post.postsFromUser || []);
  const isLoadingPostFromUser = useSelector((state) => state.post.isLoadingPostFromUser);
  const pagination = useSelector((state) => state.post.paginationListPostFromUser || {});

  useEffect(() => {
    if (id) {
      dispatch(getAuthorDetailForClient(id));
      dispatch(getPostsByUserIdForClient(id, { page: 1, perPage: 10 }));
    }
  }, [dispatch, id]);

  const handlePageChange = (page) => {
    dispatch(getPostsByUserIdForClient(id, { page, perPage: pagination.size || 10 }));
  };

  return (
    <MainClientLayout>
      <div className={styles.container}>
        {isLoadingPostFromUser ? (
          <div className={styles.spinWrap}><Spin size="large" /></div>
        ) : author ? (
          <>
            <Card className={styles.authorCard}>
              <Card.Meta
                avatar={<Avatar size={80} src={author?.avatarUrl ? `${BASE_API_URL}${author.avatarUrl}` : null} />}
                title={<Title level={3} className={styles.authorName}>{author.fullName || author.username}</Title>}
                description={
                  <Space direction="vertical" size={2} className={styles.authorInfo}>
                    <Paragraph>Email: {author.email}</Paragraph>
                    <Paragraph>SĐT: {author.phone}</Paragraph>
                    <Paragraph>
                      Trạng thái:{" "}
                      {author.isActive ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Bị khóa</Tag>}
                    </Paragraph>
                    <Paragraph>
                      Bài viết: <strong>{author.postCount}</strong> | Người theo dõi: <strong>{author.followerCount}</strong>
                    </Paragraph>
                  </Space>
                }
              />
            </Card>

            <div className={styles.postListWrap}>
              <Title level={4} className={styles.postListTitle}>Bài viết của tác giả</Title>

              {posts.length === 0 ? (
                <Empty description="Chưa có bài viết nào." />
              ) : (
                <>
                  <List
                    itemLayout="vertical"
                    dataSource={posts}
                    renderItem={(post) => (
                      <List.Item key={post.id} className={styles.postItem}>
                        <List.Item.Meta
                          title={
                            <a href={`/post/${post.id}`} className={styles.postTitle}>
                              {post.title || "Không có tiêu đề"}
                            </a>
                          }
                          description={
                            <Space size="large" className={styles.postMeta}>
                              <Text type="secondary"><LikeOutlined /> {post.likesCount}</Text>
                              <Text type="secondary"><EyeOutlined /> {post.viewsCount}</Text>
                              <Text type="secondary"><CalendarOutlined /> {dayjs(post.createdAt).format("DD/MM/YYYY")}</Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  {pagination.total > (pagination.size || 0) && pagination.total > 10 && (
                    <Pagination
                      className={styles.pagination}
                      current={pagination.page || 1}
                      pageSize={pagination.size || 10}
                      total={pagination.total || 0}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <Empty description="Không tìm thấy tác giả." />
        )}
      </div>
    </MainClientLayout>
  );
};

export default AuthorDetailPage;
