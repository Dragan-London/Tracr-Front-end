# <img src="https://i.ibb.co/v6WbSjWg/Tracr-logo.png" width="60" height="60"/> Tracr App

Tracr is a mobile application that transforms real-world movement into visual designs. Users are given a **daily challenge shape** (or can select one from a library) and attempt to recreate it by physically walking or running the route.

Using GPS tracking, the app records the user’s path and compares it to the chosen shape, evaluating how closely the route matches the intended design.

---
## 🚀 Features

* 📍 **GPS Route Tracking** – Record real-time movement using location services
* 🎯 **Daily Challenges** – Try to recreate a new shape every day
* 🧩 **Shape Library** – Choose from a collection of predefined designs
* 📊 **Route Evaluation** – Compare your path to the target shape
* 🏆 **Stats & Leaderboard** – Track progress and compete with others
* 🔐 **Authentication** – Secure sign up and login system

---

## 🛠️ Tech Stack

### Frontend

* **React Native** – Cross-platform mobile development
* **Expo** – Simplified development and deployment
* **Expo Router** – Navigation and routing

### Backend

* **Express.js** – REST API server
* **PostgreSQL** – Database for users, routes, and shapes

### Maps & Location

* **Expo Location** – Access GPS data
* **React Native Maps** – Render maps and routes

### Image & Shape Processing

* Grid-based path comparison algorithm (using normalisation, interpolation, and % overlap calculation)

---

## 🧠 Key Technical Challenges

* Converting GPS coordinates (lat/long) into comparable shapes
* Normalising routes for accurate comparison and interpolating between points
* Designing a fair and meaningful shape-matching algorithm
* Managing real-time location updates efficiently
* Creating a smooth and intuitive mobile user experience

---

# Tracr Frontend

This repository contains the **frontend** (React Native + Expo) implementation of Tracr app which is a mobile app that turns real-world user routes (walking/running) into shapes where users are given a daily challenge (a shape) and attempt to recreate it by completing the route in the real world.

## 🚀 Frontend Tech Stack 

- **React Native** (shared codebase for iOS & Android)
- **Expo** (development tooling, build pipeline, and runtimes)
- **Expo Router** (file-based navigation / routing)
- **Expo Location** + **React Native Maps** (GPS tracking + map rendering)

## 🧠 Core UX Flow

1. User gets assigned a daily challenge (or choose to select a shape of their choice from the library)
2. User starts a run and app begins GPS tracking via `expo-location`
3. Map updates live using `react-native-maps`
4. When completed, the tracked path is compared against the template shape
5. Results (match score, stats) are shown and optionally stored via API

## 📥 Getting Started (Frontend)

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run start
```

Choose to run the app on:

- Android emulator
- iOS simulator
- Expo Go (physical device)
- Web (limited support)

### 3) Optional: reset starter project

Restores the starter template and moves current app logic into `app-example/`:

```bash
npm run reset-project
```

## 🔌 Backend Integration (API)

This frontend is designed to work with an Express.js backend API ([link to repo](https://github.com/S-Kirwan/Tracr-backend/)) that provides:

- Shape data / library endpoints
- Route result storage & retrieval
- User sign-up / login

In this app, look for API calls in the `src/app/` route components and the `UserContext`.

## 🧪 Useful Scripts

- `npm run start` – start Expo development server
- `npm run android` – start on Android emulator
- `npm run ios` – start on iOS simulator
- `npm run web` – start in browser
- `npm run lint` – run ESLint checks
---

## 📬 Contact

For questions or collaboration, feel free to reach out or open an issue.

---

⭐ If you find this project useful, consider giving it a star!
