import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../../layouts/Client/MainLayout";
import styles from "./styles.module.scss";
import "./styles.scss";
import { Col, Row, Tabs, Upload, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import EditProfile from "./components/EditProfile";
import { uploadAvatar } from "../../../api/auth";

function UserProfile() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const [keyTable, setKeyTable] = useState("1");
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_URL;

  const onChange = (key) => setKeyTable(key);

  const handleUpload = async (options) => {
    const { file } = options;
    const formData = new FormData();
    formData.append("avatarUrl", file); 

    setLoading(true);
    dispatch(uploadAvatar(authUser.id, formData));
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className={styles.profileWrap}>
        <Row gutter={20}>
          <Col span={24}>
            <div className={styles.profileItem}>
              <div className={styles.informationWrap}>
                <div className={styles.avatarWrap}>
                  <Upload
                    customRequest={handleUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <div className={styles.btnChangeAvatar}>
                      <UploadOutlined />
                    </div>
                  </Upload>
                  {loading ? (
                    <Spin indicator={<LoadingOutlined />} />
                  ) : (
                    <img src={`${BASE_URL}${authUser.avatarUrl}`} alt="avatar" />
                  )}
                </div>

                <div className={styles.infoWrap}>
                  <div className={styles.name}>{authUser.fullName}</div>
                  <div className={styles.bod}>
                    Ngày gia nhập: {authUser.createdAt}
                  </div>
                </div>
              </div>

              <div className={`${styles.tabWrap} tab-custom`}>
                <Tabs
                  defaultActiveKey={keyTable}
                  items={[{ key: "1", label: "Sửa thông tin" }]}
                  onChange={onChange}
                />
              </div>
            </div>
          </Col>

          {keyTable === "1" && (
            <Col span={24}>
              <EditProfile />
            </Col>
          )}
        </Row>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
