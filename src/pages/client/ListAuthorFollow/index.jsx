import React, { useEffect } from "react";
import { List, Avatar, Tag, Pagination, Spin, Empty, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getListAuthorFollow, unfollowAuthor } from "../../../api/employee";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import styles from "./styles.module.scss"; // Sử dụng SCSS module cho đẹp và gọn

const FollowedAuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.employee.author);
  const isLoadingListAuthor = useSelector((state) => state.employee.isLoadingListAuthor);
  const paginationListAuthor = useSelector((state) => state.employee.paginationListAuthor);

  useEffect(() => {
    dispatch(getListAuthorFollow({ page: 1, perPage: 10 }));
  }, [dispatch]);

  const changeCurrentPage = (page) => {
    dispatch(getListAuthorFollow({
      page: page,
      perPage: paginationListAuthor.size || 10,
    }));
  };

  const handleUnfollow = (authorId) => {
    dispatch(unfollowAuthor(authorId)).then(() => {
      dispatch(getListAuthorFollow({
        page: paginationListAuthor.page || 1,
        perPage: paginationListAuthor.size || 10,
      }));
    });
  };

  return (
    <MainClientLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Tác giả đang theo dõi</h2>
        {isLoadingListAuthor ? (
          <div className={styles.spinWrap}><Spin size="large" /></div>
        ) : authors.length === 0 ? (
          <Empty description="Bạn chưa theo dõi tác giả nào." />
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={authors}
              renderItem={(user) => (
                <List.Item
                  key={user.id}
                  actions={[
                    <Button
                      key="unfollow"
                      danger
                      type="link"
                      onClick={() => handleUnfollow(user.id)}
                      className={styles.unfollowBtn}
                    >
                      Hủy theo dõi
                    </Button>,
                  ]}
                  className={styles.authorItem}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={64}
                        src={user.avatarUrl ? `${process.env.REACT_APP_API_URL}${user.avatarUrl}` : null}
                        icon={!user.avatarUrl && user.fullName ? user.fullName.charAt(0) : undefined}
                        className={styles.avatar}
                      />
                    }
                    title={<Link to={`/users/${user.id}`} className={styles.authorName}>{user.fullName || user.username}</Link>}
                    description={
                      <Space direction="vertical" size={4} className={styles.authorDesc}>
                        <div>Email: {user.email}</div>
                        <div>
                          Trạng thái:{" "}
                          {user.isActive ? (
                            <Tag color="green">Hoạt động</Tag>
                          ) : (
                            <Tag color="red">Bị khóa</Tag>
                          )}
                        </div>
                        <div>
                          Số bài viết: <strong>{user.postCount || 0}</strong> | Người theo dõi: <strong>{user.followerCount || 0}</strong>
                        </div>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
            {(paginationListAuthor.total || 0) > (paginationListAuthor.size || 10) && (
              <Pagination
                current={paginationListAuthor.page || 1}
                pageSize={paginationListAuthor.size || 10}
                total={paginationListAuthor.total || 0}
                onChange={changeCurrentPage}
                className={styles.pagination}
              />
            )}
          </>
        )}
      </div>
    </MainClientLayout>
  );
};

export default FollowedAuthorsPage;
