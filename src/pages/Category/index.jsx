import { Table, Button, Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllCategoryParentForAdmin,
  createCategoryParentForAdmin,
  createCategorySubForAdmin,
  updateCategoryForAdmin,
} from "../../api/category";

const { Option } = Select;

export default function Category() {
  const dispatch = useDispatch();
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);

  const allCategoryParent = useSelector(
    (state) => state.category.categoryParent
  );
  const allCategories = useSelector((state) => state.category.allCategories);
  const isLoadingCategory = useSelector(
    (state) => state.category.isLoadingCategory
  );

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCategoryParentForAdmin());
  }, [dispatch]);

  // ================= ADD CATEGORY =================
  const handleAddCategory = () => {
    formAdd.resetFields();
    setModalAddVisible(true);
  };

  const handleSubmitAddCategory = (values) => {
    const { name, parentId } = values;

    const action = parentId
      ? createCategorySubForAdmin({ name, parentId })
      : createCategoryParentForAdmin({ name });

    dispatch(action).then(() => {
      setModalAddVisible(false);
    });
  };

  // ================= EDIT CATEGORY =================
  const handleEditCategory = (record) => {
    setEditingCategory(record);
    formEdit.setFieldsValue({
      name: record.name,
      parentId: record.parentCategory?.id || undefined,
    });
    setModalEditVisible(true);
  };

  const handleSubmitEditCategory = (values) => {
    const { name, parentId } = values;

    dispatch(
      updateCategoryForAdmin({
        id: editingCategory.id,
        name,
        parentId: parentId || null,
      })
    )
      .then(() => {
        setModalEditVisible(false);
        setEditingCategory(null);
      })
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Danh mục cha",
      dataIndex: ["parentCategory", "name"],
      render: (_, record) => record.parentCategory?.name || "",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEditCategory(record)}
        >
          Sửa
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className={styles.dashboardWrap}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCategory}
          style={{ marginBottom: 16 }}
        >
          Thêm danh mục
        </Button>

        <Table
          dataSource={allCategories}
          columns={columns}
          rowKey="id"
          loading={isLoadingCategory}
          pagination={true}
        />

        {/* ===== Modal Thêm ===== */}
        <Modal
          title="Thêm danh mục"
          open={modalAddVisible}
          onCancel={() => setModalAddVisible(false)}
          onOk={() => formAdd.submit()}
          okText="Thêm"
          cancelText="Hủy"
        >
          <Form
            form={formAdd}
            layout="vertical"
            onFinish={handleSubmitAddCategory}
          >
            <Form.Item
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: "Nhập tên danh mục" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="parentId" label="Danh mục cha">
              <Select allowClear placeholder="Chọn danh mục cha (nếu có)">
                {allCategoryParent.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* ===== Modal Sửa ===== */}
        <Modal
          title="Sửa danh mục"
          open={modalEditVisible}
          onCancel={() => {
            setModalEditVisible(false);
            setEditingCategory(null);
          }}
          onOk={() => formEdit.submit()}
          okText="Cập nhật"
          cancelText="Hủy"
        >
          <Form
            form={formEdit}
            layout="vertical"
            onFinish={handleSubmitEditCategory}
          >
            <Form.Item
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: "Nhập tên danh mục" }]}
            >
              <Input />
            </Form.Item>

            {/* CHỈ HIỂN THỊ nếu DANH MỤC hiện tại có DANH MỤC CHA */}
            {editingCategory?.parentCategory && (
              <Form.Item name="parentId" label="Danh mục cha">
                <Select allowClear placeholder="Chọn danh mục cha (nếu có)">
                  {allCategoryParent
                    .filter((cat) => cat.id !== editingCategory.id) // Không cho chọn chính nó làm cha
                    .map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}
