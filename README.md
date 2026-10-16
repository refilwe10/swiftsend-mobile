# SwiftSend Mobile App

Driver and Customer mobile application for SwiftSend Couriers, built with React Native and Expo.

## 📋 Project Overview

This mobile app is part of the SwiftSend Courier Management System, developed as part of the XISD5319 Work Integrated Learning module (Task 2). It connects to a Node.js backend and MySQL database to provide real-time delivery tracking and management.

##  Features

- **User Registration** with role selection (Customer / Driver)
- **Secure Login** with bcrypt password encryption
- **Google Sign-In (SSO)** via Firebase Authentication
- **Session Management** with auto-login
- **Driver Dashboard** — View assigned deliveries from MySQL
- **Customer Dashboard** — Track parcels in real time
- **Delivery Status Updates** — Mark as Picked Up, In Transit, Delivered
- **Proof of Delivery** functionality
- **Settings Management** — Update profile, notifications, password
- **Handles Invalid Inputs** gracefully without crashing

##  Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React Native (Expo) |
| Navigation | Expo Router |
| HTTP Client | Axios |
| Session Storage | AsyncStorage |
| Authentication | Firebase Auth |
| Backend | Node.js + Express |
| Database | MySQL |

##  Getting Started

### Prerequisites
- Node.js v20+
- Expo Go app on your phone
- Backend server running (see backend repo)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/refilwe10/swiftsend-mobile.git
   cd swiftsend-mobile
