import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";

import MainLayout from "../../../layouts/Client/MainLayout";
import { Select, message, Spin } from "antd";
import InputMASQ from "../../../components/UI/Input";
import ButtonMASQ from "../../../components/UI/Button";

import { getCategorySub } from "../../../api/category";
import { getPost, uploadImage, updatePost } from "../../../api/post";
import { setErrorCreatePost } from "../../../states/modules/post";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";

if (typeof window !== "undefined") {
  window.katex = katex;
}

export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const authUser = useSelector((state) => state.auth.authUser);
  const categories = useSelector((state) => state.category.categories);
  const errorCreatePost = useSelector((state) => state.post.errorCreatePost);
  const post = useSelector((state) => state.post.postDetail);

  const [dataPost, setDataPost] = useState({
    title: "",
    content: "",
    categoryId: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setErrorCreatePost({ title: "", content: "", categoryId: "" }));
    dispatch(getCategorySub());
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setDataPost({
        id: post.id,
        title: post.title || "",
        content: normalizeContent(post.content || ""),
        categoryId: post.categoryId || null,
      });
      setLoading(false);
    }
  }, [post]);

  const handleChangeInput = (e, type) => {
    setDataPost((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const handleChangeContent = (content) => {
    setDataPost((prev) => ({
      ...prev,
      content,
    }));
  };

  const validateBlur = (type) => {
    const validate = isValidate(dataPost, type, errorCreatePost);
    dispatch(setErrorCreatePost(validate.error));
    return validate.isError;
  };

  const handleConfirmUpdatePost = async () => {
    const dataValidate = {
      ...dataPost,
      userId: authUser?.id,
    };

    const validate = handleCheckValidateConfirm(dataValidate, errorCreatePost);
    dispatch(setErrorCreatePost(validate.dataError));

    if (!validate.isError) {
      let updatedContent = normalizeContent(dataPost.content);
      const imgTags = extractImagesFromContent(updatedContent);

      for (const { src, fullTag } of imgTags) {
        if (src.startsWith("data:")) {
          const file = dataURLtoFile(src);
          const formData = new FormData();
          formData.append("file", file);
          const response = await dispatch(uploadImage(formData));
          const uploadedImageUrl = response.result.url;

          if (uploadedImageUrl) {
            updatedContent = updatedContent.replace(
              fullTag,
              `<img src="${uploadedImageUrl}" />`
            );
          }
        }
      }

      await dispatch(updatePost({ ...dataPost, content: updatedContent }));
      message.success("Cập nhật bài viết thành công");
      navigate(`/`);
    }
  };

  return (
    <MainLayout>
      <div className={styles.mainModalWrap}>
        {loading ? (
          <Spin tip="Đang tải bài viết..." />
        ) : (
          <>
            {/* Danh mục */}
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Danh mục *</div>
              <Select
                placeholder="Chọn danh mục"
                value={dataPost.categoryId}
                onChange={(value) =>
                  setDataPost((prev) => ({ ...prev, categoryId: value }))
                }
                onBlur={() => validateBlur("categoryId")}
                style={{ width: "100%" }}
              >
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
              {errorCreatePost.categoryId && (
                <div className={styles.errorText}>
                  {errorCreatePost.categoryId}
                </div>
              )}
            </div>

            {/* Tiêu đề */}
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Tiêu đề *</div>
              <InputMASQ
                type="text"
                placeholder="Nhập tiêu đề bài viết..."
                value={dataPost.title}
                onChange={(e) => handleChangeInput(e, "title")}
                onBlur={() => validateBlur("title")}
                error={errorCreatePost.title}
              />
            </div>

            {/* Nội dung */}
            <div className={styles.inputWrapper}>
              <div className={styles.label}>Nội dung *</div>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={dataPost.content}
                onChange={handleChangeContent}
                modules={modules}
                formats={formats}
                className={styles.editorQuill}
                placeholder="Chỉnh sửa nội dung bài viết..."
              />
              {errorCreatePost.content && (
                <div className={styles.errorText}>
                  {errorCreatePost.content}
                </div>
              )}
            </div>

            {/* Nút cập nhật */}
            <div className={styles.btnWrap}>
              <ButtonMASQ
                textBtn="Cập nhật bài viết"
                onClick={handleConfirmUpdatePost}
              />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "formula"],
    ["clean"],
  ],
  formula: true,
  clipboard: { matchVisual: false },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "formula",
];

// ✅ Hàm chuẩn hóa nội dung
const normalizeContent = (content) => {
  if (!content) return "";
  let result = content;

  result = result
    .split(/<br\s*\/?>|\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (/^<.*?>.*<\/.*?>$/.test(trimmed)) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("");

  result = result.replace(
    /(Bài toán|Lời giải|Chứng minh)(:|：)?/gi,
    "<strong>$1:</strong>"
  );

  result = result.replace(/src="(?!http)([^"]+)"/g, (match, p1) => {
    return `src="http://localhost:8080${p1.startsWith("/") ? "" : "/"}${p1}"`;
  });

  return result;
};

const extractImagesFromContent = (content) => {
  const regex = /(<img[^>]+src="([^">]+)"[^>]*>)/g;
  let matches;
  const images = [];
  while ((matches = regex.exec(content)) !== null) {
    images.push({ fullTag: matches[1], src: matches[2] });
  }
  return images;
};

const dataURLtoFile = (dataurl) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "image.png", { type: mime });
};
