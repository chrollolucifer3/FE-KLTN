import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import {Col, Row} from "antd";
import _ from "lodash";
import {isValidate} from "../../../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {setErrorChangePassword, setErrorInfoUser} from "../../../../states/modules/profile";
import {handleCheckValidateConfirm} from "../../../../utils/helper";
import {handleChangePassword, handleUpdateInfoUser} from "../../../../api/profile";

function EditProfile () {
  const [dataInfoUser, setDataInfoUser] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const errorInfoUser = useSelector(state => state.profile.errorInfoUser);
  const loadingBtnUpdateInfoUser = useSelector(state => state.profile.loadingBtnUpdateInfoUser);
  const authUser = useSelector(state => state.auth.authUser);
  const [dataChangePassword, setDataChangePassword] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })
  const errorChangePassword = useSelector(state => state.profile.errorChangePassword);
  const loadingBtnChangePassword = useSelector(state => state.profile.loadingBtnChangePassword);
  const dispatch = useDispatch();

  useEffect(() => {
    setDataInfoUser({
      name: authUser.name,
      email: authUser.email,
      phone: authUser.phone
    })
    setDataChangePassword({
      currentPassword: '',
      password: '',
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

  const handleConfirmSaveInfoUser = () => {
    let dataValidate = dataInfoUser;
    let data = new FormData();
    data.append(`name`, dataInfoUser.name);
    data.append(`email`, dataInfoUser.email);
    data.append(`phone`, dataInfoUser.phone);

    let validate = handleCheckValidateConfirm(dataValidate, errorInfoUser);
    dispatch(setErrorInfoUser(validate.dataError));
    if (!validate.isError) {
      dispatch(handleUpdateInfoUser(data))
    }
  }


  const handleConfirmChangePassword = () => {
    let dataValidate = dataChangePassword;
    let data = new FormData();
    data.append(`current_password`, dataChangePassword.currentPassword);
    data.append(`password`, dataChangePassword.password);
    data.append(`password_confirmation`, dataChangePassword.confirmPassword);

    let validate = handleCheckValidateConfirm(dataValidate, errorChangePassword);
    dispatch(setErrorChangePassword(validate.dataError));
    if (!validate.isError) {
      dispatch(handleChangePassword(data))
    }
  }


  return (
    <div className={styles.editProfile}>
      <Row gutter={20}>
        <Col span={12}>
          <div className={`${styles.personalInformation}`}>
            <div className={styles.headerWrap}>
              <div className={styles.label}>Thông tin cá nhân</div>
            </div>
            <div className={styles.mainWrap}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Tên *</div>
                <InputMASQ
                  type={"text"}
                  placeholder={"Nhập tên..."}
                  onChange={(e) => handleChangeInput(e, 'name')}
                  onBlur={() => validateBlur('name')}
                  value={dataInfoUser.name}
                  error={errorInfoUser.name}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Email *</div>
                <InputMASQ
                  type={"text"}
                  placeholder={"Example@gmail.com"}
                  onChange={(e) => handleChangeInput(e, 'email')}
                  onBlur={() => validateBlur('email')}
                  value={dataInfoUser.email}
                  error={errorInfoUser.email}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Điện thoại *</div>
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
                  placeholder={"Nhập mật khẩu..."}
                  onChange={(e) => handleChangeInput(e, 'currentPassword', 'FORM_CHANGE_PASSWORD')}
                  onBlur={() => validateBlur('currentPassword', 'FORM_CHANGE_PASSWORD')}
                  value={dataChangePassword.currentPassword}
                  error={errorChangePassword.currentPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Mật khẩu mới *</div>
                <InputMASQ
                  type={"password"}
                  placeholder={"Nhập mật khẩu mới..."}
                  onChange={(e) => handleChangeInput(e, 'password', 'FORM_CHANGE_PASSWORD')}
                  onBlur={() => validateBlur('password', 'FORM_CHANGE_PASSWORD')}
                  value={dataChangePassword.password}
                  error={errorChangePassword.password}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Xác nhận mật khẩu *</div>
                <InputMASQ
                  type={"password"}
                  placeholder={"Xác nhận mật khẩu..."}
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
