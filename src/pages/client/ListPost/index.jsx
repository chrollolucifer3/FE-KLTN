import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/Client/MainLayout";
import { getPostFromCategoryId } from "../../../api/post";
import { List, Spin, Pagination, Typography, Breadcrumb, Empty } from "antd";
import styles from "./styles.module.scss";

const { Title } = Typography;

const ListPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  const posts = useSelector((state) => state.post.postsFromCategory || []);
  const isLoading = useSelector((state) => state.post.isLoadingListPost);
  const pagination = useSelector((state) => state.post.paginationListPostFromCategory);
  const categoryName = useSelector((state) => state.post.categoryName);

  useEffect(() => {
    if (categoryId) {
      dispatch(getPostFromCategoryId(categoryId, { page: 1, perPage: 10 }));
    }
  }, [dispatch, categoryId]);

  const handlePageChange = (page) => {
    dispatch(getPostFromCategoryId(categoryId, { page, perPage: pagination.size || 10 }));
  };

  return (
    <MainLayout>
      <div className={styles.listPostWrapper}>
        <Breadcrumb className={styles.breadcrumb}>
          <Breadcrumb.Item onClick={() => navigate("/")}>Diễn Đàn</Breadcrumb.Item>
          <Breadcrumb.Item>{categoryName || "Danh mục"}</Breadcrumb.Item>
        </Breadcrumb>

        <Title level={3} className={styles.categoryTitle}>{categoryName}</Title>

        {isLoading ? (
          <div className={styles.loading}>
            <Spin tip="Đang tải danh sách bài viết..." />
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.emptyWrap}>
            <Empty description="Chưa có bài viết nào." />
          </div>
        ) : (
          <>
            <List
              dataSource={posts}
              renderItem={(item) => (
                <List.Item
                  className={styles.listItem}
                  onClick={() => navigate(`/post/${item.id}`)}
                >
                  <div>
                    <div className={styles.postTitle}>{item.title}</div>
                    <div className={styles.postDate}>
                      🕒 {new Date(item.createdAt).toLocaleDateString("vi-VN")}{" "}
                      {new Date(item.createdAt).toLocaleTimeString("vi-VN")}
                    </div>
                  </div>
                </List.Item>
              )}
            />

            {pagination?.total > pagination?.size && (
              <div className={styles.pagination}>
                <Pagination
                  current={pagination.page || 1}
                  pageSize={pagination.size || 10}
                  total={pagination.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ListPost;
