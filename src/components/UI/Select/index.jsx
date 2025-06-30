import React from "react";
import "./styles.scss";
import { Select } from "antd";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

SelectCustom.prototype = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isShowError: PropTypes.string,
};

SelectCustom.defaultProps = {
  error: "",
  disabled: false,
  isShowError: true,
  options: [],
  value: "",
  onBlur: () => {},
  onFocus: () => {},
};

function SelectCustom(props) {
  let { onChange, value, options } = props;

  return (
    <div className={styles.selectWrap}>
      <Select
        className={`${props.error ? "input-select-error-custom" : ""}`}
        value={value}
        onChange={onChange}
        options={options}
        onBlur={(e) => props.onBlur(e)}
        onFocus={(e) => props.onFocus(e)}
      />

      {props.error && props.isShowError ? (
        <span className={styles.errors}>{props.error}</span>
      ) : (
        ""
      )}
    </div>
  );
}

export default SelectCustom;
