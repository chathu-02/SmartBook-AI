"use client";

import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://cafzsajgafohokfonveu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZnpzYWpnYWZvaG9rZm9udmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjEyOTEsImV4cCI6MjA4NTgzNzI5MX0.HMgGJUmerN59MOmFMZklYfiLeJDR4e5Rbk8PbhuLsWs"
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message || "Invalid credentials");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className={`p-10 bg-white rounded-3xl shadow-2xl w-full max-w-md login-card ${error ? 'animate-shake' : ''}`}>
        <h2 className="text-3xl font-black mb-2 text-center text-slate-800">ADMIN ACCESS</h2>
        <p className="text-center text-slate-500 mb-8 font-medium">Please sign in to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition" 
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 transition" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-transform transform-gpu active:scale-95 disabled:bg-slate-300"
          >
            {loading ? "Verifying..." : "Sign In Now"}
          </button>
          {error && <p className="text-center text-sm font-bold text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}