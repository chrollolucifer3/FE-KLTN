import React, { useEffect, useState } from "react";
import MainClientLayout from "../../../layouts/Client/MainLayout";
import { getAllDocumentForClient } from "../../../api/document";
import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableCustom from "../../../components/UI/Table";
import InputMASQ from "../../../components/UI/Input";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input, Select, Upload, message } from "antd";
import { uploadDocument } from "../../../api/document"; // <-- Tạo API này
import { getCategorySub } from "../../../api/category";

const { Option } = Select;

function DocumentForClient() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  const documents = useSelector((state) => state.document.documents);
  const paginationListDocument = useSelector(
    (state) => state.document.paginationListDocument
  );
  const isLoadingTableDocument = useSelector(
    (state) => state.document.isLoadingTableDocument
  );
  const categories = useSelector((state) => state.category.categories);

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllDocumentForClient(dataFilter));
    dispatch(getCategorySub());
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

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (!fileUpload) {
          message.error("Vui lòng chọn file tài liệu.");
          return;
        }

        const formData = new FormData();
        formData.append("file", fileUpload);
        formData.append("categoryId", values.categoryId);
        formData.append("fileName", values.fileName);
        formData.append("userId", authUser.id); // Lấy từ redux hoặc context

        try {
          await dispatch(uploadDocument(formData));
          message.success("Thêm tài liệu thành công");
          setIsModalOpen(false);
          setFileUpload(null);
          form.resetFields();
          dispatch(getAllDocumentForClient(dataFilter)); // Refresh bảng
        } catch (error) {
          message.error("Thêm tài liệu thất bại");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileUpload(null);
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

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Thêm tài liệu
          </Button>
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

      <Modal
        title="Thêm tài liệu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục" loading={!categories?.length}>
              {categories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tên tài liệu"
            name="fileName"
            rules={[{ required: true, message: "Vui lòng nhập tên tài liệu" }]}
          >
            <Input placeholder="Nhập tên tài liệu" />
          </Form.Item>

          <Form.Item label="File tài liệu" required>
            <Upload
              beforeUpload={(file) => {
                setFileUpload(file);
                return false; // Ngăn upload tự động
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
            {fileUpload && (
              <span style={{ marginLeft: 8 }}>{fileUpload.name}</span>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </MainClientLayout>
  );
}

export default DocumentForClient;
