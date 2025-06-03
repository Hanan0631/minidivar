import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { RxExit } from "react-icons/rx";
import { MdLogin } from "react-icons/md";

import { getProfile } from "services/user";
import { removeCookie } from "utils/cookie";
import { e2p } from "utils/numbers";

import styles from "./Navbar.module.css";

function Navbar({ click, menuRef }) {
  const { data, isLoading, refetch } = useQuery(["profile"], getProfile);
  // console.log({ data, isLoading });

  const exitHandler = () => {
    removeCookie();
    refetch();
  };

  return (
    <div className={styles.navbar} ref={menuRef}>
      {!data && click && (
        <div className={styles.login}>
          <Link to="/auth">
            <MdLogin />
            <span>ورود</span>
          </Link>
        </div>
      )}
      {data && click && (
        <div className={styles.profile}>
          <div>
            <Link to="/dashboard">
              <img src="profile.svg" />
              <p>کاربر دیوار</p>
            </Link>
          </div>
          <div>تلفن {e2p(data.data.mobile)}</div>
          {data.data.role === "ADMIN" && (
            <div>
              <Link to="/admin">ورود به پنل ادمین</Link>
            </div>
          )}
          <div>
            <RxExit />
            <button onClick={exitHandler}>خروج</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
