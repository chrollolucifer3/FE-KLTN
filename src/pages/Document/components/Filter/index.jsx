// src/pages/Post/components/Filter/index.jsx
import React from "react";
import styles from "./styles.module.scss";
import { Col, Row } from "antd";
import SelectCustom from "../../../../components/UI/Select";
import PropTypes from "prop-types";

Filter.propTypes = {
  onClose: PropTypes.func,
  onChangeStatus: PropTypes.func,
  statusPost: PropTypes.string, // ✅ đổi tên props
};

Filter.defaultProps = {
  onChangeStatus: () => {},
  onClose: () => {},
  statusPost: "", // ✅ đổi tên default prop
};

function Filter(props) {
  const { onChangeStatus, statusPost } = props;

  return (
    <div>
      <div className={styles.filterWrap}>
        <Row gutter={10}>
          <Col span={24}>
            <div className={styles.inputWrap}>
              <div className={styles.label}>Lọc theo trạng thái bài viết</div>
              <SelectCustom
                className={styles.selectWrap}
                value={statusPost}
                onChange={onChangeStatus}
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "PENDING", label: "Chờ duyệt" },
                  { value: "APPROVED", label: "Đã duyệt" },
                  { value: "REJECTED", label: "Từ chối" },
                  { value: "BLOCKED", label: "Bị chặn" },
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Filter;
