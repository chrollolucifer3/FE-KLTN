import React, { useEffect, useState } from "react";
import {
  List,
  Typography,
  Spin,
  Button,
  Pagination,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNoti,
  NotificationMarkAllRead,
  NotificationIsRead,
} from "../../../api/notification";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import MainClientLayout from "../../../layouts/Client/MainLayout";

const { Option } = Select;

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notification.notifications || []
  );
  const loading = useSelector(
    (state) => state.notification.isLoadingListNotification
  );
  const paginationListNotification = useSelector(
    (state) => state.notification.paginationListNotification
  );

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    perPage: 10,
    page: 1,
    status: "",
    order: "desc", // mặc định là mới nhất
    column: "createdAt",
  });

  useEffect(() => {
    dispatch(getAllNoti(dataFilter));
  }, [dispatch, dataFilter]);

  const changeCurrentPage = (page) => {
    setDataFilter((prev) => ({ ...prev, page }));
  };

  const handleClick = async (noti) => {
    await dispatch(NotificationIsRead({ notificationId: noti.id }));
    navigate(`/post/${noti.postId}`);
  };

  const handleMarkAllRead = async () => {
    try {
      await dispatch(NotificationMarkAllRead());
      message.success("Đã đánh dấu tất cả là đã đọc");
      dispatch(getAllNoti(dataFilter));
    } catch (err) {
      message.error("Không thể đánh dấu tất cả");
    }
  };

  const handleSortChange = (value) => {
    setDataFilter((prev) => ({
      ...prev,
      order: value,
      column: "createdAt",
      page: 1,
    }));
  };

  return (
    <MainClientLayout>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <Typography.Title level={3} style={{ margin: 0 }}>
            Tất cả thông báo
          </Typography.Title>

          <div style={{ display: "flex", gap: 12 }}>
            <Select
              defaultValue="desc"
              style={{ width: 150 }}
              onChange={handleSortChange}
            >
              <Option value="desc">Mới nhất</Option>
              <Option value="asc">Cũ nhất</Option>
            </Select>
            <Button onClick={handleMarkAllRead}>
              Đánh dấu tất cả là đã đọc
            </Button>
          </div>
        </div>

        {loading ? (
          <Spin />
        ) : (
          <>
            <List
              dataSource={notifications}
              itemLayout="horizontal"
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleClick(item)}
                  className={`${styles.item} ${
                    item.isRead ? styles.read : styles.unread
                  }`}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <div>{item.content}</div>
                    <div className={styles.date}>
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <Pagination
              current={paginationListNotification.currentPage}
              total={paginationListNotification.totalRecord}
              pageSize={paginationListNotification.perPage}
              onChange={changeCurrentPage}
              style={{ marginTop: 20, textAlign: "center" }}
            />
          </>
        )}
      </div>
    </MainClientLayout>
  );
};

export default NotificationPage;
