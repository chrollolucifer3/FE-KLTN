import React, { useEffect, useState } from "react";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import { getMyDocumentForClient, deleteDocumentForUser } from "../../../api/document";
import {
  DownloadOutlined,
} from "@ant-design/icons";
import TableCustom from "../../../components/UI/Table";
import InputMASQ from "../../../components/UI/Input";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function MyDocument() {
  const dispatch = useDispatch();

  const myDocuments = useSelector((state) => state.document.myDocuments);
  const paginationListMyDocument = useSelector(
    (state) => state.document.paginationListMyDocument
  );
  const isLoadingTableMyListDocument = useSelector(
    (state) => state.document.isLoadingTableMyListDocument
  );

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getMyDocumentForClient(dataFilter));
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

  const handleDownload = (record) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8080${record.fileUrl}`;
    link.download = record.fileName || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDocumentForUser({ id }));
      message.success("Xoá tài liệu thành công");
      dispatch(getMyDocumentForClient(dataFilter));
    } catch (error) {
      message.error("Xoá tài liệu thất bại");
    }
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
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
    },
    {
      title: "Tên tài liệu",
      dataIndex: "fileName",
      key: "fileName",
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
      title: "Thao tác",
      key: "action",
      fixed: "right",
      align: "center",
      width: "160px",
      render: (text, record) => (
        <div className={styles.btnAction}>
          {/* Download */}
          <span
            title="Tải xuống"
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

          {/* Delete */}
          <Popconfirm
            title="Bạn có chắc muốn xoá tài liệu này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <span
              title="Xoá tài liệu"
              style={{
                cursor: "pointer",
                color: "#ff4d4f",
                fontSize: 18,
              }}
            >
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <MainClientLayout>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>Danh sách tài liệu</h1>
        <div
          className={styles.boxFilterWrap}
          style={{ display: "flex", gap: 8 }}
        >
          <div className={styles.inputWrap} style={{ flex: 1 }}>
            <InputMASQ
              placeholder="Tìm kiếm theo tên tài liệu..."
              value={dataFilter.keySearch}
              onChange={handleSearch}
            />
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <path
                d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                fill="#3D4667"
              />
            </svg>
          </div>
        </div>

        <TableCustom
          loading={isLoadingTableMyListDocument}
          columns={columns}
          dataSource={myDocuments}
          rowKey={(record) => record.id}
          pagination={paginationListMyDocument}
          onChangeCurrentPage={changeCurrentPage}
          onChange={onChange}
        />
      </div>
    </MainClientLayout>
  );
}

export default MyDocument;
