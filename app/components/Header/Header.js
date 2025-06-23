"use client";

import Link from "next/link";
// import Image from "next/image";
import logo from "../../../public/logo.png"; // Adjust the path as necessary
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token) {
      setIsLoggedIn(true);
      setUserInitial(user?.name?.[0]?.toUpperCase() || "U");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header>
      <div className="container">
        {/* <Link href="/">
          <img src={logo} alt="Logo" width={50} height={50} />
        </Link> */}
        <strong>Next-TEST</strong>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {isLoggedIn && <Link href="/upload">Upload</Link>}
          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "coral",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {userInitial}
              </button>
              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: 4,
                    padding: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <Link href="/profile">Профіль</Link>
                  <br />
                  <button
                    onClick={handleLogout}
                    style={{ marginTop: 8, cursor: "pointer" }}
                  >
                    Вийти
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
