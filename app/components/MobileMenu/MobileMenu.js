"use client";

import Link from "next/link";
import styles from "./MobileMenu.module.css";
import { useEffect } from "react";

const MobileMenu = ({ isLoggedIn, handleLogout, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.mobileMenu}>
          <nav className={styles.navMobile}>
            <Link href="/" onClick={onClose}>
              Home
            </Link>
            <Link href="/about" onClick={onClose}>
              About
            </Link>

            {isLoggedIn && (
              <Link href="/upload" onClick={onClose}>
                Upload
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <Link href="/login" onClick={onClose}>
                  Login
                </Link>
                <Link href="/register" onClick={onClose}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" onClick={onClose}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
