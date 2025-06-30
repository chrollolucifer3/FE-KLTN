import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";

import MainLayout from "../../../layouts/Client/MainLayout";
import { Select, message } from "antd";
import InputMASQ from "../../../components/UI/Input";
import ButtonMASQ from "../../../components/UI/Button";

import { getCategorySub } from "../../../api/category";
import { uploadImage, handleCreatePost } from "../../../api/post";
import { setErrorCreatePost } from "../../../states/modules/post";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";

if (typeof window !== "undefined") {
  window.katex = katex;
}

export default function PostEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const authUser = useSelector((state) => state.auth.authUser);
  const categories = useSelector((state) => state.category.categories);
  const errorCreatePost = useSelector((state) => state.post.errorCreatePost);
  const isLoadingCreatePost = useSelector(
    (state) => state.post.isLoadingBtnCreatePost
  );

  const [dataPost, setDataPost] = useState({
    title: "",
    content: "",
    categoryId: null,
  });

  useEffect(() => {
    dispatch(setErrorCreatePost({ title: "", content: "", categoryId: "" }));
    dispatch(getCategorySub());
  }, [dispatch]);

  const handleChangeInput = (e, type) => {
    const value = e.target.value;
    setDataPost((prev) => ({
      ...prev,
      [type]: value,
    }));

    const validate = isValidate(
      { ...dataPost, [type]: value },
      type,
      errorCreatePost
    );
    dispatch(setErrorCreatePost(validate.error));
  };

  const handleChangeContent = (content) => {
    setDataPost((prev) => ({
      ...prev,
      content,
    }));

    const validate = isValidate(
      { ...dataPost, content },
      "content",
      errorCreatePost
    );
    dispatch(setErrorCreatePost(validate.error));
  };

  const validateBlur = (type) => {
    const validate = isValidate(dataPost, type, errorCreatePost);
    dispatch(setErrorCreatePost(validate.error));
    if (validate.isError && validate.error[type]) {
      message.error(validate.error[type]);
    }
    return validate.isError;
  };

 const handleConfirmCreatePost = async () => {
  const dataValidate = {
    ...dataPost,
    title: dataPost.title.trim(),
    content: dataPost.content.trim(),
    userId: authUser?.id,
  };

  const validate = handleCheckValidateConfirm(dataValidate, errorCreatePost);
  dispatch(setErrorCreatePost(validate.dataError));

  if (validate.isError) {
    // Hiển thị thông báo lỗi tương ứng
    if (validate.dataError.title) {
      message.error(validate.dataError.title);
    } else if (validate.dataError.content) {
      message.error(validate.dataError.content);
    } else if (validate.dataError.categoryId) {
      message.error(validate.dataError.categoryId);
    }
    return; // Ngăn submit nếu có lỗi
  }

  let updatedContent = normalizeContent(dataValidate.content);
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

  await dispatch(
    handleCreatePost({ ...dataValidate, content: updatedContent })
  );
  message.success("Đăng bài thành công");
  navigate("/");
};


  return (
    <MainLayout>
      <div className={styles.mainModalWrap}>
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
            <div className={styles.errorText}>{errorCreatePost.categoryId}</div>
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
            placeholder="Nhập nội dung bài viết, có thể dùng $$ công thức toán học $$"
          />
          {errorCreatePost.content && (
            <div className={styles.errorText}>{errorCreatePost.content}</div>
          )}
        </div>

        {/* Nút đăng */}
        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn="Đăng bài"
            loading={isLoadingCreatePost}
            onClick={handleConfirmCreatePost}
            disable={
              !dataPost.title.trim() ||
              !dataPost.content.trim() ||
              !dataPost.categoryId
            }
          />
        </div>
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
