import React from 'react';
import styles from "./styles.module.scss";

function PopoverMessage() {

  return (
    <div className={styles.modalMessageWrap}>
      <div className={styles.headerWrap}>
        You have 2 messages
      </div>
      <div className={styles.mainModalInfoWrap}>
        <ul className={styles.menuInfoWrap}>
          <li className={`${styles.itemInfoWrap}`}>
            <div className={styles.iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" width="12" height="12">
                <path fill="currentColor" d="M1.5 2.625A.376.376 0 0 0 1.125 3v.518l4.043 3.319a1.312 1.312 0 0 0 1.666 0l4.041-3.319V3a.376.376 0 0 0-.375-.375h-9zm-.375 2.348V9c0 .206.169.375.375.375h9A.376.376 0 0 0 10.875 9V4.973L7.547 7.706c-.9.738-2.196.738-3.094 0L1.125 4.973zM0 3c0-.827.673-1.5 1.5-1.5h9c.827 0 1.5.673 1.5 1.5v6c0 .827-.673 1.5-1.5 1.5h-9C.673 10.5 0 9.827 0 9V3z"/>
              </svg>
            </div>
            <div className={styles.contentWrap}>
              <div>New Application received</div>
              <div className={styles.date}>3 days ago</div>
            </div>
          </li>
          <li className={`${styles.itemInfoWrap}`}>
            <div className={styles.iconWrap}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" width="12" height="12">
                <path fill="currentColor" d="M1.5 2.625A.376.376 0 0 0 1.125 3v.518l4.043 3.319a1.312 1.312 0 0 0 1.666 0l4.041-3.319V3a.376.376 0 0 0-.375-.375h-9zm-.375 2.348V9c0 .206.169.375.375.375h9A.376.376 0 0 0 10.875 9V4.973L7.547 7.706c-.9.738-2.196.738-3.094 0L1.125 4.973zM0 3c0-.827.673-1.5 1.5-1.5h9c.827 0 1.5.673 1.5 1.5v6c0 .827-.673 1.5-1.5 1.5h-9C.673 10.5 0 9.827 0 9V3z"/>
              </svg>
            </div>
            <div className={styles.contentWrap}>
              <div>New Application received</div>
              <div className={styles.date}>3 days ago</div>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.footerWrap}>
        View all notification
      </div>
    </div>
  );
}

export default PopoverMessage
