import React from 'react';
import { Modal } from 'antd';

function ConfirmActionModal({ isOpen, onClose, onConfirm, data }) {
  const isPost = !!data?.postId;
  const isComment = !!data?.commentId;

  return (
    <Modal
      title="Xác nhận hành động"
      open={isOpen}
      onCancel={onClose}
      onOk={() => {
        onConfirm(data);
        onClose();
      }}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <p>
        {isPost && (
          <>
            Bạn có chắc chắn muốn <strong>khóa bài viết</strong> này không?
          </>
        )}
        {isComment && !isPost && (
          <>
            Bạn có chắc chắn muốn <strong>xóa bình luận</strong> này không?
          </>
        )}
      </p>
    </Modal>
  );
}

export default ConfirmActionModal;
