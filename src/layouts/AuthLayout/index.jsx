import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import './styles.scss'
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setLocation} from "../../states/modules/app";

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  title: ''
}

function AuthLayout(props) {
  const { children, title } = props;
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
    <div className={styles.layoutAuthWrap}>

      <div className={styles.mainWrap}>
        <div className={styles.form}>
          <div className={styles.headerWrap}>
            <div className={styles.boxHeaderWrap}>
              <span className={styles.title}>{ title }</span>
            </div>
          </div>
          { children }
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
