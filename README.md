# 🍛 Delulu Food - Food Delivery App

A complete **React Native** food delivery application built with **Expo** and **Expo Router**, demonstrating all major navigation patterns including Stack, Tab, Drawer navigation, authentication flow, deep linking, and state persistence.

---

## 📱 Project Overview

**Delulu Food** is a full-featured food delivery app UI showcasing comprehensive React Navigation implementation with:
- ✅ Nested navigation (Stack inside Tabs)
- ✅ Conditional authentication flow
- ✅ Persistent auth state with AsyncStorage
- ✅ Deep linking support
- ✅ Custom headers and transitions
- ✅ Programmatic navigation (navigate, goBack, replace, reset)
- ✅ Dynamic tab bar visibility
- ✅ Drawer navigation with custom content
- ✅ Route parameters passing
- ✅ Cart badge on tabs

---

## 🎥 Demo Video

**[📹 Watch 2-Minute Demo Video](#)** *(Add your video link here)*

**Demo covers:**
- ✅ Login/Auth flow with persistence
- ✅ Onboarding → Home flow
- ✅ Bottom tabs navigation
- ✅ Restaurant Detail with params
- ✅ Cart navigation
- ✅ Drawer from Profile
- ✅ Orders badge (cart count)
- ✅ Deep link: `foodapp://restaurant/1`
- ✅ App reload with persisted auth

---

## 🔗 Links

- **GitHub Repository:** [[Repo](https://github.com/shiwamshahare/food-delivery-app-ui)](#)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Mobile app framework |
| **Expo SDK 55** | Development platform |
| **Expo Router v4** | File-based routing |
| **TypeScript** | Type safety |
| **AsyncStorage** | State persistence |
| **Lucide React Native** | Vector icons |
| **Expo Google Fonts** | Poppins font family |
| **React Navigation** | Navigation library (via Expo Router) |

---

## 📂 Project Structure

```
food-delivery-app-ui/
├── src/
│   ├── app/                          # Expo Router file-based routing
│   │   ├── _layout.tsx               # Root Stack + NavigationGuard
│   │   ├── index.tsx                 # Redirect to home
│   │   ├── drawer.tsx                # Drawer Navigator (Modal)
│   │   │
│   │   ├── onboarding/               # Onboarding Stack
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx             # 3-slide carousel
│   │   │
│   │   ├── (auth)/                   # Auth Stack
│   │   │   ├── _layout.tsx
│   │   │   └── login.tsx             # Login screen
│   │   │
│   │   ├── (tabs)/                   # Bottom Tab Navigator
│   │   │   ├── _layout.tsx           # Tab configuration
│   │   │   ├── home/                 # Home Stack (nested)
│   │   │   │   ├── _layout.tsx       # Custom header config
│   │   │   │   ├── index.tsx         # Home feed
│   │   │   │   ├── restaurant.tsx    # Restaurant detail
│   │   │   │   └── cart.tsx          # Cart/checkout
│   │   │   ├── search.tsx
│   │   │   ├── orders.tsx
│   │   │   └── profile.tsx
│   │   │
│   │   └── restaurant/               # Deep link handler
│   │       └── [id].tsx              # Dynamic route
│   │
│   ├── store/
│   │   ├── authStore.ts              # Auth state + AsyncStorage
│   │   └── cartStore.ts              # Cart state (pub/sub)
│   │
│   ├── hooks/
│   │   ├── useTheme.ts               # Dark/light mode
│   │   └── useFonts.ts               # Poppins font loading
│   │
│   ├── theme/
│   │   ├── colors.ts                 # Color tokens
│   │   └── fonts.ts                  # Font configuration
│   │
│   ├── data/
│   │   └── restaurants.ts            # Mock data
│   │
│   └── components/
│       └── Text.tsx                  # Custom Text component
│
├── app.json                          # Expo config + deep link scheme
├── package.json
└── README.md
```

---

## 🗺️ Navigation Structure

### **Visual Diagram**

```
Root Stack (_layout.tsx)
│
├── onboarding/          ← Stack (first launch)
│   └── index            ← 3 slides + "Get Started"
│
├── (auth)/              ← Stack (unauthenticated)
│   └── login            ← Email/password
│
├── (tabs)/              ← Bottom Tab Navigator ──────────────────
│   ├── home/            ← Stack (nested inside Home tab)
│   │   ├── index        ← Home feed (tab bar visible)
│   │   ├── restaurant   ← Detail (tab bar HIDDEN, custom header)
│   │   └── cart         ← Checkout (tab bar HIDDEN)
│   │
│   ├── search           ← Search screen
│   ├── orders           ← Order history (badge shows cart count)
│   └── profile          ← Profile + drawer access
│
├── drawer               ← Transparent Modal (slides from left)
│   └── Custom content: avatar, nav items, logout
│
└── restaurant/[id]      ← Deep link handler
    └── Redirects to (tabs)/home/restaurant with params
```

### **Navigation Flow**

```
App Launch
    │
    ├─ isLoading = true  →  Wait for AsyncStorage
    │
    ├─ user = null, hasOnboarded = false  →  /onboarding
    │       └─ "Get Started"  →  completeOnboarding()  →  /(auth)/login
    │
    ├─ user = null, hasOnboarded = true  →  /(auth)/login
    │       └─ login()  →  persist  →  /(tabs)/home
    │
    └─ user = { ... }  →  /(tabs)/home  (skip auth)
            └─ logout()  →  clear storage  →  /(auth)/login
```

---

## 🚀 How to Run Locally

### **Prerequisites**
- Node.js 18+ or Bun
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)
- Expo Go app (for testing on physical device)

### **Installation**

```bash
# Clone the repository
git clone https://github.com/shiwamshahare/food-delivery-app-ui.git
cd food-delivery-app-ui

# Install dependencies
bun install
# or
npm install

# Start Expo dev server
bun run start
# or
npm start
```

### **Run on Device**

```bash
# Android
bun run android

# iOS
bun run ios

# Web
bun run web
```

### **Clear Cache (if needed)**
```bash
bun run start --clear
```

---

## 🔐 Authentication Flow

### **Implementation**
- **Store:** `src/store/authStore.ts` (pub/sub pattern, no Context)
- **Persistence:** AsyncStorage (`@foodapp_auth` key)
- **Guard:** `NavigationGuard` in `src/app/_layout.tsx`

### **Demo Credentials**
```
Email: com@shahare.com
Password: password
```

### **Auth States**
1. **First Launch:** Onboarding → Login
2. **Returning (not logged in):** Login
3. **Returning (logged in):** Home (direct)
4. **After Logout:** Login



### **Testing Deep Links**

```bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/1"

# iOS Simulator
xcrun simctl openurl booted "foodapp://restaurant/1"
```

### **Supported Deep Links**
- `foodapp://restaurant/1` → Biryani House
- `foodapp://restaurant/2` → Dosa Corner
- `foodapp://restaurant/3` → Punjabi Dhaba
- `foodapp://restaurant/4` → Chaat Bazaar
- `foodapp://restaurant/5` → Tandoor Express
- `foodapp://restaurant/6` → Thali Junction

---
 
## 📄 License

This project is created for educational purposes as part of a React Native navigation assignment.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@shiwamshahare](https://github.com/shiwamshahare)
- Email: com.shahare@gmail.com

---

## 🙏 Acknowledgments

- **Expo Team** — For the amazing development platform
- **React Navigation** — For comprehensive navigation library
- **Pexels** — Free stock images
- **Lucide** — Beautiful icon set

---


**⭐ If you found this helpful, please star the repository!**

---

*Last Updated: May 22, 2026*
