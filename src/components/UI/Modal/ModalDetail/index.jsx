import React from "react";
import { Modal } from "antd";
import DOMPurify from "dompurify";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "./styles.module.scss";

// Hàm phân tách nội dung thành đoạn text và công thức LaTeX (dấu $...$ hoặc $$...$$)
function parseContent(content) {
  // Ví dụ đơn giản: tách theo $$...$$ block math và $...$ inline math
  // Bạn có thể tùy chỉnh regex cho phù hợp hơn
  const parts = [];
  let remaining = content;

  // Đầu tiên xử lý $$...$$ block math
  const blockMathRegex = /\$\$([^$]+)\$\$/g;
  let match, lastIndex = 0;

  while ((match = blockMathRegex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: remaining.slice(lastIndex, match.index) });
    }
    parts.push({ type: "blockMath", content: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < remaining.length) {
    parts.push({ type: "text", content: remaining.slice(lastIndex) });
  }

  // Tiếp tục tách inline math $...$ trong phần text
  // Với phần blockMath đã tách riêng, ta xử lý inline math trong các phần text
  const finalParts = [];
  parts.forEach((part) => {
    if (part.type === "blockMath") {
      finalParts.push(part);
    } else {
      // xử lý inline math trong đoạn text
      const inlineMathRegex = /\$([^$]+)\$/g;
      let textRemaining = part.content;
      let lastPos = 0;
      let m;
      while ((m = inlineMathRegex.exec(textRemaining)) !== null) {
        if (m.index > lastPos) {
          finalParts.push({ type: "text", content: textRemaining.slice(lastPos, m.index) });
        }
        finalParts.push({ type: "inlineMath", content: m[1] });
        lastPos = m.index + m[0].length;
      }
      if (lastPos < textRemaining.length) {
        finalParts.push({ type: "text", content: textRemaining.slice(lastPos) });
      }
    }
  });

  return finalParts;
}

function PostDetailModal({ isOpen, onClose, post }) {
  if (!post) return null;

  // Sanitize nội dung (bỏ qua tag script, style,..)
  const sanitizedRawContent = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
  });

  // Thay đường dẫn ảnh tương đối thành tuyệt đối
  const contentWithFixedImages = sanitizedRawContent.replace(
    /src="(?!http)([^"]+)"/g,
    (match, p1) => `src="http://localhost:8080${p1}"`
  );

  // Tách nội dung thành từng phần để render math
  const parsedParts = parseContent(contentWithFixedImages);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Chi tiết bài viết"
      className={styles.modalWrap}
      width={1200}
      centered
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <div className={styles.postDetailWrap}>
        <div>
          <strong>Tiêu đề:</strong> {post.title}
        </div>
        <div>
          <strong>Tác giả:</strong> {post.authorName}
        </div>
        <div>
          <strong>Danh mục:</strong> {post.categoryName}
        </div>
        <div>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(post.createdAt).toLocaleString()}
        </div>
        {post.status === "REJECTED" && post.rejectReason && (
          <div>
            <strong>Lý do từ chối:</strong> {post.rejectReason}
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <strong>Nội dung:</strong>
          <div className={styles.contentBox} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {parsedParts.map((part, index) => {
              if (part.type === "text") {
                // Render phần text bình thường (đã sanitize)
                return <span key={index} dangerouslySetInnerHTML={{ __html: part.content }} />;
              }
              if (part.type === "inlineMath") {
                return <InlineMath key={index} math={part.content} />;
              }
              if (part.type === "blockMath") {
                return <BlockMath key={index} math={part.content} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostDetailModal;
