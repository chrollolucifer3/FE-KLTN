import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../layouts/Client/MainLayout";
import dayjs from "dayjs";
import { reportComment } from "../../../api/post";
import {
  Typography,
  Spin,
  Card,
  Divider,
  Tag,
  Button,
  Space,
  message,
  Modal,
  Input,
} from "antd";
import {
  LikeOutlined,
  LikeFilled,
  ShareAltOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CalendarOutlined,
  EyeOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { getPost, postLike } from "../../../api/post";
import { followUser, unfollowAuthor } from "../../../api/employee";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "./Comment";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

import styles from "./styles.module.scss";

const { Title, Text } = Typography;

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.authUser);
  const post = useSelector((state) => state.post.postDetail);

  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  // Modal báo cáo bài viết
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(getPost(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likesCount || 0);
      setLiked(post.liked || false);
      setIsFollowing(post.followingAuthor || false);
      setFollowersCount(post.authorFollowersCount || 0);
    }
  }, [post]);

  useEffect(() => {
    if (post?.content) {
      requestAnimationFrame(() => {
        const el = document.querySelector(`.${styles.postContent}`);
        if (el) {
          renderMathInElement(el, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
          });
        }
      });
    }
  }, [post?.content]);

  const handleLike = () => {
    dispatch(postLike({ postId: id, userId: authUser?.id }));
    setLiked(!liked);
    setLikeCount((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await dispatch(unfollowAuthor(post.userId));
        setIsFollowing(false);
        setFollowersCount((prev) => Math.max(prev - 1, 0));
        message.success("Đã hủy theo dõi tác giả");
      } else {
        await dispatch(followUser(post.userId));
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
        message.success("Đã theo dõi tác giả");
      }
    } catch {
      message.error("Bạn không thể theo dõi chính mình");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("Đã sao chép liên kết bài viết!");
    } catch {
      message.error("Không thể sao chép liên kết.");
    }
  };

  const handleReportPost = async () => {
    if (!reportReason.trim()) {
      message.warning("Vui lòng nhập lý do báo cáo");
      return;
    }

    try {
      await dispatch(
        reportComment({
          postId: id,
          reason: reportReason,
          userId: authUser.id,
        })
      );
      message.success("Đã gửi báo cáo bài viết");
      setReportModalVisible(false);
      setReportReason("");
    } catch (error) {
      message.error("Gửi báo cáo thất bại");
    }
  };

  return (
    <MainLayout>
      <div className={styles.postContainer}>
        {loading ? (
          <Spin tip="Đang tải chi tiết bài viết..." />
        ) : post ? (
          <Card bordered={false} className={styles.postCard}>
            <Title level={2} className={styles.postTitle}>
              {post.title}
            </Title>

            <div className={styles.postMeta}>
              <div className={styles.metaRow}>
                <Text type="secondary">
                  <CalendarOutlined />{" "}
                  {dayjs(post.createdAt).format("DD/MM/YYYY")}
                </Text>
                <Text type="secondary">
                  <EyeOutlined /> {post.viewsCount}
                </Text>
              </div>

              <div className={styles.metaRow}>
                <span>✍️ {post.authorName}</span>
                <Button
                  size="small"
                  icon={
                    isFollowing ? <UserDeleteOutlined /> : <UserAddOutlined />
                  }
                  type={isFollowing ? "primary" : "default"}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Đang theo dõi" : "Theo dõi"} ({followersCount}
                  )
                </Button>
              </div>

              <div className={styles.metaRow}>
                Danh mục: <Tag color="blue">{post.categoryName || "--"}</Tag>
              </div>
            </div>

            <Space size="middle" className={styles.postActions}>
              <Button
                type={liked ? "primary" : "default"}
                icon={liked ? <LikeFilled /> : <LikeOutlined />}
                onClick={handleLike}
              >
                {likeCount}
              </Button>
              <Button icon={<ShareAltOutlined />} onClick={handleShare} />
              {post.userId !== authUser.id && (
                <Button
                  icon={<FlagOutlined />}
                  onClick={() => setReportModalVisible(true)}
                >
                  Báo cáo
                </Button>
              )}
            </Space>

            <Divider />

            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{
                __html: normalizeContent(post.content),
              }}
            />
          </Card>
        ) : (
          <Text type="danger">Không tìm thấy bài viết</Text>
        )}
      </div>

      <div className={styles.commentSection}>
        <CommentList postId={id} />
      </div>

      {/* Modal báo cáo bài viết */}
      <Modal
        title="Báo cáo bài viết"
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleReportPost}
        okText="Gửi"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          placeholder="Nhập lý do bạn muốn báo cáo bài viết này..."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        />
      </Modal>
    </MainLayout>
  );
};

const normalizeContent = (html) => {
  if (!html) return "";

  return html
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p>\s*\$\$\s*<\/p>/g, "$$")
    .replace(/<br\s*\/?>/g, "")
    .replace(/src="(?!http)([^"]+)"/g, (match, p1) => {
      return `src="http://localhost:8080${p1.startsWith("/") ? "" : "/"}${p1}"`;
    });
};

export default PostDetail;
