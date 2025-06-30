import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Space,
  Pagination,
  Spin,
  Card,
  Button,
  Tag,
  Select,
} from "antd";
import {
  LikeOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getPostByUser } from "../../../api/post";
import { useSelector, useDispatch } from "react-redux";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import renderMathInElement from "katex/contrib/auto-render";
import he from "he";
import "katex/dist/katex.min.css";
import styles from "./styles.module.scss";

const { Title, Text } = Typography;
const { Option } = Select;

const statusLabel = {
  APPROVED: "Đã duyệt",
  PENDING: "Chờ duyệt",
  BLOCKED: "Bị khóa",
  REJECTED: "Bị từ chối",
};

const statusColor = {
  APPROVED: "green",
  PENDING: "blue",
  BLOCKED: "red",
  REJECTED: "orange",
};

const getStatusLabel = (status) => statusLabel[status] || status;

const statusOptions = [
  { value: "", label: "Tất cả" },
  { value: "APPROVED", label: "Đã duyệt" },
  { value: "PENDING", label: "Chờ duyệt" },
  { value: "REJECTED", label: "Bị từ chối" },
  { value: "BLOCKED", label: "Bị khóa" },
];

const ListMyPosts = () => {
  const dispatch = useDispatch();
  const myPost = useSelector((state) => state.post.myPost || []);
  const isLoadingMyPost = useSelector((state) => state.post.isLoadingMyPost);
  const paginationListMyPost = useSelector(
    (state) => state.post.paginationListMyPost
  );

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    status: "",
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getPostByUser(dataFilter));
  }, [dispatch, dataFilter]);

  useEffect(() => {
    const elements = document.querySelectorAll(".post-preview");
    elements.forEach((el) => {
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
      } catch (err) {
        console.error("Math render error", err);
      }
    });
  }, [myPost]);

  const changeCurrentPage = (page) => {
    setDataFilter((prev) => ({ ...prev, page }));
  };

  const handleStatusChange = (value) => {
    setDataFilter((prev) => ({
      ...prev,
      status: value,
      page: 1,
    }));
  };

  const renderContentPreview = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = he.decode(html);
    const textOnly = tempDiv.innerText || tempDiv.textContent || "";

    if (textOnly.length > 300) {
      return tempDiv.innerHTML.slice(0, 300) + "...";
    }
    return tempDiv.innerHTML;
  };

  return (
    <MainClientLayout>
      <div className={styles.wrapper}>
        <Title level={2}>Bài viết của tôi</Title>

        <Space style={{ marginBottom: 16 }}>
          <FilterOutlined />
          <Text>Trạng thái: </Text>
          <Select className={styles.selectStatus}
            value={dataFilter.status}
            onChange={handleStatusChange}
            style={{ width: 150 }}
          >
            {statusOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Space>

        {isLoadingMyPost ? (
          <Spin />
        ) : (
          <>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={myPost}
              renderItem={(post) => (
                <List.Item>
                  <Card className={styles.cardPost} hoverable>
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Link to={`/post/${post.id}`}>
                        <Title level={4} className={styles.title}>
                          {post.title}
                        </Title>
                      </Link>

                      <div
                        className={`post-preview ${styles.postPreview}`}
                        dangerouslySetInnerHTML={{
                          __html: renderContentPreview(post.content),
                        }}
                      />

                      {post.rejectReason && (
                        <Text className={styles.rejectReason}>
                          <strong>Lý do từ chối:</strong> {post.rejectReason}
                        </Text>
                      )}

                      <Space size="large" wrap>
                        <Text>
                          <LikeOutlined /> {post.likesCount}
                        </Text>
                        <Text>
                          <EyeOutlined /> {post.viewsCount}
                        </Text>
                        <Text type="secondary">
                          Ngày đăng:{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                        <Tag color={statusColor[post.status] || "default"}>
                          {getStatusLabel(post.status)}
                        </Tag>
                      </Space>

                      {post.status !== "BLOCK" && (
                        <div className={styles.editButton}>
                          <Link to={`/edit-post/${post.id}`}>
                            <Button type="primary" icon={<EditOutlined />}>
                              Sửa bài
                            </Button>
                          </Link>
                        </div>
                      )}
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
            <Pagination
              style={{ textAlign: "center", marginTop: 16 }}
              current={paginationListMyPost.currentPage || 1}
              pageSize={paginationListMyPost.perPage || 10}
              total={paginationListMyPost.totalRecord || 0}
              onChange={changeCurrentPage}
            />
          </>
        )}
      </div>
    </MainClientLayout>
  );
};

export default ListMyPosts;
