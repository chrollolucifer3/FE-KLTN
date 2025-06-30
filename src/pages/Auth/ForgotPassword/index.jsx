import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import AuthLayout from '../../../layouts/AuthLayout'
import InputMASQ from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonMASQ from "../../../components/UI/Button";
import {isValidate} from "../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../utils/helper";

function ForgotPassword() {
  const [dataForgotPassword, setDataForgotPassword] = useState({email : ''})
  const [errorDataForgotPassword, setErrorDataForgotPassword] = useState({email : ''})

  useEffect(() => {
    handleResetError();
  }, [dataForgotPassword])

  const handleResetError = () => {
    setErrorDataForgotPassword({email: ''});
  }

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataForgotPassword);
    data[type] = value;
    setDataForgotPassword(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataForgotPassword, type, errorDataForgotPassword);
    setErrorDataForgotPassword(validate.error);
    return validate.isError;
  }

  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(dataForgotPassword, errorDataForgotPassword);
    setErrorDataForgotPassword(validate.dataError);
    if (!validate.isError) {
      alert('Login')
    }
  }

  return (
    <AuthLayout title={'Forgot password'}>
      <div className={styles.forgotPasswordWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataForgotPassword.email}
            error={errorDataForgotPassword.email}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={'Send email'}
            loading={false}
            onClick={() => handleConfirmLogin()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
