import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import AuthLayout from '../../../../layouts/AuthLayout';
import InputRES from "../../../../components/UI/Input";
import _ from 'lodash';
import ButtonRES from "../../../../components/UI/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../../api/auth";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [dataUpdate, setDataUpdate] = useState({
    passwordNew: '',
    token: '',
    confirmNewPassword: '',
  });

  const [errorDataUpdate, setErrorDataUpdate] = useState({
    passwordNew: '',
    confirmNewPassword: '',
  });

  const isLoadingBtnUpdate = useSelector(state => state.auth.isLoadingBtnUpdate);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setDataUpdate(prev => ({ ...prev, token: tokenFromUrl }));
    }
  }, [searchParams]);

  useEffect(() => {
    handleResetError();
  }, [dataUpdate]);

  const handleResetError = () => {
    setErrorDataUpdate({ passwordNew: '' });
  };

  const handleChangeInput = (e, type) => {
    let value = e.target.value;
    let clone = _.cloneDeep(dataUpdate);
    clone[type] = value;
    setDataUpdate(clone);
  };

  const validateBlur = (type) => {
    let validate = isValidate(dataUpdate, type, errorDataUpdate);
    setErrorDataUpdate(validate.error);
    return validate.isError;
  };

  const handleConfirmUpdate = () => {
    let validate = handleCheckValidateConfirm(dataUpdate, errorDataUpdate);
    setErrorDataUpdate(validate.dataError);
    if (!validate.isError) {
      dispatch(updatePassword(dataUpdate));
      navigate('/login');
    }
  };

  return (
    <AuthLayout title={'Đặt lại mật khẩu'}>
      <div className={styles.loginWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Mật khẩu mới *</div>
          <InputRES
            type={"password"}
            placeholder={'******'}
            onChange={(e) => handleChangeInput(e, 'passwordNew')}
            onBlur={() => validateBlur('passwordNew')}
            value={dataUpdate.passwordNew}
            error={errorDataUpdate.passwordNew}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Xác nhận mật khẩu *</div>
          <InputRES
            type={"password"}
            placeholder={'******'}
            onChange={(e) => handleChangeInput(e, 'confirmNewPassword')}
            onBlur={() => validateBlur('confirmNewPassword')}
            value={dataUpdate.confirmNewPassword}
            error={errorDataUpdate.confirmNewPassword}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={'Cập nhật mật khẩu'}
            loading={isLoadingBtnUpdate}
            onClick={handleConfirmUpdate}
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

export default UpdatePassword;
