import React from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import { Col, Row, Table } from "antd";
import {
  getCountPostInCurrentMonth,
  getCountCommentInCurrentMonth,
  getPostsInMonthRange,
  getTopFivePostsMostLikedInCurrentMonth,
} from "../../api/post";
import { getCountUserInCurrentMonth } from "../../api/employee";
import { countDocumentInMonth } from "../../api/document";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DatePicker, Button } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FileTextOutlined,
  UserAddOutlined,
  CommentOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
function Home() {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const countPost = useSelector((state) => state.post.countPostInMonth);
  const countComment = useSelector((state) => state.comment.commentInMonth);
  const countDocument = useSelector((state) => state.document.countByDocument);
  const countUser = useSelector((state) => state.employee.userInCurrentMonth);
  const postsTopFive = useSelector((state) => state.post.top5Posts);

  const isLoadingTableMostLiked = useSelector(
    (state) => state.post.isLoadingTableMostLiked
  );

  const [dateRange, setDateRange] = useState([]);
  // Handle date range changes
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };
  const revenueByTime = useSelector((state) => state.post.postInRange);

  // Call API to get revenue data based on date range
  const loadRevenueData = () => {
    if (dateRange && dateRange.length === 2) {
      const [startMonth, endMonth] = dateRange;
      dispatch(
        getPostsInMonthRange({
          startDate: startMonth.startOf("month").format("YYYY-MM-DD"),
          endDate: endMonth.endOf("month").format("YYYY-MM-DD"),
        })
      );
    } else {
      alert("Please select a month range first");
    }
  };

  // Prepare data for chart - convert total_revenue to a number
  const processedRevenueData = Array.isArray(revenueByTime)
    ? revenueByTime.map((item) => ({
        ...item,
        total_revenue: Number(item.total_revenue), // convert string to number
      }))
    : [];

  useEffect(() => {
    dispatch(getCountPostInCurrentMonth());
    dispatch(getCountCommentInCurrentMonth());
    dispatch(getCountUserInCurrentMonth());
    dispatch(countDocumentInMonth());
    dispatch(getTopFivePostsMostLikedInCurrentMonth());
  }, [dispatch]);

  // Table columns
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tác giả",
      dataIndex: "authorName",
      key: "authorName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Lượt thích",
      dataIndex: "likesCount",
      key: "likesCount",
      render: (text) => <span>{text}</span>,
    },
  ];
  return (
    <MainLayout>
      <div className={styles.dashboardWrap}>
        <div className={styles.overviewWrap}>
          <Row gutter={20}>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col span={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>Số lượng bài viết</div>
                      <div className={styles.numberWrap}>{countPost}</div>
                      <div className={styles.dateUpdate}>Tháng này</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.iconWrap}>
                      <FileTextOutlined
                        style={{ fontSize: 40, color: "#1677ff" }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col span={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>
                        Số lượng người dùng mới
                      </div>
                      <div className={styles.numberWrap}>{countUser}</div>
                      <div className={styles.dateUpdate}>Tháng này</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.iconWrap}>
                      <UserAddOutlined
                        style={{ fontSize: 40, color: "#52c41a" }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col span={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>
                        Số lượng bình luận mới
                      </div>
                      <div className={styles.numberWrap}>{countComment}</div>
                      <div className={styles.dateUpdate}>Tháng này</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.iconWrap}>
                      <CommentOutlined
                        style={{ fontSize: 40, color: "#fa8c16" }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col span={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>Số lượng tài liệu</div>
                      <div className={styles.numberWrap}>{countDocument}</div>
                      <div className={styles.dateUpdate}>Tháng này</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.iconWrap}>
                      <FileDoneOutlined
                        style={{ fontSize: 40, color: "#eb2f96" }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        {/* Revenue Chart Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Thống kê </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "500px",
              marginBottom: "20px",
            }}
          >
            <RangePicker
              picker="month"
              onChange={handleDateChange}
              style={{ marginRight: "10px", width: "200px" }} // Điều chỉnh chiều rộng RangePicker
            />
            <Button type="primary" onClick={loadRevenueData}>
              Lấy dữ liệu
            </Button>
          </div>
          {/* Render biểu đồ cột */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={processedRevenueData} // Sử dụng processed data ở đây
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total_posts"
                fill="#1677ff" // Màu của các cột
                label={{
                  position: "top",
                  fill: "#000",
                  fontSize: 14,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Best Seller Table Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Top 5 bài viết được yêu thích nhất tháng</h3>
          <Table
            columns={columns}
            dataSource={postsTopFive}
            rowKey={(record) => record.id}
            pagination={false}
            loading={isLoadingTableMostLiked}
            bordered
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
