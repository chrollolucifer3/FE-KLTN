import React, { useEffect, useState } from "react";
import { Modal, Input, Button, message } from "antd";
import styles from "./styles.module.scss";
import { rejectPost } from "../../../../api/post";
import {rejectDocumentForAdmin} from "../../../../api/document";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

function RejectPostModal({ isOpen, onClose, id, type }) {
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setRejectReason(""); // Reset khi mở lại modal
    }
  }, [isOpen]);

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      message.error("Vui lòng nhập lý do từ chối.");
      return;
    }
    setLoading(true);
    if (type === "document") {
      await dispatch(rejectDocumentForAdmin({ id, rejectReason: rejectReason }));
    } else {
      await dispatch(rejectPost({ id, reason: rejectReason }));
    }
    onClose();
    setLoading(false);
  };

  const getTitle = () => {
    if (type === "document") return "Từ chối tài liệu";
    return "Từ chối bài viết";
  }

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
          key="reject"
          type="primary"
          danger
          loading={loading}
          onClick={handleReject}
        >
          Từ chối
        </Button>,
      ]}
    >
      <div className={styles.rejectForm}>
        <div>
          <strong>Lý do từ chối:</strong>
        </div>
        <TextArea
          rows={4}
          placeholder="Nhập lý do từ chối..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>
    </Modal>
  );
}

export default RejectPostModal;
