import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import InputMASQ from "../../../../../components/UI/Input";
import ButtonMASQ from "../../../../../components/UI/Button";
import {Col, Row} from "antd";
import _ from "lodash";
import {isValidate} from "../../../../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {setErrorChangePassword, setErrorInfoUser} from "../../../../../states/modules/profile";
import {handleCheckValidateConfirm} from "../../../../../utils/helper";
import {handleChangePassword, handleUpdateInfoUser} from "../../../../../api/profile";
import { getMeUser } from 'api/auth';

function EditProfile () {
  const [dataInfoUser, setDataInfoUser] = useState({
    fullName: '',
    email: '',
    phone: ''
  })
  const errorInfoUser = useSelector(state => state.profile.errorInfoUser);
  const loadingBtnUpdateInfoUser = useSelector(state => state.profile.loadingBtnUpdateInfoUser);
  const authUser = useSelector(state => state.auth.authUser);
  const [dataChangePassword, setDataChangePassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  const loadingBtnChangePassword = useSelector(state => state.profile.loadingBtnChangePassword);
  const dispatch = useDispatch();

  useEffect(() => {
    setDataInfoUser({
      fullName: authUser.fullName,
      email: authUser.email,
      phone: authUser.phone
    })
    setDataChangePassword({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }, [authUser]);

  const handleChangeInput = (valueInput, type, typeForm) => {
    let value = valueInput.target.value;
    let dataCloneDeep = typeForm === 'FORM_CHANGE_PASSWORD' ? dataChangePassword : dataInfoUser;
    let data = _.cloneDeep(dataCloneDeep);
    data[type] = value;
    switch (typeForm) {
      case 'FORM_CHANGE_PASSWORD':
        setDataChangePassword(data)
        break;
      default:
        setDataInfoUser(data);
        break;
    }
  }

  const validateBlur = (type, typeForm) => {
    let data = typeForm === 'FORM_CHANGE_PASSWORD' ? dataChangePassword : dataInfoUser;
    let error = typeForm === 'FORM_CHANGE_PASSWORD' ? errorChangePassword : errorInfoUser;
    let validate = isValidate(data, type, error);
    switch (typeForm) {
      case 'FORM_CHANGE_PASSWORD':
        dispatch(setErrorChangePassword(validate.error));
        break;
      default:
        dispatch(setErrorInfoUser(validate.error));
        break;
    }
    return validate.isError;
  }

const handleConfirmSaveInfoUser = async () => {
  const dataValidate = dataInfoUser;

  const validate = handleCheckValidateConfirm(dataValidate, errorInfoUser);
  dispatch(setErrorInfoUser(validate.dataError));

  if (!validate.isError) {
    const data = {
      fullName: dataInfoUser.fullName,
      email: dataInfoUser.email,
      phone: dataInfoUser.phone
    };

    await dispatch(handleUpdateInfoUser(data));
    dispatch(getMeUser());
  }
};


const handleConfirmChangePassword = () => {
  const dataValidate = dataChangePassword;

  const validate = handleCheckValidateConfirm(dataValidate, errorChangePassword);
  dispatch(setErrorChangePassword(validate.dataError));

  if (!validate.isError) {
    const data = {
      oldPassword: dataChangePassword.oldPassword,
      newPassword: dataChangePassword.newPassword,
      confirmPassword: dataChangePassword.confirmPassword
    };

    dispatch(handleChangePassword(data));
  }
};


  return (
    <div className={styles.editProfile}>
      <Row gutter={20}>
        <Col span={12}>
          <div className={`${styles.personalInformation}`}>
            <div className={styles.headerWrap}>
              <div className={styles.label}>Thông tin: </div>
            </div>
            <div className={styles.mainWrap}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Họ và tên *</div>
                <InputMASQ
                  type={"text"}
                  placeholder={"Nhập họ và tên..."}
                  onChange={(e) => handleChangeInput(e, 'fullName')}
                  onBlur={() => validateBlur('fullName')}
                  value={dataInfoUser.fullName}
                  error={errorInfoUser.fullName}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Email *</div>
                <InputMASQ
                  type={"text"}
                  placeholder={"Nhập email..."}
                  onChange={(e) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataInfoUser.email}
                  error={errorInfoUser.email}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Số điện thoại *</div>
                <InputMASQ
                  type={"text"}
                  placeholder={"Nhập số điện thoại..."}
                  onChange={(e) => handleChangeInput(e, 'phone')}
                  onBlur={() => validateBlur('phone')}
                  value={dataInfoUser.phone}
                  error={errorInfoUser.phone}
                />
              </div>
            </div>
            <div className={styles.btnWrap}>
              <ButtonMASQ
                onClick={() => handleConfirmSaveInfoUser()}
                loading={loadingBtnUpdateInfoUser}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={'Lưu'}>
              </ButtonMASQ>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div className={`${styles.personalInformation}`}>
            <div className={styles.headerWrap}>
              <div className={styles.label}>Đổi mật khẩu</div>
            </div>
            <div className={styles.mainWrap}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Mật khẩu hiện tại *</div>
                <InputMASQ
                  type={"password"}
                  placeholder={"Nhập mật khẩu hiện tại..."}
                  onChange={(e) => handleChangeInput(e, 'oldPassword', 'FORM_CHANGE_PASSWORD')}
                  onBlur={() => validateBlur('oldPassword', 'FORM_CHANGE_PASSWORD')}
                  value={dataChangePassword.oldPassword}
                  error={errorChangePassword.oldPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Mật khẩu mới *</div>
                <InputMASQ
                  type={"password"}
                  placeholder={"Nhập mật khẩu mới..."}
                  onChange={(e) => handleChangeInput(e, 'newPassword', 'FORM_CHANGE_PASSWORD')}
                  onBlur={() => validateBlur('newPassword', 'FORM_CHANGE_PASSWORD')}
                  value={dataChangePassword.newPassword}
                  error={errorChangePassword.newPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Xác nhận mật khẩu *</div>
                <InputMASQ
                  type={"password"}
                  placeholder={"Nhập xác nhận mật khẩu mới..."}
                  onChange={(e) => handleChangeInput(e, 'confirmPassword', 'FORM_CHANGE_PASSWORD')}
                  onBlur={() => validateBlur('confirmPassword', 'FORM_CHANGE_PASSWORD')}
                  value={dataChangePassword.confirmPassword}
                  error={errorChangePassword.confirmPassword}
                />
              </div>
            </div>

            <div className={styles.btnWrap}>
              <ButtonMASQ
                onClick={() => handleConfirmChangePassword()}
                loading={loadingBtnChangePassword}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={'Lưu'}>
              </ButtonMASQ>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfile;
