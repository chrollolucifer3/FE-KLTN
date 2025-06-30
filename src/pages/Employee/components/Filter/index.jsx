import React from "react";
import styles from "./styles.module.scss";
import { Col, Row } from "antd";
import SelectCustom from "../../../../components/UI/Select";
import PropTypes from "prop-types";

Filter.propTypes = {
  onClose: PropTypes.func,
  onChangeStatus: PropTypes.func,
  statusUser: PropTypes.string,
};

Filter.defaultProps = {
  onChangeStatus: () => {},
  onClose: () => {},
  statusUser: "",
};

function Filter(props) {
  const { onChangeStatus, statusUser } = props;
  return (
    <div>
      <div className={styles.filterWrap}>
        <Row gutter={10}>
          <Col span={24}>
            <div className={styles.inputWrap}>
              <div className={styles.label}>Lọc theo trạng thái</div>
              <SelectCustom
                className={styles.selectWrap}
                value={statusUser}
                onChange={onChangeStatus}
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "true", label: "Hoạt động" },
                  { value: "false", label: "Bị khóa" },
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
