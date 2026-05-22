# 🍛 Khana Express - Food Delivery App

A complete **React Native** food delivery application built with **Expo** and **Expo Router**, demonstrating all major navigation patterns including Stack, Tab, Drawer navigation, authentication flow, deep linking, and state persistence.

---

## 📱 Project Overview

**Khana Express** is a full-featured food delivery app UI showcasing comprehensive React Navigation implementation with:
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
- ✅ Indian-themed UI with Poppins font

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

- **GitHub Repository:** [Your GitHub Link](#)
- **TLDraw Diagram:** [Navigation Structure Diagram](#)

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
git clone <your-repo-url>
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
Email: alex@foodapp.com
Password: password
```

### **Auth States**
1. **First Launch:** Onboarding → Login
2. **Returning (not logged in):** Login
3. **Returning (logged in):** Home (direct)
4. **After Logout:** Login

### **Persistence**
```typescript
// Saved to AsyncStorage
{
  user: { id, name, email, avatar },
  hasOnboarded: true
}
```

---

## 🔗 Deep Linking Setup

### **Configuration (`app.json`)**
```json
{
  "expo": {
    "scheme": "foodapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.foodapp"
    },
    "android": {
      "package": "com.yourcompany.foodapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [{ "scheme": "foodapp" }],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### **Deep Link Handler**
**File:** `src/app/restaurant/[id].tsx`

```typescript
export default function RestaurantDeepLink() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = RESTAURANTS.find(r => r.id === id);
  
  if (!restaurant) {
    return <Redirect href="/(tabs)/home" />;
  }
  
  return (
    <Redirect
      href={{
        pathname: '/(tabs)/home/restaurant',
        params: {
          id: restaurant.id,
          name: restaurant.name,
          deliveryFee: String(restaurant.deliveryFee),
        },
      }}
    />
  );
}
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

## 🧭 Navigation Patterns Implemented

### **1. Stack Navigator**
**Location:** Root (`_layout.tsx`), Home (`home/_layout.tsx`)

**Features:**
- Custom header (pink background, white tint)
- Back button with "Back" label
- Dynamic title from route params
- Fade and slide transitions

**Usage:**
```typescript
// Navigate
router.push('/(tabs)/home/restaurant');

// With params
router.push({
  pathname: '/(tabs)/home/restaurant',
  params: { id: '1', name: 'Biryani House', deliveryFee: '0' },
});

// Go back
router.back();
```

### **2. Bottom Tab Navigator**missing help screen
**Location:** `src/app/(tabs)/_layout.tsx`

**Features:**
- 4 tabs: Home, Search, Orders, Profile
- Lucide icons
- Pink active tint (`#FC2D7C`)
- Badge on Orders tab (cart count)
- Hidden on Restaurant and Cart screens

**Implementation:**
```typescript
const HIDE_TABBAR = ['restaurant', 'cart'];
const segments = useSegments();
const last = segments[segments.length - 1];
const hideTabBar = HIDE_TABBAR.includes(last);

<Tabs
  screenOptions={{
    tabBarStyle: hideTabBar ? { display: 'none' } : { ... }
  }}
/>
```

### **3. Drawer Navigator**
**Location:** `src/app/drawer.tsx`

**Features:**
- Slides from **left** (not bottom)
- Custom content: avatar, name, email, Gold Member badge
- Menu sections: Main, Account, Support
- Sign Out button
- Dimmed backdrop (tap to close)

**Access:**
```typescript
// From Profile screen
router.push('/drawer');
```

**Animation:**
```typescript
const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

// Slide in
Animated.spring(translateX, { toValue: 0 }).start();

// Slide out
Animated.timing(translateX, { toValue: -DRAWER_WIDTH }).start(() => router.back());
```

### **4. Nested Navigation**
**Restaurant Stack inside Home Tab**

```
(tabs)/home/
├── _layout.tsx       ← Stack Navigator
├── index.tsx         ← Home feed
├── restaurant.tsx    ← Restaurant detail
└── cart.tsx          ← Cart
```

**Benefits:**
- Independent navigation history per tab
- Custom header for restaurant screen
- Tab bar visibility control

---

## 🎯 Programmatic Navigation

### **navigate (router.push)**
```typescript
// Simple navigation
router.push('/(tabs)/search');

// With params
router.push({
  pathname: '/(tabs)/home/restaurant',
  params: { id: '1', name: 'Biryani House' },
});
```

### **goBack (router.back)**
```typescript
// Go back one screen
router.back();
```

### **replace (router.replace)**
```typescript
// Replace current screen (no back)
router.replace('/(tabs)/orders');
```

### **reset (router.dismissAll + replace)**
```typescript
// Clear stack and navigate
router.dismissAll();
router.replace('/(tabs)/home');
```

**Used in:**
- ✅ NavigationGuard (auth redirects)
- ✅ Empty cart "Browse Restaurants" button
- ✅ After checkout (cart → orders)
- ✅ Logout flow

---

## 📦 Route Parameters

### **Passing Params**
```typescript
// Home → Restaurant
router.push({
  pathname: '/(tabs)/home/restaurant',
  params: {
    id: restaurant.id,
    name: restaurant.name,
    deliveryFee: String(restaurant.deliveryFee),
  },
});
```

### **Receiving Params**
```typescript
// In Restaurant screen
const params = useLocalSearchParams<{
  id: string;
  name: string;
  deliveryFee: string;
}>();

console.log(params.id);        // "1"
console.log(params.name);      // "Biryani House"
console.log(params.deliveryFee); // "0"
```

### **Using Params**
```typescript
// Dynamic header title
<Stack.Screen
  name="restaurant"
  options={({ route }) => ({
    title: (route.params as any)?.name ?? 'Restaurant',
  })}
/>
```

---

## 🎨 Custom Features

### **1. Custom Stack Header**
**File:** `src/app/(tabs)/home/_layout.tsx`

```typescript
<Stack
  screenOptions={{
    headerStyle: { backgroundColor: '#FC2D7C' },  // Pink
    headerTintColor: '#fff',                      // White text
    headerBackTitle: 'Back',                      // Back label
    animation: 'slide_from_right',
  }}
>
  <Stack.Screen
    name="restaurant"
    options={({ route }) => ({
      headerShown: true,
      title: (route.params as any)?.name ?? 'Restaurant',
    })}
  />
</Stack>
```

### **2. Tab Bar Badge**
**File:** `src/app/(tabs)/_layout.tsx`

```typescript
function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { totalItems } = useCart();
  return (
    <View style={{ position: 'relative' }}>
      <ShoppingBag size={size} color={color} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {totalItems > 9 ? '9+' : totalItems}
          </Text>
        </View>
      )}
    </View>
  );
}
```

### **3. Animated Restaurant Header**
**File:** `src/app/(tabs)/home/restaurant.tsx`

- Cover image collapses on scroll
- Header height: 240px → 88px
- Image opacity: 1 → 0
- Smooth interpolation

### **4. Screen Transitions**
- **Root Stack:** `fade`
- **Home Stack:** `slide_from_right`
- **Drawer:** Custom spring animation
- **Onboarding:** Horizontal paging

---

## 🎨 UI/UX Features

### **Design System**
- **Primary Color:** `#FC2D7C` (Pink - Swiggy-inspired)
- **Accent Color:** `#FC8019` (Orange)
- **Font:** Poppins (300-900 weights)
- **Theme:** Dark/Light mode support

### **Indian Theme**
- 🇮🇳 Indian restaurants (Biryani, Dosa, Dhaba, etc.)
- ₹ Indian currency (Rupees)
- 📍 Indian locations (Connaught Place, New Delhi)
- 🍛 Authentic Indian dishes

### **Screens**
1. **Onboarding** — 3 slides with "Get Started"
2. **Login** — Email/password with demo credentials
3. **Home** — Restaurant feed with categories
4. **Restaurant** — Menu with ADD buttons
5. **Cart** — Checkout with bill details
6. **Search** — Trending searches + results
7. **Orders** — Past orders with reorder button
8. **Profile** — Stats + menu sections
9. **Drawer** — Custom content with avatar

---

## 📸 Screenshots

### **Navigation Flow**
```
Onboarding → Login → Home → Restaurant → Cart → Orders
                      ↓
                   Search, Profile, Drawer
```

### **Deep Link Flow**
```
foodapp://restaurant/1
    ↓
src/app/restaurant/[id].tsx
    ↓
Redirect to: (tabs)/home/restaurant?id=1&name=Biryani+House
    ↓
Restaurant Detail Screen
```

---

## 🧪 Testing Checklist

### **Navigation**
- [x] Onboarding → Login flow
- [x] Login → Home flow
- [x] Home → Restaurant (with params)
- [x] Restaurant → Cart
- [x] Cart → Orders (after checkout)
- [x] Profile → Drawer
- [x] Drawer → My Orders
- [x] Back navigation works
- [x] Tab switching works
- [x] Tab bar hides on Restaurant/Cart

### **Authentication**
- [x] Login with demo credentials
- [x] Auth state persists after reload
- [x] Logout clears state
- [x] NavigationGuard redirects correctly

### **Deep Linking**
- [x] `foodapp://restaurant/1` opens Biryani House
- [x] `foodapp://restaurant/2` opens Dosa Corner
- [x] Invalid ID redirects to Home

### **Cart & Badge**
- [x] ADD button adds to cart
- [x] Badge shows on Orders tab
- [x] Badge updates on quantity change
- [x] Badge disappears when cart is empty

### **Programmatic Navigation**
- [x] `navigate` — Home → Restaurant
- [x] `goBack` — Restaurant → Home
- [x] `replace` — Empty cart → Home
- [x] `reset` — After checkout → Orders

---

## 🔧 State Management

### **Auth Store** (`src/store/authStore.ts`)
- **Pattern:** Pub/sub (no Context)
- **Persistence:** AsyncStorage
- **Functions:** `login()`, `logout()`, `completeOnboarding()`
- **Hook:** `useAuth()`

### **Cart Store** (`src/store/cartStore.ts`)
- **Pattern:** Pub/sub (no Context)
- **Functions:** `addItem()`, `updateQuantity()`, `clearCart()`
- **Hook:** `useCart()`
- **Computed:** `totalItems`, `totalPrice`

---

## 🎯 Assignment Requirements Met

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Expo React Native setup | ✅ | Expo SDK 55 |
| Onboarding with Get Started | ✅ | 3 slides + button |
| Stack Navigator flow | ✅ | Onboarding → Home → Restaurant → Cart |
| Pass params | ✅ | id, name, deliveryFee |
| Custom stack header | ✅ | Pink bg, white tint, "Back" label |
| Bottom Tab Navigator | ✅ | Home, Search, Orders, Profile |
| Vector icons | ✅ | Lucide React Native |
| Badge on Orders tab | ✅ | Shows cart count |
| Restaurant Stack nested | ✅ | Inside Home tab |
| Hide tab bar | ✅ | On Restaurant + Cart |
| Drawer from Profile | ✅ | Slides from left |
| Drawer items | ✅ | My Orders, Settings, Help, Logout |
| Custom drawer content | ✅ | Avatar, name, email, badge |
| Conditional auth flow | ✅ | NavigationGuard |
| Persist auth state | ✅ | AsyncStorage |
| Screen transitions | ✅ | Fade, slide, spring |
| navigate | ✅ | router.push() |
| goBack | ✅ | router.back() |
| replace | ✅ | router.replace() |
| reset | ✅ | router.dismissAll() + replace |
| Deep link support | ✅ | foodapp://restaurant/123 |
| README with diagram | ✅ | This file |

---

## 🤔 Assumptions Made

1. **Mock Data:** Using static restaurant data (no backend API)
2. **Auth:** Simple email/password check (no real authentication)
3. **Payment:** Mock payment flow (no real payment gateway)
4. **Location:** Static location (no GPS/maps integration)
5. **Images:** Using Pexels placeholder images
6. **Currency:** Indian Rupees (₹) for Indian theme
7. **Font:** Poppins loaded via Expo Google Fonts
8. **Platform:** Tested on Android (iOS should work similarly)

---

## 📚 Key Learnings

1. **Expo Router** — File-based routing simplifies navigation structure
2. **Nested Navigators** — Stack inside Tabs requires careful configuration
3. **Auth Flow** — NavigationGuard pattern for conditional routing
4. **Deep Linking** — Dynamic routes with redirect logic
5. **State Persistence** — AsyncStorage for auth state
6. **Tab Bar Control** — useSegments() for dynamic visibility
7. **Programmatic Navigation** — Different methods for different use cases
8. **Custom Animations** — Animated API for smooth transitions

---

## 🐛 Known Issues

1. **Font Loading:** May show system font briefly before Poppins loads
2. **Deep Link:** Requires app to be installed (doesn't work in Expo Go)
3. **Android Back Button:** May need additional handling for drawer
4. **Web:** Some animations may not work on web platform

---

## 🚀 Future Enhancements

- [ ] Real backend API integration
- [ ] User registration flow
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Payment gateway integration
- [ ] Google Maps integration
- [ ] Search with filters
- [ ] Favorites/Wishlist
- [ ] Order rating & reviews
- [ ] Multi-language support

---

## 📄 License

This project is created for educational purposes as part of a React Native navigation assignment.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Expo Team** — For the amazing development platform
- **React Navigation** — For comprehensive navigation library
- **Swiggy** — UI inspiration
- **Pexels** — Free stock images
- **Lucide** — Beautiful icon set

---

## 📞 Support

For questions or issues:
1. Check the [Troubleshooting](#-known-issues) section
2. Review the [Demo Video](#-demo-video)
3. Open an issue on GitHub
4. Contact via email

---

**⭐ If you found this helpful, please star the repository!**

---

*Last Updated: May 22, 2026*
