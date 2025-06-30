import React from 'react';
import styles from './styles.module.scss';
import {Tabs} from "antd";
import ListOrder from "./components/ListOrder";

function Order () {
  const onChange = (key) => {
    console.log(key);
  }

  const items = [
    {
      key: '1',
      label: 'All',
      children: <ListOrder />,
    },
    {
      key: '2',
      label: 'In Processing',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Completed',
      children: 'Content of Tab Pane 4',
    },
  ];

  return (
    <div className={`${styles.orderWrap}`}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Order;
