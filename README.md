## Disclaimer!!!

This project has no use in my personal life; it was created purely for fun after seeing a TikTok video. Enjoy the playful experience, and feel free to share it with others!

# Valentine Ask Out (React Version)

This is a fun web project that asks a user to be your Valentine using interactive buttons. It has been reimagined using React and Vite for a modern experience, complete with email notifications!

## How to Use
 Click This Link: https://devsajie.github.io/Random_Project/

 ##OR##

1. Clone the repository to your local machine.
2. Install the necessary dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your EmailJS keys:
   ```
   VITE_EMAILJS_SERVICE_ID=your_id
   VITE_EMAILJS_TEMPLATE_ID=your_id
   VITE_EMAILJS_PUBLIC_KEY=your_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open the localhost link in your web browser.

## Files

- `src/main.jsx`: The entry point of the React application.
- `src/App.jsx`: Handles the routing between pages.
- `src/pages/Home.jsx`: The main page with the "Will you be my Valentine?" question and interactive buttons.
- `src/pages/YesPage.jsx`: The celebration page with confetti and email sending logic.
- `src/index.css`: Global styles and romantic theme configurations.

## Features

- The "NO" button moves to a random position when hovered over.
- The "YES" button grows bigger every time "NO" is attempted.
- Sends a real email notification when they say "YES".
- Beautiful confetti and balloon animations.
