'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const COOKIE_NAME = "admin-access-granted";
const COOKIE_MAX_AGE_SECONDS = 300; // 5 минут

function hasCookie(name: string) {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith(`${name}=`));
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}`;
}

export default function AdminAccessButton() {
  const secretKey = process.env.NEXT_PUBLIC_ADMIN_KEY || "massage-secret-2024";

  const [timeLeft, setTimeLeft] = useState(30);

  const showButtonInitial = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    const adminKey = params.get("admin");

    if (adminKey === secretKey) {
      setCookie(COOKIE_NAME, "true", COOKIE_MAX_AGE_SECONDS);
      return true;
    }
    return hasCookie(COOKIE_NAME);
  }, [secretKey]);

  const [showButton, setShowButton] = useState(showButtonInitial);

  useEffect(() => {
    if (!showButton) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowButton(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showButton]);

  const hideButton = () => setShowButton(false);

  if (!showButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 max-w-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">🔑 Админ-доступ</h3>
          <button
            onClick={hideButton}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Скрыть"
          >
            ×
          </button>
        </div>

        <Link
          href="/admin"
          onClick={() => setCookie(COOKIE_NAME, "true", COOKIE_MAX_AGE_SECONDS)}
          className="block w-full text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg mb-3"
        >
          🚧 Открыть админку
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            ⏱ Скрыется через {timeLeft} сек
          </div>
        </div>

        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-emerald-500 h-1 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
