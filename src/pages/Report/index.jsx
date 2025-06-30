import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputMASQ from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReport,
  deleteCommentOrPostById,
} from "../../api/report";
import ReportContentModal from "../../components/UI/Modal/ReportContentModal";
import ConfirmActionModal from "../../components/UI/Modal/ConfirmActionModal";
import { EyeFilled, DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";

function Report() {
  const reports = useSelector((state) => state.report.reports);
  const paginationListReport = useSelector(
    (state) => state.report.paginationListReport
  );
  const isLoadingTableReport = useSelector(
    (state) => state.report.isLoadingTableReport
  );

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportData, setSelectedReportData] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedActionReport, setSelectedActionReport] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReport(dataFilter));
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

  const handleViewDetail = (record) => {
    const data = {
      ...(record.postId && { postId: record.postId }),
      ...(record.commentId && { commentId: record.commentId }),
      reportId: record.id,
    };
    setSelectedReportData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReportData(null);
  };

  const handleOpenConfirmModal = (record) => {
    const data = {
      ...(record.postId && { postId: record.postId }),
      ...(record.commentId && { commentId: record.commentId }),
    };
    setSelectedActionReport(data);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setSelectedActionReport(null);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmAction = async (data) => {
    try {
      await dispatch(deleteCommentOrPostById(data));
      message.success(
        data.postId
          ? "Khóa bài viết thành công!"
          : "Xóa bình luận thành công!"
      );
      dispatch(getAllReport(dataFilter));
    } catch (err) {
      console.error(err);
      message.error("Đã có lỗi xảy ra!");
    } finally {
      handleCloseConfirmModal();
    }
  };

  const columns = [
    {
      title: "Người báo cáo",
      dataIndex: "authorName",
      key: "authorName",
      render: (text, record) => <span>{record.authorName}</span>,
    },
    {
      title: "Bài viết bị báo cáo",
      dataIndex: "postTitle",
      key: "postTitle",
      render: (text, record) => <span>{record.postTitle}</span>,
    },
    {
      title: "Bình luận bị báo cáo",
      dataIndex: "commentContent",
      key: "commentContent",
      render: (text, record) => <span>{record.commentContent}</span>,
    },
    {
      title: "Nội dung báo cáo",
      dataIndex: "reason",
      key: "reason",
      render: (text, record) => <span>{record.reason}</span>,
    },
       {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <span>{record.status}</span>,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Ngày báo cáo",
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
            title="Xem chi tiết"
            onClick={() => handleViewDetail(record)}
            style={{
              cursor: "pointer",
              color: "#1890ff",
              fontSize: 18,
              marginRight: 12,
            }}
          >
            <EyeFilled />
          </span>
          <span
            title="Xoá hoặc chặn"
            onClick={() => handleOpenConfirmModal(record)}
            style={{ cursor: "pointer", color: "red", fontSize: 18 }}
          >
            <DeleteOutlined />
          </span>
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
              Total records ({paginationListReport.totalRecord})
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
          </div>

          <TableCustom
            loading={isLoadingTableReport}
            columns={columns}
            dataSource={reports}
            rowKey={(record) => record.id}
            pagination={paginationListReport}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <ReportContentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedReportData}
        />

        <ConfirmActionModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmAction}
          data={selectedActionReport}
        />
      </div>
    </MainLayout>
  );
}

export default Report;
