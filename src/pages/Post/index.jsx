import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputMASQ from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, deletePost } from "../../api/post";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import Filter from "./components/Filter";
import BtnFilter from "../../components/ButtonFilter";
// import {getCategorySub} from "../../api/category";
import {
  EyeFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
} from "@ant-design/icons";
import {
  setVisibleModalDetailPost,
  setVisibleModalApprovePost,
  setVisibleModalRejectPost,
  setVisibleModalDeletePost,
} from "../../states/modules/post";
import PostDetailModal from "../../components/UI/Modal/ModalDetail";
import PostApproveModal from "../../components/UI/Modal/ModalApprove";
import PostRejectModal from "../../components/UI/Modal/ModalReject";
function Post() {
  // const authUser = useSelector(state => state.auth.authUser);

  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className={styles.nameWrap}>
          <div className={styles.imgWrap}></div>
          <span>{record.title}</span>
        </div>
      ),
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Tác giả",
      dataIndex: "authorName",
      key: "authorName",
      render: (text, record) => <span>{record.authorName}</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text, record) => <span>{record.categoryName}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <span>
          {new Date(record.createdAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "200px",
      render: (text, record) => (
        <div className={styles.btnAction}>
          {/* Nút xem chi tiết */}
          <span
            title="Xem chi tiết"
            onClick={() => handleViewDetail(record)}
            style={{
              cursor: "pointer",
              color: "#1890ff",
              fontSize: 18,
              marginRight: 8,
            }}
          >
            <EyeFilled />
          </span>

          {/* Nếu trạng thái là PENDING thì có duyệt + từ chối */}
          {record.status === "PENDING" && (
            <>
              <span
                title="Duyệt"
                onClick={() => handleShowModalApprovePost(record)}
                style={{
                  cursor: "pointer",
                  color: "#52c41a",
                  fontSize: 18,
                  marginRight: 8,
                }}
              >
                <CheckCircleFilled />
              </span>
              <span
                title="Từ chối"
                onClick={() => handleShowModalRejectPost(record)}
                style={{
                  cursor: "pointer",
                  color: "#fa8c16",
                  fontSize: 18,
                  marginRight: 8,
                }}
              >
                <CloseCircleFilled />
              </span>
            </>
          )}
          {/* Nếu trạng thái là APPROVED thì có nút xóa */}
          {record.status === "APPROVED" && (
            <span
              title="Xóa"
              onClick={() => handleShowModalDeletePost(record)}
              style={{
                cursor: "pointer",
                color: "#ff4d4f",
                fontSize: 18,
              }}
            >
              <DeleteFilled />
            </span>
          )}
        </div>
      ),
    },
  ];

  const posts = useSelector((state) => state.post.posts);
  // const categories = useSelector(state => state.category.categories);
  const isLoadingTablePost = useSelector(
    (state) => state.post.isLoadingTableEmployee
  );
  const paginationListPost = useSelector(
    (state) => state.post.paginationListPost
  );
  const visibleModalDetailPost = useSelector(
    (state) => state.post.visibleModalDetailPost
  );
  const visibleModalApprovePost = useSelector(
    (state) => state.post.visibleModalApprovePost
  );
  const visibleModalRejectPost = useSelector(
    (state) => state.post.visibleModalRejectPost
  );
  const visibleModalDeletePost = useSelector(
    (state) => state.post.visibleModalDeletePost
  );
  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    // status: '',
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });
  const [post, setPost] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost(dataFilter));
  }, [dataFilter, dispatch]);

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setDataFilter({
        ...dataFilter,
        order: sorter.order === "descend" ? "DESC" : "ASC",
        column: sorter.field,
      });
    } else {
      setDataFilter({ ...dataFilter, order: null, column: null });
    }
  };

  const handleViewDetail = (post) => {
    let postSelect = { ...post };
    setPost(postSelect);
    dispatch(setVisibleModalDetailPost(true));
  };

  const handleShowModalApprovePost = (post) => {
    // dispatch(getCategorySub());
    let postSelect = { ...post };
    setPost(postSelect);
    dispatch(setVisibleModalApprovePost(true));
  };

  const handleShowModalRejectPost = (post) => {
    let postSelect = { ...post };
    setPost(postSelect);
    dispatch(setVisibleModalRejectPost(true));
  };

  const handleShowModalDeletePost = (post) => {
    let postSelect = { ...post };
    setPost(postSelect);
    dispatch(setVisibleModalDeletePost(true));
  };

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    dispatch(getAllPost(dataFilter));
  };

  const handleChangeStatus = (value) => {
    setDataFilter({ ...dataFilter, status: value, page: 1 });
  };
  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Tổng số bản ghi ({paginationListPost.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <BtnFilter
              content={
                <Filter
                  statusPost={dataFilter.status} 
                  onChangeStatus={handleChangeStatus}
                />
              }
            />
          </div>

          <TableCustom
            loading={isLoadingTablePost}
            columns={columns}
            dataSource={posts}
            rowKey={(record) => record.id}
            pagination={paginationListPost}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>
        <PostDetailModal
          isOpen={visibleModalDetailPost}
          onClose={() => dispatch(setVisibleModalDetailPost(false))}
          post={post}
        />

        <PostApproveModal
          isOpen={visibleModalApprovePost}
          onClose={() => dispatch(setVisibleModalApprovePost(false))}
          id={post.id}
          type={"post"}
          // categories={categories}
        />

        <PostRejectModal
          isOpen={visibleModalRejectPost}
          onClose={() => dispatch(setVisibleModalRejectPost(false))}
          id={post.id}
        />

        <ModalConfirm
          isModalOpen={visibleModalDeletePost}
          title={`Xóa ${post.title}?`}
          description={`Bạn có chắc chắn xóa bài viết ${post.title}? Hành động này sẽ không thể hoàn tác.`}
          onClose={() => dispatch(setVisibleModalDeletePost(false))}
          onConfirm={() => handleDeletePost(post.id)}
        />
      </div>
    </MainLayout>
  );
}

export default Post;
