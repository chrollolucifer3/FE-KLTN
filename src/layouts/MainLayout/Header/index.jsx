import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import contentNotification from './components/PopoverNotification';
import contentMessage from './components/PopoverMessage';
import ImageUser from '../../../../src/assets/images/user/6.jpg'

const Header = () => {
  // const [isShowThemeLight, setIsShowThemeLight] = useState(true);

  const openFullScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerLeftWrap}>

      </div>
      <div className={`${styles.headerRightWrap}`}>
        {/*<div className={`${styles.itemHeaderRight}`}>*/}
        {/*  <div onClick={() => openFullScreen()} className={`${styles.iconWrap}`}>*/}
        {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" width="18" height="18">*/}
        {/*      <path fill="currentColor" d="M9 0c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9zm0 16.313c.26 0 .918-.253 1.673-1.702.309-.622.545-1.378.773-2.236H6.553c.197.858.464 1.614.773 2.236.725 1.448 1.414 1.702 1.674 1.702zm-2.725-5.625h5.449a16.335 16.335 0 0 0 0-3.376H6.275a16.335 16.335 0 0 0 0 3.376zm5.171-5.063c-.229-.858-.464-1.614-.773-2.234C9.918 1.941 9.26 1.688 9 1.688s-.949.254-1.673 1.703a10.107 10.107 0 0 0-.773 2.234h4.894zm1.976 1.688c.049.545.077 1.111.077 1.688s-.028 1.143-.077 1.688h2.693c.13-.541.197-1.107.197-1.688s-.067-1.146-.197-1.688h-2.693zm-1.395-4.971c.496.902.889 2.021 1.146 3.283h2.317a7.34 7.34 0 0 0-3.463-3.283zm-6.054 0a7.342 7.342 0 0 0-3.462 3.283h2.316c.257-1.262.65-2.381 1.146-3.283zM1.688 9c0 .58.068 1.146.196 1.688h2.694c-.049-.545-.077-1.111-.077-1.688s.028-1.143.077-1.688H1.883A7.342 7.342 0 0 0 1.688 9zm13.802 3.375h-2.317c-.257 1.262-.65 2.38-1.146 3.284a7.351 7.351 0 0 0 3.463-3.284zm-10.663 0H2.511a7.353 7.353 0 0 0 3.462 3.284c-.496-.904-.889-2.021-1.146-3.284z"/>*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div*/}
        {/*  onClick={() => setIsShowThemeLight(!isShowThemeLight)}*/}
        {/*  className={`${styles.itemHeaderRight} ${styles.itemChangeTheme}`}*/}
        {/*>*/}
        {/*  {*/}
        {/*    isShowThemeLight ?*/}
        {/*      <div className={`${styles.iconWrap}`}>*/}
        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 17.6" width="22" height="17.6">*/}
        {/*          <path fill="currentColor" d="M21.66 8.549c-2.702.508-5.183-1.54-5.183-4.235 0-1.552.84-2.979 2.208-3.748a.256.256 0 0 0-.081-.477A6.746 6.746 0 0 0 17.61 0c-2.385 0-4.369 1.488-5.194 3.572a4.657 4.657 0 0 1 1.62 4.929 5.17 5.17 0 0 1 2.934 2.433c.187.029.425.066.648.066a5.585 5.585 0 0 0 4.324-2.036c.152-.187-.013-.459-.283-.415zm-8.501.867c-.129-.198-.293-.365-.451-.537a3.458 3.458 0 0 0 .408-1.616c0-1.925-1.526-3.507-3.429-3.572a4.377 4.377 0 0 0-3.402-1.654 4.354 4.354 0 0 0-3.468 1.731A3.568 3.568 0 0 0 0 7.263c0 1.273.67 2.376 1.672 3.007a4.099 4.099 0 0 0-1.526 3.207c0 2.277 1.839 4.125 4.094 4.125h8.195c2.259 0 4.101-1.848 4.101-4.125a4.123 4.123 0 0 0-3.378-4.062zM1.641 7.263a1.92 1.92 0 0 1 1.907-1.925h.232a2.738 2.738 0 0 1 2.5-1.65c1.177 0 2.166.751 2.556 1.796a1.85 1.85 0 0 1 .726-.146 1.918 1.918 0 0 1 1.907 1.925c0 .257-.059.491-.151.714A3.674 3.674 0 0 0 9.984 7.7a3.814 3.814 0 0 0-.967.124 4.303 4.303 0 0 0-2.31-.674 4.367 4.367 0 0 0-3.64 1.968 1.913 1.913 0 0 1-1.426-1.855zm10.795 8.687H4.243a2.466 2.466 0 0 1-2.457-2.475 2.456 2.456 0 0 1 2.24-2.45A2.736 2.736 0 0 1 6.7 8.8c.816 0 1.542.37 2.042.936a2.177 2.177 0 0 1 3.356 1.298c.117-.018.222-.034.34-.034a2.466 2.466 0 0 1 2.457 2.475 2.463 2.463 0 0 1-2.457 2.475z"/>*/}
        {/*        </svg>*/}
        {/*      </div> :*/}
        {/*      <div className={`${styles.iconWrap}`}>*/}
        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 17.6" width="22" height="17.6">*/}
        {/*          <path fill="currentColor" d="m12.145 13.011-.485 2.692-2.86-1.984-2.86 1.983-.619-3.424-3.424-.619 1.983-2.89L1.898 5.94l3.424-.619.619-3.424L8.8 3.881l2.858-1.986.619 3.425.991.179c.574-.557 1.317-.98 2.132-1.1l-1.703-.498-.512-2.833a1.291 1.291 0 0 0-.78-.97 1.307 1.307 0 0 0-1.242.132L8.8 1.873 6.435.231A1.307 1.307 0 0 0 5.194.1a1.296 1.296 0 0 0-.78.969l-.512 2.834-2.833.512a1.296 1.296 0 0 0-.971.784c-.171.41-.12.875.133 1.24l1.641 2.364-1.641 2.365a1.295 1.295 0 0 0-.132 1.24c.171.41.533.703.97.781l2.833.512.512 2.833c.079.438.371.8.78.97.41.168.875.121 1.241-.132L8.8 15.727l2.366 1.642c.222.152.481.231.738.231a1.296 1.296 0 0 0 1.28-1.069l.611-3.332-.595-.03c-.372 0-.722-.045-1.055-.158zM8.8 6.6a2.19 2.19 0 0 1 1.916 1.142 3.295 3.295 0 0 1 1.362-.935A3.83 3.83 0 0 0 8.8 4.95a3.817 3.817 0 0 0-3.819 3.819A3.817 3.817 0 0 0 8.8 12.588a3.806 3.806 0 0 0 1.958-.552 3.287 3.287 0 0 1-.766-1.454c-.343.284-.752.387-1.192.387-1.213 0-2.2-.987-2.2-2.2S7.587 6.6 8.8 6.6zm11 1.069c-.413 0-.795.12-1.125.318-.119-1.381-1.285-2.518-2.725-2.518a2.747 2.747 0 0 0-2.694 2.209c-.018 0-.034-.009-.056-.009-1.212 0-2.2.988-2.2 2.2s.988 2.2 2.2 2.2h6.6c1.212 0 2.2-.988 2.2-2.2s-.987-2.2-2.2-2.2z"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*  }*/}
        {/*</div>*/}

        <div className={`${styles.itemHeaderRight}`}>
          <div onClick={() => openFullScreen()} className={`${styles.iconWrap}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20.571" width="18" height="20.571">
              <path fill="currentColor" d="M5.464 12.857h-4.5a.963.963 0 1 0 0 1.928H4.5v3.536c0 .534.43.964.964.964s.964-.43.964-.964v-4.5a.962.962 0 0 0-.964-.964zm7.071-5.143h4.5a.964.964 0 1 0 0-1.928h-3.536V2.25a.963.963 0 1 0-1.928 0v4.5c0 .534.43.964.964.964zM5.464 1.286a.963.963 0 0 0-.964.964v3.536H.964a.963.963 0 1 0 0 1.928h4.5c.534 0 .964-.43.964-.964v-4.5a.963.963 0 0 0-.964-.964zm11.571 11.571h-4.499a.962.962 0 0 0-.964.964v4.5a.965.965 0 0 0 1.928 0v-3.536h3.536a.965.965 0 0 0 0-1.928z"/>
            </svg>
          </div>
        </div>

        <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentNotification} trigger="click">
          <div className={`${styles.itemHeaderRight} ${styles.notificationAnimationWrap}`}>
            <div className={`${styles.iconWrap}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20.571" width="18" height="20.571">
                <path fill="currentColor" d="M10.286 1.286v.718a6.11 6.11 0 0 1 5.143 6.032v1.342c0 1.824.623 3.596 1.76 5.022l.599.747a.964.964 0 0 1-.751 1.567H.964a.965.965 0 0 1-.869-.546.965.965 0 0 1 .116-1.021L.81 14.4a8.045 8.045 0 0 0 1.761-5.022V8.036a6.11 6.11 0 0 1 5.143-6.032v-.718a1.286 1.286 0 1 1 2.572 0zM8.679 3.857A4.18 4.18 0 0 0 4.5 8.036v1.342a9.974 9.974 0 0 1-1.595 5.408h12.19A9.974 9.974 0 0 1 13.5 9.378V8.036a4.18 4.18 0 0 0-4.179-4.179h-.643zM11.572 18c0 .647-.269 1.338-.751 1.82s-1.174.751-1.821.751c-.683 0-1.338-.269-1.82-.751s-.751-1.173-.751-1.82h5.143z"/>
              </svg>
            </div>
          </div>
        </Popover>

        <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentMessage} trigger="click">
          <div className={`${styles.itemHeaderRight} ${styles.messageAnimationWrap}`}>
            <div className={`${styles.iconWrap}`}>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                <path fill="currentColor" d="M15.718 0h-13.5C.979 0-.032 1.011-.032 2.218v10.093c0 1.239 1.011 2.218 2.25 2.218h3.375v2.952c0 .346.387.547.672.341l4.391-3.293h5.063c1.239 0 2.25-1.011 2.25-2.218V2.218A2.23 2.23 0 0 0 15.718 0zm.595 12.375a.567.567 0 0 1-.563.563h-5.625l-2.813 2.109v-2.109H2.25a.567.567 0 0 1-.563-.563V2.25c0-.308.255-.563.563-.563h13.5c.308 0 .563.255.563.563v10.125z"/>
              </svg>
            </div>
          </div>
        </Popover>

        <div className={`${styles.itemHeaderRight}`}>
          <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo} trigger="click">
            <div className={styles.infoWrap}>
              <div className={styles.avatarWrap}>
                <img src={ImageUser} alt=""/>
              </div>
            </div>
          </Popover>
        </div>

      </div>
    </header>
  );
}

export default Header
