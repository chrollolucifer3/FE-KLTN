import React from 'react';
import styles from "./styles.module.scss";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {logOut} from "../../../../../api/auth";
import {useDispatch} from "react-redux";
import { removeAdminToken } from 'utils/localStorage';

function PopoverProfile() {
  const navigate = useNavigate();
  const authUser = useSelector(state => state.auth.authUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut()).then(() => {
      removeAdminToken();
      navigate('/admin/login');
    });
  };

  return (
    <div className={styles.modalInfoWrap}>
      <div className={styles.personalInformationWrap}>
        <div className={styles.name}>
        {authUser.fullName}
        </div>
        <div className={styles.role}>
          {authUser?.role === 'SUPER_ADMIN' ? 'Quản trị viên' : 'Nhân viên'}
        </div>
      </div>
      <div className={styles.mainModalInfoWrap}>
        <ul className={styles.menuInfoWrap}>
          <li
            onClick={() => navigate('/admin/profile')}
            className={`${styles.itemInfoWrap}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 13.714" width="12" height="13.714">
              <g fill="currentColor">
                <path d="M6 6.857a3.429 3.429 0 1 0 0-6.86 3.429 3.429 0 0 0 0 6.861zm0-6a2.573 2.573 0 0 1 2.571 2.571c0 1.418-1.153 2.571-2.571 2.571S3.429 4.845 3.429 3.428A2.574 2.574 0 0 1 6 .857zm1.358 7.286H4.642A4.642 4.642 0 0 0 0 12.785c0 .513.416.929.928.929h10.144a.928.928 0 0 0 .928-.929 4.643 4.643 0 0 0-4.642-4.642zm3.712 4.714H.928a.071.071 0 0 1-.071-.072A3.79 3.79 0 0 1 4.642 9h2.713a3.79 3.79 0 0 1 3.788 3.785c0 .04-.032.072-.072.072z"/>
              </g>
            </svg>
            <span className={styles.text}>Thông tin cá nhân</span>
          </li>
          <li
          onClick={handleLogout}
            className={styles.itemInfoWrap}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" width="12" height="12">
              <g fill="currentColor">
                <path d="M3.938 10.125H2.25A1.128 1.128 0 0 1 1.125 9V3c0-.619.506-1.125 1.125-1.125h1.688a.562.562 0 1 0 0-1.126H2.25A2.251 2.251 0 0 0 0 3v6a2.25 2.25 0 0 0 2.25 2.25h1.688c.312 0 .563-.251.563-.563s-.251-.563-.563-.563zm7.873-4.533L8.238 2.447a.79.79 0 0 0-.846-.128.768.768 0 0 0-.454.697v1.296H4.125a.939.939 0 0 0-.938.938v1.5c0 .517.42.938.938.938h2.813v1.296a.77.77 0 0 0 .455.697.788.788 0 0 0 .845-.128l3.572-3.12c.122-.107.19-.259.19-.421s-.068-.314-.19-.42zM8.063 8.203V6.541h-3.75V5.416h3.75V3.775l2.527 2.216-2.527 2.212z"/>
              </g>
            </svg>
            <span className={styles.text}

            >Đăng xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PopoverProfile;
