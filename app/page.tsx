"use client";
import { useState } from "react";
import Link from 'next/link';

export default function PublicBooking() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setStatus("Processing...");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setStatus("✅ Your booking was successful!");
        setMessage("");
      } else {
        setStatus("❌ An error occurred. Please try again.");
      }
    } catch (err) {
      setStatus("❌ A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-blue-900">
      
      {/* --- Main Container --- */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Admin Link at the very top of the card */}
        <div className="bg-slate-50 px-8 py-3 flex justify-end border-b border-slate-100">
          <Link href="/login" className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-blue-600 transition">
            Admin Access →
          </Link>
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-black text-blue-900 text-center mb-2 uppercase tracking-tight">
            Book Now
          </h1>
          <p className="text-blue-700 text-center mb-8 font-medium text-sm">
            Just tell us who you are and when you want to visit.
          </p>

          <div className="space-y-4">
            <textarea
              className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-900 text-lg shadow-inner placeholder:text-slate-300"
              rows={4}
              placeholder="e.g. I am Nimal, haircut tomorrow at 10.00"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleBook}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-slate-300 text-lg"
            >
              {loading ? "Sending..." : "Confirm Booking"}
            </button>

            {status && (
              <div className={`p-4 rounded-xl text-center font-bold text-sm ${
                status.includes("✅") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {status}
              </div>
            )}
          </div>
          
          <p className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest font-bold">
            Powered by Smart AI Assistant
          </p>
        </div>
      </div>
    </div>
  );
}