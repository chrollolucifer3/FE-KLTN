import React, { useEffect, useState, useCallback } from "react";
import { Badge, Dropdown, List, message, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { connectNotificationWS } from "../../../utils/websocket";
import {
  getAllNoti,
  getCountNoti,
  NotificationIsRead,
  NotificationMarkAllRead,
} from "../../../api/notification";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.authUser);
  const countNoti = useSelector((state) => state.notification.countNoti || 0);
  const notifications = useSelector(
    (state) => state.notification.notifications || []
  );
  const [open, setOpen] = useState(false);

  const fetchNotifications = useCallback(() => {
    dispatch(
      getAllNoti({
        page: 1,
        perPage: 10,
        sortBy: "createdAt",
        order: "DESC",
      })
    );
    dispatch(getCountNoti());
  }, [dispatch]);

  useEffect(() => {
    if (!authUser?.username || !authUser?.role) return;

    fetchNotifications();

    const client = connectNotificationWS(
      authUser.username,
      () => {
        message.info("🔔 Có thông báo mới");
        fetchNotifications();
      },
      authUser.role
    );

    return () => client.deactivate();
  }, [authUser?.username, authUser?.role, fetchNotifications]);

  const handleVisibleChange = (visible) => {
    setOpen(visible);
    if (visible) fetchNotifications();
  };

  const handleNotificationClick = async (item) => {
    try {
      await dispatch(NotificationIsRead({ notificationId: item.id }));
      navigate(`/post/${item.postId}`);
    } catch (err) {
      message.error("Không thể đánh dấu đã đọc");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(NotificationMarkAllRead());
      fetchNotifications();
      message.success("Đã đánh dấu tất cả là đã đọc");
    } catch (err) {
      message.error("Không thể đánh dấu tất cả là đã đọc");
    }
  };

  const menu = (
    <div
      style={{
        width: 340,
        maxHeight: 440,
        overflowY: "auto",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        background: "#fff",
        padding: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16 }}>Thông báo</div>
        <a
          onClick={handleMarkAllAsRead}
          style={{ fontSize: 13, color: "#1890ff", cursor: "pointer" }}
        >
          Đánh dấu tất cả đã đọc
        </a>
      </div>

      {notifications.length === 0 ? (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            color: "#aaa",
            fontSize: 14,
          }}
        >
          Không có thông báo nào
        </div>
      ) : (
        <>
          <List
            dataSource={notifications}
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item
                style={{
                  borderRadius: 8,
                  padding: "10px 12px",
                  marginBottom: 6,
                  transition: "all 0.2s",
                  background: item.isRead ? "#f9f9f9" : "#e6f7ff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = item.isRead
                    ? "#f9f9f9"
                    : "#e6f7ff")
                }
              >
                <div
                  onClick={() => handleNotificationClick(item)}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {item.title || "Thông báo mới"}
                  </div>
                  <div style={{ fontSize: 13, color: "#555" }}>
                    {item.content || "Không có nội dung"}
                  </div>
                  {item.createdAt && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "#999",
                        marginTop: 4,
                        textAlign: "right",
                      }}
                    >
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
              </List.Item>
            )}
          />

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setOpen(false);
                navigate("/notification");
              }}
            >
              Xem tất cả
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ zIndex: 9999 }}
      open={open}
      onOpenChange={handleVisibleChange}
    >
      <Badge count={countNoti} size="small" offset={[0, 6]}>
        <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell;
