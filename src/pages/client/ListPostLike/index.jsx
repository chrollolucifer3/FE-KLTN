import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/Client/MainLayout";
import { getPostsLike } from "../../../api/post";
import { List, Spin, Pagination, Empty } from "antd";
import styles from "./styles.module.scss";


const ListPostLike = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.post.postLike || []);
  const isLoading = useSelector((state) => state.post.isLoadingPostLikeByUser);
  const pagination = useSelector((state) => state.post.paginationListPostLikeByUser);

  useEffect(() => {
  dispatch(getPostsLike({ page: 1, perPage: 10 }));
}, [dispatch]);


  const handlePageChange = (page) => {
    dispatch(getPostsLike( { page, perPage: pagination.size || 10 }));
  };

  return (
    <MainLayout>
      <div className={styles.listPostWrapper}>

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

export default ListPostLike;
