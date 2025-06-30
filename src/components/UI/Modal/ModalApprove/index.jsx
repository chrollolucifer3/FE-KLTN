import React, { useState } from "react";
import { Modal, Button } from "antd";
import styles from "./styles.module.scss";
import { approvePost } from "../../../../api/post";
import {approveDocumentForAdmin } from "../../../../api/document";
import { useDispatch } from "react-redux";

function ApprovePostModal({ isOpen, onClose, id, type }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const handleApprove = async () => {
    setLoading(true);
    try {
      if (type === "document") {
        await dispatch(approveDocumentForAdmin({id}));
      } else {
        await dispatch(approvePost({id}));
      }
      onClose();
    } catch (error) {
      console.error("Error approving post:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === "document") return "Duyệt tài liệu";
    return "Duyệt bài viết";
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={getTitle()}
      className={styles.modalWrap}
      width={500}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="approve"
          type="primary"
          loading={loading}
          onClick={handleApprove}
        >
          Duyệt
        </Button>,
      ]}
    >
      {/* Có thể thêm nội dung trong Modal ở đây nếu cần */}
    </Modal>
  );
}

export default ApprovePostModal;
