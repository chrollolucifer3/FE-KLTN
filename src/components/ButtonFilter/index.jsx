import React from 'react';
import {Button, Popover} from "antd";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

BtnFilter.prototype = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

BtnFilter.defaultProps = {
//
}

function BtnFilter (props) {
  let {content} = props

  return (
    <div className={styles.btnFilter}>
      <Popover
        placement="leftTop"
        content={content}
        trigger="click">
        <Button className={styles.btn}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path fill="currentColor" d="M0 2.303C0 1.583.583 1 1.303 1h13.394a1.303 1.303 0 0 1 1.009 2.125L10.5 9.516v4.475A1.01 1.01 0 0 1 9.491 15a.897.897 0 0 1-.628-.247l-2.891-2.266a1.253 1.253 0 0 1-.472-.978V9.515L.293 3.125A1.297 1.297 0 0 1 0 2.303zm1.718.197 5.113 6.275A.756.756 0 0 1 7 9.25v2.138l2 1.587V9.25a.75.75 0 0 1 .169-.475L14.281 2.5H1.718z"/>
          </svg>
          Filter
        </Button>
      </Popover>
    </div>
  );
}

export default BtnFilter
