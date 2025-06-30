import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import SideBar from "./SiderBar";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setLocation} from "../../states/modules/app";

function MainLayout(props) {
  const { children } = props;
  const isShowSideBar = useSelector(state => state.app.isShowSideBar);
  const isThemeLight = useSelector(state => state.app.isThemeLight);
  const titlePage = useSelector(state => state.app.title);
  const location = useSelector(state => state.app.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathName !== location.prevPathName) {
      dispatch(setLocation({
        pathName: location.pathName,
        payload: location.payload,
        prevPathName: location.pathName,
      }));
      navigate(location.pathName);
    }
  }, [location, navigate, dispatch]);

  return (
    <div className={`${styles.boxMainLayout}`}>
      <div className={styles.headerBox}></div>
      <div className={styles.mainLayoutWrap}>
        <SideBar
          isThemeLight={isThemeLight}
          isShowSideBar={isShowSideBar}
        />
        <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
          <Header/>
          <main className={styles.mainContentWrap}>
            <div className={styles.headerMainWrap}>
              <div className={styles.titleWrap}>{titlePage}</div>
              {/* <div className={styles.breadcrumbWrap}>
                <span className={`${styles.text}`}>Trang chủ</span> <span className={styles.slash}>/</span>
                <span className={`${styles.text} ${styles.breadcrumbActive}`}>Dashboard</span>
              </div> */}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
