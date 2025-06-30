import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import AuthLayout from '../../../../layouts/AuthLayout';
import InputMASQ from "../../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {isValidate} from "../../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../../utils/helper";
import {useDispatch, useSelector} from "react-redux";
// import {Checkbox} from "antd";
// import Social from "./components/Social";
import {loginUser} from "../../../../api/auth";
import {setErrorLogin} from "../../../../states/modules/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    username : '',
    password: ''
  })
  // const [checkRemember, setCheckRemember] = useState(false);
  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);
  const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);
   const loginError = useSelector(state => state.auth.loginError);

useEffect(() => {
    dispatch(setErrorLogin({
      email: '',
      password: ''
    }));
  }, [dataLogin, dispatch])

  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/')
    }
  }, [isAuthSuccess, navigate])


  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataLogin);
    data[type] = value;
    setDataLogin(data);
  }

  
  const validateBlur = (type) => {
    let validate = isValidate(dataLogin, type, loginError);
    dispatch(setErrorLogin(validate.error));
    return validate.isError;
  }

  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(dataLogin, loginError);
    setErrorLogin(validate.dataError);
    if (!validate.isError) {
      dispatch(loginUser(dataLogin));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmLogin()
    }
  }

  // const handleClickCheckBox = (e) => {
  //   setCheckRemember(e.target.checked);
  // }

  return (
    <AuthLayout title={'Đăng nhập'}>
      <div className={styles.loginWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Tên đăng nhập *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập tên đăng nhập..."}
            onChange={(e) => handleChangeInput(e, 'username')}
            onBlur={() => validateBlur('username')}
            value={dataLogin.username}
            error={loginError.username}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Mật khẩu *</div>
          <InputMASQ
            type={'password'}
            placeholder={'******'}
            value={dataLogin.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            onBlur={() => validateBlur('password')}
            onKeyDown={(e) => handleKeyDown(e)}
            error={loginError.password}
          />
        </div>

        <div className={styles.btnUtilitiesWrap}>
          {/* <div className={`${styles.remember} input-checkbox-style`}>
            <Checkbox
              className={styles.checkBox}
              checked={checkRemember}
              onClick={(e) => handleClickCheckBox(e)}
            >
              <span>Nhớ mật khẩu </span>
            </Checkbox>
          </div> */}

          <div
            onClick={() => navigate('/forgot-password')}
            className={styles.btnForgetPassword}
          >
            Quên mật khẩu?
          </div>
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Đăng nhập'}
            loading={isLoadingBtnLogin}
            onClick={() => handleConfirmLogin()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          />
        </div>

        <div className={styles.btnSwitchWrap}>
          <div className={styles.btnRegister}>
            {"Bạn chưa có tài khoản"}? <span className={styles.textRegister} onClick={() => navigate('/register')}>Đăng kí ngay!</span>
          </div>
        </div>

        {/* <Social /> */}
      </div>
    </AuthLayout>
  );
}

export default Login;
