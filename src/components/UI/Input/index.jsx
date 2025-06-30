import React, {useState} from 'react';
import {Input} from 'antd';
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import './styles.scss'
import show from "../../../assets/images/icon/show_password.svg";
import hide from "../../../assets/images/icon/hide_password.svg";

InputMASQ.prototype = {
  onChange: PropTypes.func.isRequired,
  keydown: PropTypes.func,
  type: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  iconPrefix: PropTypes.string,
  indexIconPrefix: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  isShowError: PropTypes.string,
}

InputMASQ.defaultProps = {
  type: 'text',
  value: '',
  error: '',
  disabled: false,
  isShowError: true,
  placeholder: 'Enter input',
  indexIconPrefix: 'left',
  maxLength: '',
  keydown: () => {
  },
  onKeyDown: () => {

  },
  onKeyPress: () => {

  },
  onPressEnter: () => {

  },
  onBlur: () => {

  },
  onFocus: () => {

  }
}

function InputMASQ(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }
  return (
    <div
      className={`
        ${styles.inputWrap} 
        ${props.iconPrefix && props.indexIconPrefix === 'left' ?
        styles.inputPreFixWrap : styles.inputPreFixRightWrap}
        ${props.type === 'password' ? styles.inputPassword : ''} 
      `}
    >
      <Input
        disabled={props.disabled}
        type={props.type === 'password' && !passwordVisible ? 'password' : 'text'}
        className={`input-custom ${props.error ? 'inputError' : ''}`}
        style={{fontFeatureSettings: 'normal', color: '#000000'}}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        onKeyDown={(e) => props.onKeyDown(e)}
        onKeyPress={(e) => props.onKeyPress(e)}
        onPressEnter={(e) => props.onPressEnter(e)}
        onBlur={(e) => props.onBlur(e)}
        onFocus={(e) => props.onFocus(e)}
        value={props.value}
        prefix={props.prefix}
        maxLength={props.maxLength}
      />
      {
        props.type === 'password' ?
          <div className={styles.visiblePassword}
               onClick={() => {
                 togglePassword()
               }}>
            <img src={passwordVisible ? show : hide} alt=""/>
          </div> : ''
      }
      {props.iconPrefix ? <span className={styles.iconPrefix}>{props.iconPrefix}</span> : ''}
      {(props.error && props.isShowError) ? <span className={styles.error}>{props.error}</span> : ''}
    </div>
  );
}

export default InputMASQ
