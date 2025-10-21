# Top-left Controls Flow: Home → (Contact, Sign Out)

This document describes the adjusted UI flow where the Home screen shows two top-left controls (Contact and Sign Out) instead of a hamburger drawer. Tapping Sign Out should call Firebase `signOut()` and return the user to the Login/Signin screen.

## Visual
See `assets/drawer-flow.svg` for a wireframe showing:
- Home screen with top-left buttons: 📞 Contact and 🚪 Sign Out
- No drawer — Sign Out is a top-level action
- Sign Out ends session and returns to Sign In

## Contract
- Inputs: user taps the Contact or Sign Out button in the header.
- Output: tapping "Sign Out" calls Firebase signOut and navigates to `/signin` (replace). Button shows loading while signOut is in progress.
- Error modes: network failures on signOut should show an error toast and keep the user on Home.

## Implementation notes
Your project uses Expo and `expo-router` in places; there are multiple valid wiring approaches. Below are two simple ways that match your existing code patterns.

### A — Expo Router + header buttons (recommended)
- Keep file-based routing. Add header buttons inside `app/_layout.tsx` or inside `Home` screen's header area.
- Use `useAuth()` (you already have `app/signout.tsx` using it) or direct `signOut` from your `lib/firebase` helper. After signOut call, do `router.replace('/signin')` so users cannot go back.

Snippet for a header button in `Home` (React component):

```tsx
import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export function HeaderSignOut() {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await auth.signOut();
      router.replace('/signin');
    } catch (err) {
      console.warn('Sign out failed', err);
      setLoading(false);
    }
  }

  return (
    <TouchableOpacity onPress={handleSignOut} disabled={loading} style={{ marginRight: 12 }}>
      {loading ? <ActivityIndicator /> : <Text style={{ color: '#E21212', fontWeight: '700' }}>Sign Out</Text>}
    </TouchableOpacity>
  );
}
```

You can place a small Contact button next to it that navigates to a Contact screen: `router.push('/contact')`.

### B — React Navigation header buttons (explicit)
- If you prefer explicit React Navigation setup, add header buttons via `options` on the screen and call your signOut helper similarly.

## Edge cases
- Already-signed-out user: ensure signOut handles idempotency.
- Slow network: show ActivityIndicator on Sign Out.
- If `router.replace` is used, ensure user can't go back to Home.

## Next steps (I can implement)
- I can patch `app/_layout.tsx` or `app/home.tsx` to add header Contact and Sign Out buttons and wire the signOut call using your `useAuth()` helper.
- I can also add a small toast for signOut errors and an ActivityIndicator while signing out.

Which file should I modify to add the header buttons: `HomeScreen.js` (you have a `HomeScreen.js` in root) or the Expo Router `app/index.tsx`/`app/_layout.tsx`? If you prefer, I can detect the most consistent place and implement it.
