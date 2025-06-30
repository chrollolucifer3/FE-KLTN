import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../../layouts/Client/MainLayout";
import { Typography, Divider, Card, Button } from "antd";
import { getAllCategoryPost } from "../../../api/category";
import { getNewPost } from "../../../api/post";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const { Title } = Typography;

const HomeClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategoryPost());
    dispatch(getNewPost());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categoryPost);
  const newPosts = useSelector((state) => state.post.newPost);

  return (
    <MainLayout>
      <div className={styles.homeWrap}>
        <div className={styles.contentWrapper}>
          {/* Bên trái: Danh mục chính */}
          <div className={styles.leftContent}>
            <Title level={3}>📚 Danh Mục</Title>
            <div className={styles.gridCategories}>
              {categories.map((cat) => (
                <Card
                  key={cat.id}
                  className={styles.categoryCard}
                  onClick={() => navigate(`/category/${cat.id}`)}
                >
                  <div className={styles.categoryTitle}>{cat.name}</div>
                  <div className={styles.subList}>
                    {cat.subCategories.slice(0, 3).map((sub) => (
                      <div
                        key={sub.id}
                        className={styles.subItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/${sub.id}/post`);
                        }}
                      >
                        - {sub.name}
                      </div>
                    ))}
                  </div>

                  {cat.subCategories.length > 3 && (
                    <Button
                      type="link"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/category/${cat.id}`);
                      }}
                      className={styles.seeMoreBtn}
                    >
                      Xem thêm →
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Bên phải: Bài viết mới */}
          <div className={styles.rightSidebar}>
            <Title level={4}>🆕 Bài viết mới</Title>
            <Divider />
            {newPosts?.map((item) => (
              <div
                key={item.id}
                className={styles.newPostItem}
                onClick={() => navigate(`/post/${item.id}`)}
              >
                - {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeClient;
