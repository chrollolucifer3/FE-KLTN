import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputMASQ from "../../components/UI/Input";
import ButtonMASQ from "../../components/UI/Button";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  getListEmployee,
  handleDeleteEmployee,
  unBlock,
} from "../../api/employee";
import {
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalUnBlockEmployee,
} from "../../states/modules/employee";
import { Tag } from "antd";
import _ from "lodash";
import Filter from "./components/Filter";
import BtnFilter from "../../components/ButtonFilter";
import { EditOutlined, DeleteOutlined, UnlockOutlined } from "@ant-design/icons";

function Employee() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const employees = useSelector((state) => state.employee.employees);
  const isLoadingTableEmployee = useSelector(
    (state) => state.employee.isLoadingTableEmployee
  );
  const paginationListEmployee = useSelector(
    (state) => state.employee.paginationListEmployee
  );
  const visibleModalDeleteEmployee = useSelector(
    (state) => state.employee.visibleModalDeleteEmployee
  );
  const visibleModalUnBlock = useSelector(
    (state) => state.employee.visibleModalUnBlockEmployee
  );

  const [employee, setEmployee] = useState({});
  const [configModal, setConfigModal] = useState({
    title: "Create user",
    type: "CREATE",
  });

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    isActive: "", // true/false/""
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListEmployee(dataFilter));
  }, [dataFilter, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
    setConfigModal({ title: "Create user", type: "CREATE" });
  };

  const handleEdit = (employee) => {
    setEmployee(_.cloneDeep(employee));
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
    setConfigModal({ title: "Update user", type: "UPDATE" });
  };

  const handleShowConfirmDelete = (employee) => {
    setEmployee(_.cloneDeep(employee));
    dispatch(setVisibleModalDeleteEmployee(true));
  };

  const handleConfirmDeleteEmployee = () => {
    dispatch(handleDeleteEmployee(employee.id));
  };

  const handleShowConfirmUnBlock = (employee) => {
    setEmployee(_.cloneDeep(employee));
    dispatch(setVisibleModalUnBlockEmployee(true));
  };

  const handleUnBlockEmployee = () => {
    dispatch(unBlock(employee.id));
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value, page: 1 });
  };

  const handleChangeStatus = (value) => {
    setDataFilter({
      ...dataFilter,
      isActive: value === "" ? "" : value === "true",
      page: 1,
    });
  };

  const onChange = (pagination, filters, sorter) => {
    if (sorter.order && sorter.field) {
      setDataFilter({
        ...dataFilter,
        order: sorter.order === "descend" ? "DESC" : "ASC",
        column: sorter.field,
        page: 1,
      });
    } else {
      setDataFilter({ ...dataFilter, order: null, column: null, page: 1 });
    }
  };

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page });
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className={styles.nameWrap}>
          <div className={styles.imgWrap}>
          </div>
          <span>{record.fullName}</span>
        </div>
      ),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) =>
        record.isActive ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Khóa</Tag>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: 120,
      render: (text, record) =>
        authUser.id !== record.id && (
          <div className={styles.btnAction}>
            <div onClick={() => handleEdit(record)} className={styles.btnWrap}>
              <EditOutlined style={{ color: "#1890ff", fontSize: 16 }} />
            </div>
            <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
              <DeleteOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />
            </div>
            {!record.isActive && (
              <div onClick={() => handleShowConfirmUnBlock(record)} className={styles.btnWrap}>
                <UnlockOutlined style={{ color: "#1890ff", fontSize: 16 }} />
              </div>
            )}
          </div>
        ),
    },
  ];

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Tổng số bản ghi ({paginationListEmployee.totalRecord})
            </span>
            <ButtonMASQ textBtn="+ Thêm mới" onClick={handleCreate} />
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputMASQ
                placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                value={dataFilter.keySearch}
                onChange={handleSearch}
              />
            </div>

            <BtnFilter
              content={
                <Filter
                  statusUser={
                    dataFilter.isActive === ""
                      ? ""
                      : dataFilter.isActive === true
                      ? "true"
                      : "false"
                  }
                  onChangeStatus={handleChangeStatus}
                />
              }
            />
          </div>

          <TableCustom
            loading={isLoadingTableEmployee}
            columns={columns}
            dataSource={employees}
            rowKey={(record) => record.id}
            pagination={paginationListEmployee}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate employee={employee} configModal={configModal} />

        <ModalConfirm
          isModalOpen={visibleModalDeleteEmployee}
          title={`Khóa ${employee.fullName}?`}
          description={`Bạn có chắc chắn khóa tài khoản ${employee.fullName}?`}
          onClose={() => dispatch(setVisibleModalDeleteEmployee(false))}
          onConfirm={handleConfirmDeleteEmployee}
        />

        <ModalConfirm
          isModalOpen={visibleModalUnBlock}
          title={`Mở khóa ${employee.fullName}?`}
          description={`Bạn có chắc chắn mở khóa tài khoản ${employee.fullName}?`}
          onClose={() => dispatch(setVisibleModalUnBlockEmployee(false))}
          onConfirm={handleUnBlockEmployee}
        />
      </div>
    </MainLayout>
  );
}

export default Employee;
