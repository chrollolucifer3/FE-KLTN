import React from 'react';
import styles from './styles.module.scss'
import Logo from "../../../../../../assets/images/logo/logo_sidebar.png";

function ListOrder () {
  return (
    <div className={styles.listOrderWrap}>
      <div className={styles.orderItemWrap}>
        <div className={styles.headerOrderItemWrap}>
          <div className={styles.brandWrap}>
            <div className={`${styles.imgWrap}`}>
              <img src={Logo} alt=""/>
            </div>
          </div>
          <div className={`${styles.totalMoney}`}>
            <div>
              Total
            </div>
            <div>
              300$
            </div>
          </div>
        </div>
        <div className={styles.mainOrderItemWrap}>
          Main content
        </div>
        <div className={styles.footerOrderItemWrap}>
          sdssdsd
        </div>
      </div>

      <div className={styles.orderItemWrap}>
        <div className={styles.headerOrderItemWrap}>
          header
        </div>
        <div className={styles.mainOrderItemWrap}>
          Main content
        </div>
        <div className={styles.footerOrderItemWrap}>
          sdssdsd
        </div>
      </div>

      <div className={styles.orderItemWrap}>
        <div className={styles.headerOrderItemWrap}>
          header
        </div>
        <div className={styles.mainOrderItemWrap}>
          Main content
        </div>
        <div className={styles.footerOrderItemWrap}>
          sdssdsd
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
