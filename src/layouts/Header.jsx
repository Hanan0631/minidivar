import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import Navbar from "components/templates/Navbar";

function Header() {
  const [click, setClick] = useState(false);

  const buttonRef = useRef(null);
  const menuRef = useRef(null)

  const clickHandler = () => {
    setClick(!click);
  };

  const handleOutsideClick = (event) => {
    if (event.target !== buttonRef.current && menuRef.current && !menuRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <button className={styles.profile} onClick={clickHandler} ref={buttonRef}>
          <img src="profile.svg" />
          <span>دیوار من</span>
        </button>
        <Navbar click={click} menuRef={menuRef} />
        <Link to="/dashboard" className={styles.button}>
          ثبت آکهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
