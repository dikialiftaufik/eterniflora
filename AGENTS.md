# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

---

You are an expert React Native and Expo engineer helping me build **EterniFlora**.

Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.

Think like a senior mobile developer.

---

## Project Overview

We are building **EterniFlora** — an app that helps users buy, customize, and craft aromatherapy bouquets made from upcycled plastic bottles, turning waste into wellness while earning eco rewards for every sustainable action.

The app includes:

- **Bouquet Studio** — step-by-step interactive customizer (flower type, petal color, leaf accent, wrapping) with live 2D preview and direct add-to-cart
- **DIY Healing Kit** — guided mindfulness crafting session with an integrated audio player for meditation soundscapes
- **Eco Points Wallet** — digital points ledger earned by depositing plastic bottles via QR-scan simulation of IoT waste bank machines, redeemable for discount vouchers
- **Eco Events** — browse and register for sustainability field events (river cleanup, tree planting) that reward eco points upon completion
- **E-commerce Cart & Checkout** — add custom or ready-made bouquets to cart, view eco-impact per order (bottles saved), and proceed to checkout
- **Profile & Impact Dashboard** — user account, order history, eco points history, tier badge (e.g. Gold Tier Hero), and total plastic bottles saved stat

Keep the implementation simple and readable.

---

## Tech Stack

Use the following stack:

- **Expo SDK 54** (Managed Workflow)
- **React Native**
- **TypeScript**
- **Expo Router v3** (file-based routing)
- **NativeWind v4** (Tailwind CSS for React Native)
- **Zustand v5** (global client state)
- **AsyncStorage** (persistence)
- **TanStack Query v5** (server state, data fetching)
- **Supabase JS v2** (backend, auth, database, storage)
- **expo-camera** + **expo-barcode-scanner** (QR scan for Eco Points)
- **expo-av** (audio player for DIY Healing Kit)
- **React Hook Form** + **Zod** (forms and validation)
- **React Native Paper v5** (supplemental UI components)

Do not introduce new major libraries unless there is a strong reason.

Ask before installing anything new.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better approach. If a new library would significantly help, recommend it, explain why, and ask before adding it.

Example:

> "This could be done manually, but using `react-native-reanimated` would make the bouquet preview animation smoother. Do you want me to add it?"

Do not install new libraries without approval.

---

## Architecture

Use this folder structure:

```
app/
  (auth)/
  (tabs)/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
```

### app/

Routes and screens only.

Screens compose components and call hooks or stores. They should not contain large reusable UI blocks or business logic.

### components/

Create a component when it is:

- reused in multiple places
- makes a screen easier to read
- represents a clear UI concept

**Examples for this app:**

- `BouquetCustomizerCard` — a selectable option card used across all four steps of the Bouquet Studio (flower type, petal color, leaf, wrapping); renders an emoji/icon, label, subtitle, and a purple active-border selected state
- `EcoPointsWalletCard` — the dark-green hero card on the Eco Points screen displaying the user's points balance, bottles deposited, discounts claimed, tier badge, and a recycling-icon watermark
- `CartItemRow` — a single row inside the cart screen showing product thumbnail, name, price, eco-label ("🌿 Selamatkan 12 Botol"), and a quantity stepper (−/+)

Do not create components too early. When unsure, ask:

> "Should this be a reusable component or stay inside the screen for now?"

### data/

Hardcoded content. Keep it typed.

```
data/
  products.ts
  events.ts
  vouchers.ts
  healingSteps.ts
```

### store/

Zustand stores. Examples of state to keep here:

- `bouquetConfig: { flowerType: 'roses' | 'lilies' | 'wildflowers' | 'sunflowers', petalColor: 'ethereal-purple' | 'rose-pink' | 'amber' | 'white', leafAccent: string, wrappingStyle: string, ribbonColor: string }` — drives the live preview in Bouquet Studio
- `cartItems: Array<{ id: string, name: string, price: number, quantity: number, bottlesSaved: number, thumbnailUrl: string }>` — persisted with AsyncStorage, used by Cart screen and cart badge count in the header
- `ecoPoints: { balance: number, tier: 'bronze' | 'silver' | 'gold', totalBottlesDeposited: number, totalDiscountClaimed: number, transactions: Array<{ date: string, amount: number, source: string }> }` — fetched from Supabase, displayed in Eco Points Wallet card and Profile impact dashboard

