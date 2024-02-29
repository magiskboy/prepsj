"use client";

import { Button } from "antd";
import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.login}>
      <div className={styles.form}>
        <Button danger href="http://localhost:3001/auth/login">
          Login with Google
        </Button>
      </div>
    </main>
  );
}
