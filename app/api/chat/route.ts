import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    
    const body = await req.json().catch(() => null);
    if (!body || !body.message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    const { message } = body;

    const supabaseUrl = "https://cafzsajgafohokfonveu.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZnpzYWpnYWZvaG9rZm9udmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjEyOTEsImV4cCI6MjA4NTgzNzI5MX0.HMgGJUmerN59MOmFMZklYfiLeJDR4e5Rbk8PbhuLsWs";
    const supabase = createClient(supabaseUrl, supabaseKey);

    
    const lowerMsg = message.toLowerCase();
    
    
    const nameMatch = message.match(/(?:i am|name is|me)\s+([a-zA-Z]+)/i);
    const customerName = nameMatch ? nameMatch[1] : message.split(/[ ,]+/)[0];

    //  (Today: 2026-02-06)
    let date = "2026-02-06"; 
    if (lowerMsg.includes("tomorrow")) {
      date = "2026-02-07";
    }

    // 10 AM, 2 PM, 14:30
    const timeMatch = message.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM))/);
    const time = timeMatch ? timeMatch[0] : "10:00 AM";

    // SERVICE TYPE
    const service = lowerMsg.includes("haircut") ? "Haircut" : 
                    lowerMsg.includes("car wash") ? "Car Wash" : "General Service";

    // Supabase එකට දත්ත දැමීම
    const { error: dbError } = await supabase
      .from('appointments')
      .insert([
        { 
          customer_name: customerName, 
          appointment_date: date, 
          appointment_time: time,
          service_details: service 
        }
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      throw new Error("Database insertion failed: " + dbError.message);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("SERVER CRASH ERROR:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}