Persist with AsyncStorage when needed.

### lib/

External service helpers only. Never expose secret keys here.

```
lib/
  supabase.ts
  api.ts
  cn.ts
```

---

## UI/UX & Design Systems

For any UI task, strictly adhere to modern design principles, maintaining a calming, aesthetic, and premium experience. Do not approximate; replicate provided designs exactly while applying the following rules.

### 1. Laws of UX (Interaction & Mental Models)
- **Aesthetic-Usability Effect**: Aesthetically pleasing design is perceived as more usable. Always prioritize premium polish.
- **Fitts's Law**: Touch targets must be large and easily reachable (minimum 48px).
- **Hick's Law**: Minimize user choices to reduce decision time. Keep interfaces simple.
- **Jakob's Law**: Stick to established design patterns. Users prefer familiar experiences (e.g., standard tab bars, intuitive icons).
- **Gestalt Principles (Proximity, Similarity, Common Region)**: Group related elements using generous whitespace and clear boundaries (like cards/containers).
- **Von Restorff Effect**: Important elements (Primary CTAs) must visually stand out from the rest.

### 2. Laws of UI (The Elegance Formula)
- **Embrace Negative Space**: Generous whitespace prevents cluttered layouts and allows content to breathe.
- **Clear Visual Hierarchy**: Use size, color, and contrast to establish a clear focal point.
- **60-30-10 Color Rule**: 60% dominant (background), 30% secondary (cards/brand), 10% accent (CTAs/highlights).
- **Consistency**: Ensure identical design elements (buttons, inputs, cards) remain consistent across all screens.
- **Don't Make Users Think**: Strive for intuitive, predictable processes.

### 3. Typography Rules
- **Limit Font Styles**: Stick to a maximum of 2 fonts to prevent visual chaos.
- **Hierarchy & Contrast**: Guide the reader's eye using size, weight (Bold vs. Regular), and contrast (Large vs. Small, Dark vs. Light text).
- **Alignment**: Left-aligned text is easiest to read on screens for body paragraphs. Center alignment is best for short headings or isolated UI text.
- **Readability**: Ensure proper line length and generous line spacing. 
- **EterniFlora Typeface Pairing**:
  - **Primary Font (Heading/Display): `Playfair Display`**. Khusus untuk elemen besar (judul halaman, angka utama/poin, branding). Menghadirkan karakter visual yang vokal, elegan, dan kontras ekstrem.
  - **Secondary Font (Body/UI Text): `Lato`**. Untuk teks panjang, label form, deskripsi, dan navigasi (fokus pada legibility). Sebagai penyeimbang netral berpendekatan humanist & self-healing yang hangat.

### 4. UI Font Size & Layout Guidelines (Cheat Sheet)
Always adhere to the following mobile typography scale to prevent tiny font mistakes:
- **Heading 1 (Onboarding/Hero)**: 28px, Line Height 38px, Bold
- **Heading 2 (Primary Title)**: 24px, Line Height 34px, Semi-bold/Bold
- **Heading 3 (Secondary/Card Title)**: 20px, Line Height 30px, Medium
- **Text 1 (Body/Headline)**: 16px, Line Height 26px, Regular
- **Text 2 (Standard Body)**: 14px, Line Height 24px, Regular
- **Text 3 (Details/Caption)**: 12px, Line Height 20px, Regular
- **Text 4 (Tab Bar, Tags, Badges)**: 10px, Line Height 18px, Regular
- **Navigation Bounds**: Standard Bottom Tab Bar / App Bar height is typically 56px.

