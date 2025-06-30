import React from 'react';
import styles from "./styles.module.scss";
import './styles.scss';
import {Button, Select} from "antd";
import PropTypes from "prop-types";
import IconPrev from 'assets/images/icon/pagination/prev_24x24.svg';
import IconNext from 'assets/images/icon/pagination/next_24x24.svg';

PaginationMASQ.prototype = {
  handleNextPage: PropTypes.func.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleSelectPagination: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired

}

PaginationMASQ.defaultProps = {
  pagination: {
    currentPage: 1,
    perPage: 10,
    totalPage: 1,
    totalRecord: 0
  },
  options: [],
  handleNextPage: () => {
  }
}

function PaginationMASQ(props) {
  return (
    <div className={styles.paginationWrap}>
      <Button
        onClick={() => props.handleNextPage()}
        className={`${styles.btn} ${props.pagination.currentPage <= 1 ? styles.btnLast : ''}`}
      >
        <img src={IconPrev} alt=""/>
      </Button>
      <Button
        onClick={() => props.handlePrevPage()}
        className={`${styles.btn} ${props.pagination.currentPage >= props.pagination.totalPage ? styles.btnLast : ''}`}
      >
        <img src={IconNext} alt=""/>
      </Button>
      <span className={styles.text}>Page</span>
      <Select
        size={'large'}
        className={`input-select-pagination-custom`}
        placeholder="Select City"
        optionFilterProp="children"
        value={props.pagination.currentPage}
        onChange={(e) => props.handleSelectPagination(e)}
        filterOption={(input, option) => {
          return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
        }
        }
        options={props.options}
      />
      <span>of {props.pagination.totalPage}</span>
    </div>
  );
}

export default PaginationMASQ
