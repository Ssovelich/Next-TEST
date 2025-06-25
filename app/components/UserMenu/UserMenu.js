"use client";

import styles from "./UserMenu.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef(null);
  const dropRef = useRef(null);
  const router = useRouter();

  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const handleGoToProfile = () => {
    setMenuOpen(false);
    router.push("/profile");
  };

  return (
    <div className={styles.userMenu}>
      <button
        ref={btnRef}
        onClick={() => setMenuOpen((o) => !o)}
        className={styles.userBtn}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        {userInitial}
      </button>
      {menuOpen && (
        <div ref={dropRef} className={styles.dropdown}>
          <button onClick={handleGoToProfile} className={styles.btn}>
            Profile
          </button>
          <button className={styles.btn} onClick={handleLogout}>
            Logout
            <IoLogOutOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
