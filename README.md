Sahhty Flow - Health Prediction App
Welcome to Sahhty Flow, a web application that predicts:

Whether a patient will show up for their appointment.

Their Emergency Severity Index (ESI) level for emergency triage.

This tool helps healthcare providers make quick and informed decisions.

Features
Predict Appointment No-Shows.

Predict Emergency Severity Index (ESI) (Level 1–5).

Modern responsive UI with tabs.

Dynamic forms with real-time validation and reset functionality.

API integration for live machine learning predictions.

Tech Stack
Next.js 14

React (Client components)

TailwindCSS

Shadcn/UI components

Lucide-React for icons

External Machine Learning API (via Ngrok URL)

Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/sahhty-flow.git
cd sahhty-flow
Install dependencies:

nginx
Copy
Edit
npm install
or

nginx
Copy
Edit
yarn install
Start the development server:

arduino
Copy
Edit
npm run dev
or

nginx
Copy
Edit
yarn dev
Open your browser and visit http://localhost:3000.

API Configuration
The app is connected to:

cpp
Copy
Edit
https://6287-34-73-229-143.ngrok-free.app
Endpoints:

POST /predict_noshow → Predict appointment attendance.

POST /predict_esi → Predict emergency severity index (1–5).

⚡ You can change the API URL inside the HealthPredictionApp component by updating the apiUrl variable.

Project Structure
arduino
Copy
Edit
src/
  components/
    ui/         // Shadcn UI components like Button, Card, Input, etc.
  app/
    HealthPredictionApp.jsx   // Main health prediction logic
public/
README.md
tailwind.config.js
package.json
Usage
Choose a Tab (Appointment or ESI Prediction).

Fill in patient data (age, gender, conditions, symptoms, etc.).

Click Predict.

View the results instantly.

Reset the form to make another prediction.

Future Improvements
Add loading animations.

Add form validation and error highlights.

Make API URLs configurable via .env file.

Add user authentication.

License
This project is open-sourced under the MIT License.