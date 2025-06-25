"use client";

import styles from "./UserMenu.module.css";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const UserMenu = () => {
    const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={styles.userMenu}>
      <button onClick={() => setMenuOpen(!menuOpen)} className={styles.userBtn}>
        {userInitial}
      </button>
      {menuOpen && (
        <div className={styles.dropdown}>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
          <button className={styles.btnLogout} onClick={handleLogout}>
            Logout<IoLogOutOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
