import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import InputMASQ from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {isValidate} from "../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../utils/helper";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox} from "antd";
import Social from "./components/Social";
import {login} from "../../../api/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    username : '',
    password: ''
  })
  const [errorDataLogin, setErrorDataLogin] = useState({
    username : '',
    password: ''
  })
  const [checkRemember, setCheckRemember] = useState(false);
  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);
  const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);

  useEffect(() => {
    handleResetError();
  }, [dataLogin])

  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/admin')
    }
  }, [isAuthSuccess, navigate])

  const handleResetError = () => {
    setErrorDataLogin({
      username: '',
      password: ''
    });
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataLogin);
    data[type] = value;
    setDataLogin(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataLogin, type, errorDataLogin);
    setErrorDataLogin(validate.error);
    return validate.isError;
  }

  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(dataLogin, errorDataLogin);
    setErrorDataLogin(validate.dataError);
    if (!validate.isError) {
      dispatch(login(dataLogin));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmLogin()
    }
  }

  const handleClickCheckBox = (e) => {
    setCheckRemember(e.target.checked);
  }

  return (
    <AuthLayout title={'Welcome back'}>
      <div className={styles.loginWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>username *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter username..."}
            onChange={(e) => handleChangeInput(e, 'username')}
            onBlur={() => validateBlur('username')}
            value={dataLogin.username}
            error={errorDataLogin.username}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Password *</div>
          <InputMASQ
            type={'password'}
            placeholder={'******'}
            value={dataLogin.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            onBlur={() => validateBlur('password')}
            onKeyDown={(e) => handleKeyDown(e)}
            error={errorDataLogin.password}
          />
        </div>

        <div className={styles.btnUtilitiesWrap}>
          <div className={`${styles.remember} input-checkbox-style`}>
            <Checkbox
              className={styles.checkBox}
              checked={checkRemember}
              onClick={(e) => handleClickCheckBox(e)}
            >
              <span>Remember me</span>
            </Checkbox>
          </div>

          <div
            onClick={() => navigate('/forgot-password')}
            className={styles.btnForgetPassword}
          >
            Forgot password
          </div>
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Login'}
            loading={isLoadingBtnLogin}
            onClick={() => handleConfirmLogin()}
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
          <div className={styles.btnRegister}>
            {"Don't have an account"}? <span className={styles.textRegister} onClick={() => navigate('/register')}>Signup now</span>
          </div>
        </div>

        <Social />
      </div>
    </AuthLayout>
  );
}

export default Login;
