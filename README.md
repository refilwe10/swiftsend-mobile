# SwiftSend Mobile App

A React Native (Expo) mobile application built for SwiftSend Couriers. This app allows drivers to view assigned deliveries and update their statuses, and allows customers to track their parcels.



##  Technologies Used
*   **Framework:** React Native with Expo
*   **Routing:** Expo Router
*   **Authentication:** Firebase Auth (Google SSO) & Custom JWT/Bcrypt (Backend)
*   **Database:** MySQL (via Node.js API)
*   **HTTP Client:** Axios
*   **CI/CD:** GitHub Actions

##  Main Features
*   **Dual-Role Registration & Login:** Secure authentication with bcrypt password hashing.
*   **Google Single Sign-On (SSO):** Integrated via Firebase.
*   **Session Persistence:** Uses AsyncStorage to keep users logged in.
*   **Driver Dashboard:** View assigned deliveries, update status (Picked Up, In Transit, Delivered), and confirm Proof of Delivery.
*   **Customer Dashboard:** Track parcels in real-time.
*   **Settings Management:** Update profile details and preferences.

##  Release Notes (Version 1.0.0 - Final WIL Release)
**Innovative Features Added:**
*   Implemented Google Sign-In (SSO) using Firebase.
*   Added Role-based dashboards (Driver vs. Customer).
*   Full delivery status workflow and Proof of Delivery (POD).
*   Persistent sessions using AsyncStorage.

**Fixes & Improvements (Based on Task 2 Feedback):**
*   **Security:** Enforced strict input validation on API endpoints to prevent authentication bypass.
*   **Automated Testing:** Removed the CI bypass (`|| true`) and enforced strict TypeScript compilation. Added Jest and Supertest backend integration tests running on every push via GitHub Actions.
*   **Documentation:** Updated README and user docs to accurately reflect the current state of the system.

##  Local Development Setup
1. Clone the repository: `git clone https://github.com/refilwe10/swiftsend-mobile.git`
2. Install dependencies: `npm install`
3. Start the app: `npx expo start`
4. Scan the QR code with the Expo Go app (Android) or use an emulator.

##  Use of AI Tools
AI tools (Claude) were used to assist with debugging Expo/Firebase configuration errors, structuring documentation, and reviewing code for security vulnerabilities. All AI-generated suggestions were reviewed and tested on physical devices before implementation.

##  Team Members
*   Refilwe Phore (ST10458818)
*   Ntembeko Ndayi (ST10180342)
   cd swiftsend-mobile
>>>>>>> 4ce6696bf7323773d06e33463e95fbdcb78d51d1
