import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputMASQ from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { getAllDocumentForAdmin } from "../../api/document";
import {
  DownloadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import Filter from "./components/Filter";
import BtnFilter from "../../components/ButtonFilter";
import PostApproveModal from "../../components/UI/Modal/ModalApprove";
import PostRejectModal from "../../components/UI/Modal/ModalReject";
// import { Modal } from "antd";
import {
  setVisibleModalApprove,
  setVisibleModalReject,
} from "../../states/modules/document";

function Document() {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.documents);
  const paginationListDocument = useSelector(
    (state) => state.document.paginationListDocument
  );
  const isLoadingTableDocument = useSelector(
    (state) => state.document.isLoadingTableDocument
  );
  const visibleModalApprove = useSelector(
    (state) => state.document.visibleModalApprove
  );
  const visibleModalReject = useSelector(
    (state) => state.document.visibleModalReject
  );

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
    status: "", // Thêm trường status để lọc theo trạng thái
  });

  useEffect(() => {
    dispatch(getAllDocumentForAdmin(dataFilter));
  }, [dataFilter, dispatch]);

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page });
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

  const handleChangeStatus = (value) => {
    setDataFilter({ ...dataFilter, status: value, page: 1 });
  };

  const handleDownload = (record) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8080${record.fileUrl}`; // full URL file
    link.download = record.fileName || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const columns = [
    {
      title: "Tác giả",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Tên tài liệu",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
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
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "160px",
      render: (text, record) => (
        <div className={styles.btnAction}>
          <span
            title="Download tài liệu"
            onClick={() => handleDownload(record)}
            style={{
              cursor: "pointer",
              color: "#1890ff",
              fontSize: 18,
              marginRight: 12,
            }}
          >
            <DownloadOutlined />
          </span>
          {/* Chỉ hiện nếu trạng thái là PENDING */}
          {record.status === "PENDING" && (
            <>
              <span
                title="Duyệt"
                onClick={() => handleApproveDocument(record)}
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
                onClick={() => handleRejectDocument(record)}
                style={{ cursor: "pointer", color: "#ff4d4f", fontSize: 18 }}
              >
                <CloseCircleFilled />
              </span>
            </>
          )}
        </div>
      ),
    },
  ];

  const [selectedDocument, setSelectedDocument] = useState({});

  const handleApproveDocument = (document) => {
    let documentSelect = { ...document };
    setSelectedDocument(documentSelect);
    dispatch(setVisibleModalApprove(true));
  };
  const handleRejectDocument = (document) => {
    let documentSelect = { ...document };
    setSelectedDocument(documentSelect);
    dispatch(setVisibleModalReject(true));
  };

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Tổng số bản ghi ({paginationListDocument.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={dataFilter.keySearch}
                onChange={handleSearch}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                  fill="#3D4667"
                />
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
            loading={isLoadingTableDocument}
            columns={columns}
            dataSource={documents}
            rowKey={(record) => record.id}
            pagination={paginationListDocument}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>
        <PostApproveModal
          isOpen={visibleModalApprove}
          onClose={() => dispatch(setVisibleModalApprove(false))}
          id={selectedDocument.id}
          type={"document"}
          // categories={categories}
        />

        <PostRejectModal
          isOpen={visibleModalReject}
          onClose={() => dispatch(setVisibleModalReject(false))}
          id={selectedDocument.id}
          type={"document"}
        />
      </div>
    </MainLayout>
  );
}

export default Document;
