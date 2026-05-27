# 🍛 Delulu Food - Food Delivery App

A complete **React Native** food delivery application built with **Expo SDK 55** and **React Navigation v7**, demonstrating all major navigation patterns including Stack, Bottom Tabs, Drawer navigation, authentication flow, deep linking, and state persistence.

> **Note:** This project uses **React Navigation** directly (not Expo Router) for full control over navigation architecture.

---

## 📱 Project Overview

**Delulu Food** is a full-featured food delivery app UI showcasing comprehensive React Navigation implementation with:
- ✅ Nested navigation (Stack inside Tabs inside Drawer)
- ✅ Conditional authentication flow (Login stack vs Main app)
- ✅ Persistent auth state with AsyncStorage
- ✅ Deep linking support (`foodapp://restaurant/:id`)
- ✅ Custom headers and transitions
- ✅ Programmatic navigation (`navigate`, `goBack`, `replace`, `reset`)
- ✅ Dynamic tab bar visibility (hides on Restaurant Detail & Cart)
- ✅ Real Drawer navigation with custom content (avatar, user name, logout)
- ✅ Route parameters passing
- ✅ Cart badge on Orders tab

---

## 🎥 Demo Video

**[📹 Watch 2-Minute Demo Video](https://drive.google.com/file/d/1JqoVJ5Hb66QP_8R0AYHHo2ktIO1bxkYY/view?usp=drivesdk)** 

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

- **GitHub Repository:** [Repo](https://github.com/shiwamshahare/food-delivery-app-ui)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Mobile app framework |
| **Expo SDK 55** | Development platform |
| **React Navigation v7** | Navigation library (Native Stack, Bottom Tabs, Drawer) |
| **@react-navigation/native-stack** | Stack navigation for auth/home flows |
| **@react-navigation/bottom-tabs** | Bottom tab navigation |
| **@react-navigation/drawer** | Drawer navigation with custom content |
| **TypeScript** | Type safety |
| **AsyncStorage** | Auth state persistence |
| **@expo/vector-icons** | Ionicons icon set |
| **Expo Google Fonts** | Poppins font family |

---

## 📂 Project Structure

```
food-delivery-app-ui/
├── App.tsx                              # Root: NavigationContainer + deep linking
├── src/
│   ├── navigation/                      # All navigator definitions
│   │   ├── types.ts                     # TypeScript param list types
│   │   ├── RootNavigator.tsx            # Auth-conditional root (Onboarding/Auth/Main)
│   │   ├── AuthStack.tsx                # Login stack (unauthenticated)
│   │   ├── DrawerNavigator.tsx          # Drawer with custom content
│   │   ├── TabNavigator.tsx             # Bottom tabs (Home, Search, Orders, Profile)
│   │   └── HomeStack.tsx                # Nested stack (Home → Restaurant → Cart)
│   │
│   ├── screens/                         # All screen components
│   │   ├── OnboardingScreen.tsx         # 3-slide carousel
│   │   ├── LoginScreen.tsx              # Email/password login
│   │   ├── HomeScreen.tsx               # Restaurant feed
│   │   ├── RestaurantDetailScreen.tsx   # Menu + add to cart
│   │   ├── CartScreen.tsx               # Checkout flow
│   │   ├── SearchScreen.tsx             # Search restaurants
│   │   ├── OrdersScreen.tsx             # Order history
│   │   ├── ProfileScreen.tsx            # User profile
│   │   ├── SettingsScreen.tsx           # App settings
│   │   └── HelpScreen.tsx              # Help & support
│   │
│   ├── store/
│   │   ├── authStore.ts                 # Auth state + AsyncStorage persistence
│   │   └── cartStore.ts                 # Cart state (pub/sub pattern)
│   │
│   ├── hooks/
│   │   ├── useTheme.ts                  # Dark/light mode
│   │   └── useFonts.ts                  # Poppins font loading
│   │
│   ├── theme/
│   │   ├── colors.ts                    # Color tokens (light + dark)
│   │   └── fonts.ts                     # Font configuration
│   │
│   ├── data/
│   │   └── restaurants.ts               # Mock restaurant data
│   │
│   └── components/
│       └── Text.tsx                     # Custom Text component with Poppins
│
├── app.json                             # Expo config + deep link scheme
├── package.json
└── README.md
```

---

## 🗺️ Navigation Structure

### **Visual Diagram**

```
NavigationContainer (deep linking: foodapp://)
│
└── RootNavigator (Native Stack — conditional rendering)
    │
    ├── [user=null, hasOnboarded=false]
    │   └── OnboardingScreen         ← 3-slide carousel + "Get Started"
    │
    ├── [user=null, hasOnboarded=true]
    │   └── AuthStack (Native Stack)
    │       └── LoginScreen          ← Email/password form
    │
    └── [user exists]
        └── DrawerNavigator (@react-navigation/drawer)
            │   Custom drawer content: avatar, name, email, Gold badge, logout
            │
            ├── Tabs (Bottom Tab Navigator) ─────────────────────────
            │   ├── HomeStack (Native Stack — nested inside Home tab)
            │   │   ├── Home              ← Restaurant feed (tab bar visible)
            │   │   ├── RestaurantDetail  ← Detail screen (tab bar HIDDEN)
            │   │   └── Cart             ← Checkout (tab bar HIDDEN)
            │   │
            │   ├── Search               ← Search restaurants
            │   ├── Orders               ← Order history (badge shows cart count)
            │   └── Profile              ← Profile + drawer access (hamburger icon)
            │
            ├── Settings                 ← App settings (via drawer)
            └── Help                     ← Help & support (via drawer)
```

### **Navigation Flow**

```
App Launch
    │
    ├─ isLoading = true  →  Splash screen (AsyncStorage hydration)
    │
    ├─ user = null, hasOnboarded = false  →  OnboardingScreen
    │       └─ "Get Started"  →  completeOnboarding()  →  AuthStack/Login
    │
    ├─ user = null, hasOnboarded = true  →  AuthStack/Login
    │       └─ login()  →  persist to AsyncStorage  →  DrawerNavigator/Tabs/Home
    │
    └─ user = { ... }  →  DrawerNavigator/Tabs/Home  (skip auth)
            └─ logout()  →  clear storage  →  AuthStack/Login
```

---

## 🧭 Programmatic Navigation Methods Used

| Method | Screen | Purpose |
|--------|--------|---------|
| `navigation.navigate()` | HomeScreen, SearchScreen, ProfileScreen | Navigate to RestaurantDetail, Cart, Settings, Help |
| `navigation.goBack()` | CartScreen, SettingsScreen, HelpScreen | Back button navigation |
| `navigation.replace()` | CartScreen | Replace Cart with Home (Browse Restaurants) |
| `navigation.reset()` | CartScreen | After checkout, reset stack → navigate to Orders tab |
| `navigation.openDrawer()` | HomeScreen, ProfileScreen | Open the drawer from hamburger menu |

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
npm install

# Start Expo dev server
npm start
```

### **Run on Device**

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### **Clear Cache (if needed)**
```bash
npm start -- --clear
```

---

## 🔐 Authentication Flow

### **Implementation**
- **Store:** `src/store/authStore.ts` (pub/sub pattern, no Context needed)
- **Persistence:** AsyncStorage (`@foodapp_auth` key)
- **Guard:** Conditional rendering in `RootNavigator.tsx` — automatically switches between AuthStack and DrawerNavigator based on `useAuth()` state

### **Demo Credentials**
```
Email: com.shahare@gmail.com
Password: password
```

### **Auth States**
1. **First Launch:** Onboarding → Login
2. **Returning (not logged in):** Login
3. **Returning (logged in):** Home (direct — auth persisted in AsyncStorage)
4. **After Logout:** Login

---

## 🔗 Deep Linking

### **Configuration**
Deep linking is configured in `App.tsx` using React Navigation's `linking` prop:

```typescript
const linking = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              HomeStack: {
                screens: {
                  RestaurantDetail: 'restaurant/:id',
                },
              },
            },
          },
        },
      },
    },
  },
};
```

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

## 📸 Screenshots
<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 38 AM" src="https://github.com/user-attachments/assets/04b5c7dc-100e-48a0-8a2f-1ea2f1764746" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 37 AM" src="https://github.com/user-attachments/assets/b0807593-22e2-4a9e-89ff-f9c8105c2584" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 35 AM" src="https://github.com/user-attachments/assets/b4e37199-e45b-457e-af95-de7cf7e2b5db" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 30 AM" src="https://github.com/user-attachments/assets/9581b2a7-27f6-4601-8b3c-193e9e90793e" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 26 AM" src="https://github.com/user-attachments/assets/a7318ddf-8c47-4d7a-ac5a-3f22d39b3042" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 24 AM" src="https://github.com/user-attachments/assets/670fcb4f-61b5-45c8-815d-21f790a63b04" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 04 23 AM" src="https://github.com/user-attachments/assets/1259b1e4-eeba-4028-88c2-cf2744e0479e" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 29 17 AM" src="https://github.com/user-attachments/assets/c03162aa-f733-4e44-bbc8-671859e104a9" />

<img width="270" height="600" alt="WhatsApp Image 2026-05-23 at 12 29 16 AM" src="https://github.com/user-attachments/assets/3ebf2039-0c34-4c74-9df7-852192cd8e0d" />


## 📄 License

This project is created for educational purposes as part of a React Native navigation assignment.

---

## 👨‍💻 Author

**Shiwam Shahare**
- GitHub: [@shiwamshahare](https://github.com/shiwamshahare)
- Email: com.shahare@gmail.com

---

## 🙏 Acknowledgments

- **Expo Team** — For the amazing development platform
- **React Navigation** — For comprehensive navigation library
- **Pexels** — Free stock images
- **Ionicons** — Icon set via @expo/vector-icons

---


**⭐ If you found this helpful, please star the repository!**

---

*Last Updated: May 27, 2026*