### 5. Visual Direction & Colors
- **Primary color:** `#7C3AED` (Vivid Purple)
- **Background:** `#F5F3F0` (Warm Off-White)
- **Eco accent:** `#16A34A` (Forest Green)
- **Dark hero sections:** `#1E0A3C` (Deep Purple)
- **Dark eco wallet:** `#14532D` (Dark Green)
- **Cards:** `border-radius: 20–24px`, subtle box shadow, soft-gradient backgrounds where appropriate.
- **Buttons:** Fully rounded pill shape (`border-radius: 999px`), minimum height 52px, purple gradient.
- **Illustrations:** Flat vector style, pastel purple/lavender palette.

### 6. The 10 UI Design Mistakes to Avoid
1. **Cluttered Layout**: Too much going on overwhelms users.
2. **Poor Color Contrast**: Hurts accessibility and frustrates reading.
3. **Tiny Font Size**: Small text is difficult to read on mobile.
4. **Too Many Fonts**: Creates visual inconsistency.
5. **Inconsistent Buttons**: Breaks the flow and confuses users.
6. **Weak Visual Hierarchy**: Important elements get lost.
7. **No White Space**: Makes content hard to scan and understand.
8. **Poor Navigation**: Frustrates users and makes them leave.
9. **Low-Quality Icons**: Makes the app look unprofessional.
10. **Ignoring Mobile Users**: Always optimize for touch targets and mobile ergonomics.

---

## Styling Rules

Use NativeWind classes. Do not use StyleSheet unless it is not possible to style with `className`.

Use the NativeWind version installed in this project. Check `package.json`. Do not upgrade without approval.

Reuse class patterns through utilities in `global.css`.

### Style Exception List

Use StyleSheet or inline styles for:

- `SafeAreaView` (className not supported)
- `KeyboardAvoidingView` (behavior props)
- `Modal` (visible, transparent props)
- `Animated.View` (animated style values)
- Dynamic styles calculated at runtime
- Platform-specific styles
- `Pressable` or `TouchableOpacity` pressed states
- Shadows (different per platform)

Everywhere else, use NativeWind.

### SafeAreaView Example

```tsx
// ✅ CORRECT
import { SafeAreaView } from "react-native-safe-area-context";
function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F3F0" }}>
      {/* content */}
    </SafeAreaView>
  );
}

// ❌ INCORRECT
function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F3F0]">{/* content */}</SafeAreaView>
  );
}
```

---

## Image Rule

Use centralized image imports.

1. Check if `constants/images.ts` exists.
2. If not, create it.
3. Import all app images there.
4. Use them through the centralized object.

```ts
import mascot from "@/assets/images/mascot.png";
import heroBouquet from "@/assets/images/hero-bouquet.png";

export const images = {
  mascot,
  heroBouquet,
};
```

```tsx
<Image source={images.heroBouquet} />
```

Do not import image assets directly inside screens or components.

---

## State Management

- Zustand for global client state
- Local state for temporary UI state
- AsyncStorage for persistence
- TanStack Query for server state from Supabase

---

## TypeScript

- Strict mode
- No `any`
- Keep types simple and readable

---

## Feature Implementation

When building a feature:

1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

---

## Supabase Rules

Use Supabase for:

- Authentication (email/password)
- User profiles and eco points data
- Product catalog and orders
- Event registrations

Initialize the client in `lib/supabase.ts` only. Never expose the service role key in the client.

---

## Secrets

- Never expose secret keys in client code.
- Use server routes for tokens, AI calls, and any external API access.
- Supabase anon key is safe to expose. Service role key is NOT.

---

## UI Quality Bar

The app should feel:

- calming and aesthetic
- polished and premium
- wellness-focused and eco-conscious
- mobile-first

Use:

- rounded cards with soft shadows
- clear spacing and breathing room
- purple gradient CTAs
- green eco-impact labels on every purchase-related UI
- friendly empty states with flat illustrations
- large touch targets (minimum 48px)

---

## Communication

Be concise. Explain what changed and how to test it.

---

## Final Reminder

Before every feature:

- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Replicate UI exactly when designs are provided.
