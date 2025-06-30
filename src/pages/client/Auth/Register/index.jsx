import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import AuthLayout from '../../../../layouts/AuthLayout';
import InputMASQ from "../../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import { register } from "../../../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { setErrorRegister } from "../../../../states/modules/auth";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorDataRegister = useSelector(state => state.auth.errorRegister);

  const [dataRegister, setDataRegister] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
  });

  // const [errorDataRegister, setErrorDataRegister] = useState({
  //   username: '',
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   dob: '',
  // });

  const isLoadingBtnRegister = useSelector(state => state.auth.isLoadingBtnRegister);

  // useEffect(() => {
  //   handleResetError();
  // }, [dataRegister]);

  const handleChangeInput = (value, type) => {
    const data = _.cloneDeep(dataRegister);
    data[type] = value;
    setDataRegister(data);
  };

  // const handleResetError = () => {
  //   setErrorDataRegister({
  //     username: '',
  //     fullName: '',
  //     email: '',
  //     phone: '',
  //     password: '',
  //     dob: '',
  //   });
  // };

    useEffect(() => {
    dispatch(setErrorRegister({
      username: '',
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }));
  }, [dataRegister, dispatch])

  const validateBlur = (type) => {
    const validate = isValidate(dataRegister, type, errorDataRegister);
    setErrorRegister(validate.error);
    return validate.isError;
  };

  const handleConfirmRegister = () => {
    const validate = handleCheckValidateConfirm(dataRegister, errorDataRegister);
    setErrorRegister(validate.dataError);
    if (!validate.isError) {
      dispatch(register(dataRegister));
    }
  };

  return (
    <AuthLayout title={'Đăng ký'}>
      <div className={styles.registerWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tên đăng nhập *</div>
          <InputMASQ
            type="text"
            placeholder="Nhập tên đăng nhập..."
            onChange={(e) => handleChangeInput(e.target.value, 'username')}
            onBlur={() => validateBlur('username')}
            value={dataRegister.username}
            error={errorDataRegister.username}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tên *</div>
          <InputMASQ
            type="text"
            placeholder="Nhập tên..."
            onChange={(e) => handleChangeInput(e.target.value, 'fullName')}
            onBlur={() => validateBlur('fullName')}
            value={dataRegister.fullName}
            error={errorDataRegister.fullName}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type="text"
            placeholder="Example@gmail.com"
            onChange={(e) => handleChangeInput(e.target.value, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataRegister.email}
            error={errorDataRegister.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Số điện thoại *</div>
          <InputMASQ
            type="text"
            placeholder="Nhập số điện thoại..."
            onChange={(e) => handleChangeInput(e.target.value, 'phone')}
            onBlur={() => validateBlur('phone')}
            value={dataRegister.phone}
            error={errorDataRegister.phone}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Mật khẩu *</div>
          <InputMASQ
            type="password"
            placeholder="******"
            value={dataRegister.password}
            onChange={(e) => handleChangeInput(e.target.value, 'password')}
            onBlur={() => validateBlur('password')}
            error={errorDataRegister.password}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Ngày sinh *</div>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh..."
            onChange={(date) => {
              const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
              handleChangeInput(formattedDate, "dob");
            }}
            value={dataRegister.dob ? dayjs(dataRegister.dob) : null}
            onBlur={() => validateBlur("dob")}
          />
          {errorDataRegister.dob && <div className={styles.error}>{errorDataRegister.dob}</div>}
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn="Đăng ký"
            loading={isLoadingBtnRegister}
            onClick={handleConfirmRegister}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: '100%',
            }}
          />
        </div>

        <div className={styles.btnSwitchWrap}>
          <div
            onClick={() => navigate('/login')}
            className={styles.btnRegister}
          >
            Nếu bạn có tài khoản, <span className={styles.text}>Đăng nhập</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
