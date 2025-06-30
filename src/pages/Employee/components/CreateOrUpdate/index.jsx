import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import ButtonMASQ from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import SelectCustom from "../../../../components/UI/Select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee,
} from "../../../../states/modules/employee";
import {
  handleCreateEmployee,
  handleUpdateEmployee,
} from "../../../../api/employee";

CreateOrUpdate.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  textBtnConfirm: "OK",
  configModal: {
    title: "Title",
    type: "CREATE",
  },
};

function CreateOrUpdate(props) {
  let { employee, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    role: "",
    confirmPassword: "",
  });
  const visibleModalCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.visibleModalCreateOrUpdateEmployee
  );
  const isLoadingBtnCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.isLoadingBtnCreateOrUpdateEmployee
  );
  const errorCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.errorCreateOrUpdateEmployee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateEmployee]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateEmployee({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        role: "",
        confirmPassword: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      dob: employee.dob,
      role: employee.role,
      fullName: employee.fullName,
    });
  }, [employee]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      username: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      dob: "",
      role: "",
      confirmPassword: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let value;

    // Nếu type là "roleName", lấy giá trị của roleName, nếu không lấy giá trị từ input
    if (type === "role") {
      value = valueInput ? valueInput : dataCreateOrUpdate.role;
    } else {
      value = valueInput.target.value;
    }

    let data = _.cloneDeep(dataCreateOrUpdate); // Clone để không thay đổi trực tiếp dữ liệu cũ
    data[type] = value; // Cập nhật giá trị

    setDataCreateOrUpdate(data); // Cập nhật state mới
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateEmployee
    );
    dispatch(setErrorCreateOrUpdateEmployee(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateUser = () => {
    let dataValidate = dataCreateOrUpdate;
    // let data = new FormData();
    // data.append(`fullName`, dataCreateOrUpdate.fullName);
    // data.append(`email`, dataCreateOrUpdate.email);
    // data.append(`phone`, dataCreateOrUpdate.phone);
    // data.append(`dob`, dataCreateOrUpdate.dob);
    // data.append(`role`, dataCreateOrUpdate.role);
    // if (configModal.type !== "CREATE") {
    //   dataValidate = {
    //     username: dataCreateOrUpdate.username,
    //     fullName: dataCreateOrUpdate.fullName,
    //     email: dataCreateOrUpdate.email,
    //     phone: dataCreateOrUpdate.phone,
    //     role: dataCreateOrUpdate.role,
    //     dob: dataCreateOrUpdate.dob,
    //     password: dataCreateOrUpdate.password,
    //     confirmPassword: dataCreateOrUpdate.confirmPassword
    //   }
    // } else {
    //   data.append(`password`, dataCreateOrUpdate.password);
    // }
    let dataToSend = {
      fullName: dataCreateOrUpdate.fullName,
      phone: dataCreateOrUpdate.phone,
      dob: dataCreateOrUpdate.dob,
      role: dataCreateOrUpdate.role,
    };
    if (configModal.type === "CREATE") {
      dataToSend.password = dataCreateOrUpdate.password;
      dataToSend.confirmPassword = dataCreateOrUpdate.confirmPassword;
      (dataToSend.username = dataCreateOrUpdate.username),
        (dataToSend.email = dataCreateOrUpdate.email);
    }
    if (configModal.type == "UPDATE") {
      delete dataToSend.email;
      delete dataToSend.username;
    }

    let validate = handleCheckValidateConfirm(
      dataValidate,
      errorCreateOrUpdateEmployee
    );
    dispatch(setErrorCreateOrUpdateEmployee(validate.dataError));
    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateEmployee(dataToSend));
      } else {
        dispatch(handleUpdateEmployee(dataToSend, employee.id));
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateEmployee}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateEmployee(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        {configModal.type === "CREATE" ? (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Tên đăng nhập *</div>
            <InputMASQ
              type={"text"}
              placeholder={"Nhập tên tài khoản..."}
              onChange={(e) => handleChangeInput(e, "username")}
              onBlur={() => validateBlur("username")}
              value={dataCreateOrUpdate.username}
              error={errorCreateOrUpdateEmployee.username}
            />
          </div>
        ) : (
          ""
        )}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Họ và tên *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập họ và tên..."}
            onChange={(e) => handleChangeInput(e, "fullName")}
            onBlur={() => validateBlur("fullName")}
            value={dataCreateOrUpdate.fullName}
            error={errorCreateOrUpdateEmployee.fullName}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Example@gmail.com"}
            onChange={(e) => handleChangeInput(e, "email")}
            onBlur={() => validateBlur("email")}
            value={dataCreateOrUpdate.email}
            error={errorCreateOrUpdateEmployee.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Số điện thoại *</div>
          <InputMASQ
            type={"text"}
            placeholder={"Nhập số điện thoại..."}
            onChange={(e) => handleChangeInput(e, "phone")}
            onBlur={() => validateBlur("phone")}
            value={dataCreateOrUpdate.phone}
            error={errorCreateOrUpdateEmployee.phone}
          />
        </div>
        {configModal.type === "CREATE" ? (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Role *</div>
            <SelectCustom
              onChange={(e) => handleChangeInput(e, "role")}
              value={dataCreateOrUpdate.role}
              options={[
                // Tạo mảng options
                { value: "USER", label: "USER" },
                { value: "ADMIN", label: "ADMIN" },
              ]}
              onBlur={() => validateBlur("role")}
              error={errorCreateOrUpdateEmployee.role}
            />
          </div>
        ) : (
          ""
        )}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Ngày sinh *</div>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Chọn ngày sinh..."
            onChange={(date) => {
              const formattedDate = date
                ? dayjs(date).format("YYYY-MM-DD")
                : "";
              handleChangeInput({ target: { value: formattedDate } }, "dob");
            }}
            value={
              dataCreateOrUpdate.dob ? dayjs(dataCreateOrUpdate.dob) : null
            }
            onBlur={() => validateBlur("dob")}
            error={errorCreateOrUpdateEmployee.dob}
          />
        </div>

        {configModal.type === "CREATE" ? (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Mật khẩu *</div>
            <InputMASQ
              type={"password"}
              placeholder={"Nhập mật khẩu..."}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={() => validateBlur("password")}
              value={dataCreateOrUpdate.password}
              error={errorCreateOrUpdateEmployee.password}
            />
          </div>
        ) : (
          ""
        )}

        {configModal.type === "CREATE" ? (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Xác nhận mật khẩu *</div>
            <InputMASQ
              type={"password"}
              placeholder={"Nhập mật khẩu..."}
              onChange={(e) => handleChangeInput(e, "confirmPassword")}
              onBlur={() => validateBlur("confirmPassword")}
              value={dataCreateOrUpdate.confirmPassword}
              error={errorCreateOrUpdateEmployee.confirmPassword}
            />
          </div>
        ) : (
          ""
        )}

        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateEmployee}
            onClick={() => handleConfirmCreateOrUpdateUser()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default CreateOrUpdate;
