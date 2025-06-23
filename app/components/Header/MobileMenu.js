"use client";

import Link from "next/link";
import styles from "./Header.module.css";

const MobileMenu = ({ isLoggedIn, handleLogout, onClose }) => {
  return (
    <div className={styles.mobileMenu}>
      <Link href="/" onClick={onClose}>Home</Link>
      <Link href="/about" onClick={onClose}>About</Link>

      {isLoggedIn && (
        <Link href="/upload" onClick={onClose}>Upload</Link>
      )}

      {!isLoggedIn ? (
        <>
          <Link href="/login" onClick={onClose}>Login</Link>
          <Link href="/register" onClick={onClose}>Register</Link>
        </>
      ) : (
        <>
          <Link href="/profile" onClick={onClose}>Профіль</Link>
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            Вийти
          </button>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
