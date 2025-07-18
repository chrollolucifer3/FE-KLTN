import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import AuthLayout from '../../../../layouts/AuthLayout'
import InputMASQ from "../../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../../components/UI/Button";
import {isValidate} from "../../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../../utils/helper";
import { forgotPassword } from "../../../../api/auth";
import { useDispatch } from "react-redux";
import { setErrorDataForgotPassword } from "../../../../states/modules/auth";
import { useSelector } from "react-redux";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [dataForgotPassword, setDataForgotPassword] = useState({email : ''})
  const forgotPasswordError = useSelector(state => state.auth.forgotPasswordError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setErrorDataForgotPassword({
      email: ''
    }));
  }, [dataForgotPassword, dispatch]);

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataForgotPassword);
    data[type] = value;
    setDataForgotPassword(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataForgotPassword, type, forgotPasswordError);
    setErrorDataForgotPassword(validate.error);
    return validate.isError;
  }

  const handleConfirmLogin = async () => {
    let validate = handleCheckValidateConfirm(dataForgotPassword, forgotPasswordError);
    setErrorDataForgotPassword(validate.dataError);
    if (!validate.isError) {

     await dispatch(forgotPassword(dataForgotPassword))
     navigate('/login');
    }
  }

  return (
    <AuthLayout title={'Quên mật khẩu'} description={'Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.'}>
      <div className={styles.forgotPasswordWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Example@gmail.com"}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataForgotPassword.email}
            error={forgotPasswordError.email}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Gửi mail'}
            loading={false}
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
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
