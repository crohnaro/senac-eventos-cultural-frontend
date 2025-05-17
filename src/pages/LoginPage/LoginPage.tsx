import React, { useState, type FormEvent } from "react";
import styles from "./LoginPage.module.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

interface LoginProps {
  onLoginSuccess?: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        "https://senac-eventos-cultural-backend-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Falha no login");
      }
      const data = await res.json();
      onLoginSuccess?.(data.token);
      alert("Login Efetuado");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        alert(`Erro ao logar: ${err.message}`);
      } else {
        const errorMsg = String(err);
        setError(errorMsg);
        alert(`Erro ao logar: ${errorMsg}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        {error && <div>{error}</div>}

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={styles.input}
          required
        />

        <label htmlFor="password" className={styles.label}>
          Senha
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ButtonComponent type="submit" text="Entrar" />
      </form>
    </div>
  );
};

export default LoginPage;
