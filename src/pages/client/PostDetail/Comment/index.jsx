  import React, { useEffect, useState, useCallback } from "react";
  import {
    List,
    Avatar,
    Input,
    Spin,
    Typography,
    Pagination,
    Popconfirm,
    Space,
    Modal,
    Button,
  } from "antd";
  import { useDispatch, useSelector } from "react-redux";
  import {getNotification} from "../../../../utils/helper";
  import {
    getCommentsFromPost,
    createCommentForPost,
    // updateComment,
    deleteCommentById,
    reportComment
  } from "../../../../api/post"; // giả sử api có 3 hàm mới
  import moment from "moment";
  import { useParams } from "react-router-dom";
  import ButtonMASQ from "components/UI/Button";

  const { TextArea } = Input;
  const { Text } = Typography;

  const CustomComment = ({
    comment,
    onEdit,
    onDelete,
    onReport,
    isEditing,
    onChangeEditContent,
    onCancelEdit,
    onSaveEdit,
    authUserId,
  }) => {
    const { id, authorName, content, createdAt, userId } = comment;

    return (
      <div style={{ display: "flex", marginBottom: 16 }}>
        <Avatar style={{ marginRight: 12 }}>{authorName?.charAt(0)}</Avatar>
        <div style={{ flex: 1 }}>
          <Text strong>{authorName}</Text>
          <div style={{ fontSize: 12, color: "gray" }}>{moment(createdAt).fromNow()}</div>
          {!isEditing ? (
            <div style={{ marginTop: 4 }}>{content}</div>
          ) : (
            <TextArea
              rows={3}
              value={content}
              onChange={(e) => onChangeEditContent(e.target.value)}
              style={{ marginTop: 4 }}
            />
          )}
          <Space size="middle" style={{ marginTop: 8 }}>
            {userId === authUserId && !isEditing && (
              <>
                <a onClick={() => onEdit(id, content)}>Sửa</a>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa bình luận này?"
                  onConfirm={() => onDelete(id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <a style={{ color: "red" }}>Xóa</a>
                </Popconfirm>
              </>
            )}
            {userId !== authUserId && !isEditing && (
              <a onClick={() => onReport(id)}>Báo cáo</a>
            )}
            {isEditing && (
              <>
                <Button size="small" type="primary" onClick={() => onSaveEdit(id)}>
                  Lưu
                </Button>
                <Button size="small" onClick={onCancelEdit}>
                  Hủy
                </Button>
              </>
            )}
          </Space>
        </div>
      </div>
    );
  };

  const CommentList = () => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    const authUser = useSelector((state) => state.auth.authUser);

    const comments = useSelector((state) => state.comment.comments);
    const paginationComments = useSelector(
      (state) => state.comment.paginationListCommentFromPost
    );
    const isLoadingComments = useSelector(
      (state) => state.comment.isLoadingComments
    );
    const isLoadingBtnCreateComment = useSelector(
      (state) => state.comment.isLoadingBtnCreateComment
    );

    const [content, setContent] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // const [editingCommentId, setEditingCommentId] = useState(null);
    // const [editingContent, setEditingContent] = useState("");

    const fetchComments = useCallback(
      (page = 1) => {
        dispatch(
          getCommentsFromPost({
            postId,
            page: page - 1,
            size: paginationComments?.perPage || 10,
          })
        );
      },
      [dispatch, postId, paginationComments?.perPage]
    );

    useEffect(() => {
      fetchComments(currentPage);
    }, [fetchComments, currentPage]);

    const handleSubmit = async () => {
      if (!content.trim()) {
        return getNotification('error', 'Nội dung không được để trống');
      }
      await dispatch(
        createCommentForPost({
          postId,
          content,
          userId: authUser.id,
        })
      );
      setContent("");
      await fetchComments(currentPage);
    };

    const onChangePage = (page) => {
      setCurrentPage(page);
    };

    // --- Chỉnh sửa bình luận ---
    // const onEdit = (id, currentContent) => {
    //   setEditingCommentId(id);
    //   setEditingContent(currentContent);
    // };

    // const onChangeEditContent = (val) => {
    //   setEditingContent(val);
    // };

    // const onCancelEdit = () => {
    //   setEditingCommentId(null);
    //   setEditingContent("");
    // };

    // const onSaveEdit = async (id) => {
    //   if (!editingContent.trim()) {
    //     return message.warning("Nội dung bình luận không được để trống");
    //   }
    //   try {
    //     await dispatch(updateComment({ commentId: id, content: editingContent }));
    //     message.success("Cập nhật bình luận thành công");
    //     setEditingCommentId(null);
    //     setEditingContent("");
    //     fetchComments(currentPage);
    //   } catch (error) {
    //     message.error("Cập nhật bình luận thất bại");
    //   }
    // };

    // --- Xóa bình luận ---
    const onDelete = async (id) => {
        await dispatch(deleteCommentById({ commentId: id }));
        // Nếu sau khi xóa mà trang hiện tại không còn bình luận, về trang trước
        if (comments.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchComments(currentPage);
        }
    };

    // --- Báo cáo bình luận ---
  const onReport = (commentId) => {
    let tempReportContent = "";

    Modal.confirm({
      title: "Báo cáo bình luận",
      content: (
        <TextArea
          placeholder="Nội dung báo cáo"
          autoSize={{ minRows: 3 }}
          onChange={(e) => {
            tempReportContent = e.target.value;
          }}
        />
      ),
      okText: "Gửi báo cáo",
      cancelText: "Hủy",
      onOk: async () => {
        if (!tempReportContent.trim()) {
          getNotification("error", "Vui lòng nhập nội dung báo cáo");
          return Promise.reject();
        }

        try {
          await dispatch(
            reportComment({
              commentId,
              reason: tempReportContent,
              userId: authUser.id, // 👈 thêm dòng này
            })
          );
          getNotification("success", "Đã gửi báo cáo bình luận");
        } catch (error) {
          getNotification("error", "Gửi báo cáo thất bại");
        }
      },
    });
  };



    return (
      <div style={{ marginTop: 48 }}>
        <h3>{paginationComments?.totalRecord || 0} Bình luận</h3>

        {authUser && (
          <div style={{ marginBottom: 16 }}>
            <TextArea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
            />
            <ButtonMASQ
              textBtn="Gửi bình luận"
              onClick={handleSubmit}
              loading={isLoadingBtnCreateComment}
              style={{ marginTop: 8 }}
            />
          </div>
        )}

        {isLoadingComments ? (
          <Spin />
        ) : (
          <>
            <List
              dataSource={comments}
              renderItem={(item) => (
                <CustomComment
                  key={item.id}
                  comment={{
                    id: item.id,
                    authorName: item.authorName,
                    content:  item.content,
                    createdAt: item.createdAt,
                    userId: item.userId,
                  }}
                  // isEditing={editingCommentId === item.id}
                  // onEdit={onEdit}
                  onDelete={onDelete}
                  onReport={onReport}
                  // onChangeEditContent={onChangeEditContent}
                  // onCancelEdit={onCancelEdit}
                  // onSaveEdit={onSaveEdit}
                  authUserId={authUser.id}
                />
              )}
            />
            {paginationComments?.totalRecord > paginationComments.perPage && (
              <Pagination
                current={paginationComments.currentPage + 1}
                pageSize={paginationComments.perPage}
                total={paginationComments.totalRecord}
                onChange={onChangePage}
                style={{ marginTop: 16, textAlign: "right" }}
              />
            )}
          </>
        )}
      </div>
    );
  };

  export default CommentList;
