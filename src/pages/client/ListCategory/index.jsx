import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getListCategorySubById } from "../../../api/category";
import MainLayout from "../../../layouts/Client/MainLayout";
import { Card, Typography, Divider, Spin, Empty, Button } from "antd";
import styles from "./styles.module.scss";

const { Title, Text } = Typography;

const ListCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const category = useSelector((state) => state.category.listCategoryAndPost);
  const isLoading = useSelector((state) => state.category.isLoadingListCategory);

  useEffect(() => {
    if (categoryId) {
      dispatch(getListCategorySubById(categoryId));
    }
  }, [dispatch, categoryId]);

  if (isLoading || !category) {
    return (
      <MainLayout>
        <div className={styles.loadingWrap}>
          <Spin size="large" />
          <Text>Đang tải danh mục...</Text>
        </div>
      </MainLayout>
    );
  }

  if (!category?.name) {
    return (
      <MainLayout>
        <div className={styles.loadingWrap}>
          <Empty description="Không tìm thấy danh mục." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <Title level={2} className={styles.categoryName}>{category.name}</Title>
        <Divider />

        {category.subCategories?.length === 0 ? (
          <Text>Không có danh mục con nào.</Text>
        ) : (
          category.subCategories.map((subCat) => (
            <div key={subCat.id} className={styles.subCategoryWrap}>
              <Title level={4} className={styles.subCategoryName}>{subCat.name}</Title>

              {subCat.posts?.length === 0 ? (
                <Text type="secondary">Chưa có bài viết nào.</Text>
              ) : (
                <>
                  <div className={styles.postList}>
                    {subCat.posts.slice(0, 2).map((post) => (
                      <Card
                        key={post.id}
                        className={styles.postCard}
                        hoverable
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        <Title level={5} className={styles.postTitle}>{post.title}</Title>
                        <Text type="secondary" className={styles.postDate}>
                          Ngày đăng: {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}
                        </Text>
                      </Card>
                    ))}
                  </div>

                  {subCat.posts.length > 2 && (
                    <Button
                      type="link"
                      onClick={() => navigate(`/${subCat.id}/post`)}
                      className={styles.seeMoreBtn}
                    >
                      Xem thêm →
                    </Button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default ListCategory;
