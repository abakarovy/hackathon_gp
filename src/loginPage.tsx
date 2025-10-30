// src/components/Auth.tsx
import React, { useState } from "react";

type AuthResult = {
  success: boolean;
  message: string;
};

function validateEmail(email: string) {
  // простая проверка формата email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- RegisterModal ----------
interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (email: string, password: string) => Promise<AuthResult> | AuthResult;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!validateEmail(email)) {
      setError("Введите корректный email.");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов.");
      return;
    }
    if (password !== passConfirm) {
      setError("Пароли не совпадают.");
      return;
    }

    try {
      setLoading(true);
      const result = await onRegister(email, password);
      if (result.success) {
        setSuccessMsg(result.message || "Успешно зарегистрированы.");
        // optionally clear fields:
        setEmail("");
        setPassword("");
        setPassConfirm("");
        // close after a short delay:
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1000);
      } else {
        setError(result.message || "Ошибка регистрации.");
      }
    } catch (err) {
      setError("Ошибка сервера.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-[#1f2429] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-100">Регистрация</h3>

          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#2b3237] bg-[#22282d] text-white placeholder:text-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#2b3237] bg-[#22282d] text-white placeholder:text-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Минимум 6 символов"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Повторите пароль</label>
              <input
                type="password"
                value={passConfirm}
                onChange={(e) => setPassConfirm(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#2b3237] bg-[#22282d] text-white placeholder:text-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Повторите пароль"
                required
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}
            {successMsg && <div className="text-sm text-green-500">{successMsg}</div>}

            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#05df72] hover:bg-[#05c766] text-white font-medium px-4 py-2 rounded-md disabled:opacity-60"
              >
                {loading ? "Регистрация..." : "Зарегистрироваться"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-[#2b3237] text-gray-200"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ---------- LoginForm ----------
interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<AuthResult> | AuthResult;
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onOpenRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!validateEmail(email)) {
      setError("Введите корректный email.");
      return;
    }
    if (password.length < 4) {
      setError("Пароль слишком короткий.");
      return;
    }

    try {
      setLoading(true);
      const res = await onLogin(email, password);
      if (res.success) {
        setSuccessMsg(res.message || "Вход выполнен.");
        // optionally clear password
        setPassword("");
      } else {
        setError(res.message || "Неверные учетные данные.");
      }
    } catch (err) {
      setError("Ошибка сервера.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-transparent rounded-2xl p-0">
        <h2 className="text-2xl font-semibold text-gray-100">Войти в аккаунт</h2>
        <p className="mt-1 text-sm text-gray-300">Используйте почту и пароль</p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#2b3237] bg-[#22282d] text-white placeholder:text-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-[#2b3237] bg-[#22282d] text-white placeholder:text-gray-400 px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Ваш пароль"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
              Запомнить меня
            </label>

            <button type="button" className="text-sm text-green-400 hover:underline" onClick={() => alert("Функция восстановления пароля") }>
              Забыли пароль?
            </button>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}
          {successMsg && <div className="text-sm text-green-500">{successMsg}</div>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#05df72] hover:bg-[#05c766] text-white font-medium px-4 py-2 rounded-md disabled:opacity-60"
            >
              {loading ? "Вход..." : "Войти"}
            </button>

            <button
              type="button"
              onClick={onOpenRegister}
              className="flex-1 bg-transparent border border-[#2b3237] text-gray-200 px-4 py-2 rounded-md"
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ---------- Container component that combines Login + Register ----------
export const Auth: React.FC = () => {
  const [registerOpen, setRegisterOpen] = useState(false);

  // stub: fake API handlers
  const fakeLogin = async (email: string, password: string): Promise<AuthResult> => {
    // пример: простой локальный "фейк"
    console.log("Login attempt:", { email, password });
    if (email === "user@example.com" && password === "password") {
      return { success: true, message: "Добро пожаловать!" };
    }
    return { success: true, message: "Вход (симуляция): привет!" };
    // return { success: false, message: "Неверный логин или пароль." };
  };

  const fakeRegister = async (email: string, password: string): Promise<AuthResult> => {
    console.log("Register attempt:", { email, password });
    // можно добавить проверку на существующий email и т.п.
    return { success: true, message: "Аккаунт успешно создан." };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181c1e] p-6">
      <div className="w-full max-w-lg bg-[#1f2429] rounded-2xl shadow-xl p-8">
        <LoginForm onLogin={fakeLogin} onOpenRegister={() => setRegisterOpen(true)} />
      </div>
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} onRegister={fakeRegister} />
    </div>
  );
};

export default Auth;