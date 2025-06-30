import React, { useEffect } from "react";
import { Modal, Spin } from "antd";
import DOMPurify from "dompurify";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getReportDetailById } from "../../../../api/report"; // thunk action

function parseContent(content) {
  const parts = [];
  let remaining = content;
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

  const finalParts = [];
  parts.forEach((part) => {
    if (part.type === "blockMath") {
      finalParts.push(part);
    } else {
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

function ReportContentModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();
  const reportDetail = useSelector((state) => state.report.reportDetail);
  const loading = useSelector((state) => state.report.isLoadingModalReportDetail);

useEffect(() => {
  if (!isOpen || !data) return;

  // Kiểm tra nếu có postId hoặc commentId thì mới dispatch
  const { postId, commentId } = data;
  if (postId || commentId) {
    dispatch(getReportDetailById({ postId, commentId }));
  }
}, [isOpen, data, dispatch]);
  if (!isOpen || !data) return null;

  const isPost = !!data.postId;
  const rawContent = reportDetail?.content || "";

  const sanitized = DOMPurify.sanitize(rawContent, {
    USE_PROFILES: { html: true },
  });

  const contentWithFixedImages = sanitized.replace(
    /src="(?!http)([^"]+)"/g,
    (_, path) => `src="http://localhost:8080${path}"`
  );

  const parsedParts = parseContent(contentWithFixedImages);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={isPost ? "Chi tiết bài viết" : "Chi tiết bình luận"}
      className={styles.modalWrap}
      width={1000}
      centered
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={styles.reportDetailWrap}>
          <div>
            <strong>Người đăng:</strong> {reportDetail?.authorName}
          </div>

          {isPost && (
            <div style={{ marginTop: 16 }}>
              <strong>Tiêu đề bài viết:</strong>
              <div style={{ margin: "8px 0" }}>{reportDetail?.title}</div>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <strong>{isPost ? "Nội dung bài viết:" : "Nội dung bình luận:"}</strong>
            <div
              className={styles.contentBox}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {parsedParts.map((part, idx) => {
                if (part.type === "text") {
                  return <span key={idx} dangerouslySetInnerHTML={{ __html: part.content }} />;
                }
                if (part.type === "inlineMath") {
                  return <InlineMath key={idx} math={part.content} />;
                }
                if (part.type === "blockMath") {
                  return <BlockMath key={idx} math={part.content} />;
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ReportContentModal;
