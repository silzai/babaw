// pages/index.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Printer } from "lucide-react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const login = () => {
    if (user === "admin" && pass === "printer") {
      localStorage.setItem("auth", "1");
      router.push("/print");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Printer className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">WhatsApp Print Queue</h1>
          <p className="text-gray-600 text-sm">Login to access your images</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            onClick={login}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
}
