🚀 SmartBook-AI: Intelligent Appointment System

SmartBook-AI is a seamless and efficient appointment management system powered by Artificial Intelligence. It eliminates the need for complex forms, allowing customers to book appointments by simply typing a natural sentence about their needs.

✨ Key Features
AI-Powered Booking: Understands natural language input from customers and extracts booking details automatically.

Secure Admin Dashboard: A protected interface for administrators to view, search, and manage all appointments.

Real-time Database: Powered by Supabase for instant data synchronization.

Responsive Design: Fully optimized for all screen sizes, including mobile, tablet, and desktop.

Modern Tech Stack: Built with the latest Next.js 14 and Tailwind CSS for speed and reliability.

🛠️ Tech Stack
Framework:

Styling:

Database & Auth:

Deployment:

🚀 Getting Started
To get a local copy up and running, follow these steps:

1. Clone the Repository
2. Install Dependencies
3. Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

4. Run the Project
Open with your browser to see the result.

📄 License
This project is licensed under the MIT License.

🛠️ How to Run Locally
Clone & Install: First, download the code from your GitHub repository and install the necessary packages.

Environment Setup: Create a file named .env.local in the root folder. You need to add your Supabase credentials here so the app can talk to your database:

Start Developing: Run the development server:

Open http://localhost:3000 in your browser to see the booking page.

🔄 The Execution Logic (How it works)
The system is divided into two main "flows" that work together:

1. The Booking Flow (Customer Side)
Input: The user types a natural sentence (e.g., "I'm Nimal, I need a haircut tomorrow at 10 AM") into the textarea.

API Processing: When they click "Confirm Booking," the message is sent to the /api/chat route.

Data Storage: The backend processes the text and saves the details (Name, Service, Date/Time) directly into the Supabase appointments table.

2. The Management Flow (Admin Side)
Authentication: When you visit /admin, the useEffect hook checks if you are logged in via Supabase Auth. If not, it redirects you to the /login page.

Data Fetching: Once logged in, the dashboard calls fetchAppointments(), which pulls the latest data from the database.

Live Updates: Since it uses Supabase, the table updates as soon as new bookings arrive. You can search for specific customers or delete old entries using the dashboard UI.

🌐 Live Deployment
Since you deployed this on Render.















