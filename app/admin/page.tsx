"use client";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://cafzsajgafohokfonveu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZnpzYWpnYWZvaG9rZm9udmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjEyOTEsImV4cCI6MjA4NTgzNzI5MX0.HMgGJUmerN59MOmFMZklYfiLeJDR4e5Rbk8PbhuLsWs"
);

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchAppointments = async () => {
    const { data } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (data) setAppointments(data);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
    };
    checkUser();
    fetchAppointments();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const filtered = appointments.filter(apt => apt.customer_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-white bg-blue-700 px-4 py-2 rounded-lg font-bold hover:bg-blue-800">Log Out</button>
        </div>

        <input 
          type="text" 
          placeholder="Search by name..." 
          className="w-full max-w-md p-3 rounded-3xl shadow-sm mb-6 border-none outline-none bg-white text-blue-900 placeholder-blue-400 focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                <th className="px-6 py-4 text-blue-600">Customer</th>
                <th className="px-6 py-4 text-blue-600">Date & Time</th>
                <th className="px-6 py-4 text-blue-600">Service</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(apt => (
                <tr key={apt.id} className="border-b hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-bold text-blue-900">{apt.customer_name}</td>
                  <td className="px-6 py-4 text-blue-700">{apt.appointment_date} at {apt.appointment_time}</td>
                  <td className="px-6 py-4 text-blue-600">{apt.service_details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}