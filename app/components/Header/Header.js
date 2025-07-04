"use client";

import Link from "next/link";
import { useContext, useState } from "react";
// import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";

import { BiArchiveIn } from "react-icons/bi";
import UserMenu from "../UserMenu/UserMenu";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <img
          src="/logo.svg"
          alt="Логотип"
          width={40}
          height={40}
        />
        </Link>

        <div className={styles.rightSide}>
          
          <nav className={styles.navDesktop}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            {isLoggedIn && (
              <Link href="/upload" className={styles.navLink}>
                Upload
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link href="/login" className={styles.navLink}>
                  Login
                </Link>
                <Link href="/register" className={styles.navLink}>
                  Register
                </Link>
              </>
            ) : null}
          </nav>

          {isLoggedIn && <UserMenu />}

          <button
            className={`${styles.burger} ${mobileMenuOpen ? styles.open : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileMenuOpen && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
