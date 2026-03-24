# Workout App — Project Context

## Project Overview
A cross-platform mobile workout tracking app built with React Native (Expo) and Supabase.

**Stack:**
- React Native with Expo (Expo Router for navigation)
- TypeScript
- Supabase (Postgres database, auth, REST API)
- expo-sqlite not used — Supabase is the database

---

## Installed Packages
```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

---

## Supabase Client
File: `lib/supabase.ts`
```typescript
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```

---

## Database Schema
All tables have been created and run in Supabase SQL Editor.

### Tables

```sql
create extension if not exists "pgcrypto";

create table profiles (
  id uuid references auth.users(id) primary key,
  name text,
  unit_preference text default 'imperial',
  created_at timestamp default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  type text,
  address text,
  city text,
  state text,
  zip text,
  country text default 'US',
  latitude float,
  longitude float
);

create table exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  primary_muscle text,
  equipment text,
  is_custom boolean default false,
  created_by uuid references profiles(id)
);

create table workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  location_id uuid references locations(id),
  name text,
  notes text,
  started_at timestamp default now(),
  ended_at timestamp
);

create table workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references workouts(id) on delete cascade,
  exercise_id uuid references exercises(id),
  order_index int default 0,
  notes text
);

create table sets (
  id uuid primary key default gen_random_uuid(),
  workout_exercise_id uuid references workout_exercises(id) on delete cascade,
  set_num int default 0,
  set_type text default 'Straight Set',
  reps int,
  weight float,
  weight_unit text default 'lbs',
  duration_secs int,
  distance float,
  rest_seconds int,
  is_complete boolean default false
);
```

### Row Level Security
```sql
alter table profiles enable row level security;
alter table locations enable row level security;
alter table exercises enable row level security;
alter table workouts enable row level security;
alter table workout_exercises enable row level security;
alter table sets enable row level security;

create policy "Users can manage their own profile"
on profiles for all
using (auth.uid() = id);

create policy "Users can manage their own workouts"
on workouts for all
using (auth.uid() = user_id);

create policy "Users can manage their own locations"
on locations for all
using (auth.uid() = user_id);

create policy "Users can view all exercises"
on exercises for select
using (true);

create policy "Users can create custom exercises"
on exercises for insert
with check (auth.uid() = created_by);

create policy "Users can manage their workout exercises"
on workout_exercises for all
using (workout_id in (
  select id from workouts where user_id = auth.uid()
));

create policy "Users can manage their sets"
on sets for all
using (workout_exercise_id in (
  select we.id from workout_exercises we
  join workouts w on w.id = we.workout_id
  where w.user_id = auth.uid()
));
```

---

## Decisions & Notes

**Workout name** — `name` is optional (`text` with no `not null`). The app will auto-generate a name like "Morning Workout — March 23" based on the user's local timezone at the time the workout starts.

**Exercise deletion** — No `on delete cascade` on `workout_exercises.exercise_id` intentionally. The database will block deletion of an exercise that has history. Consider adding `is_archived boolean default false` to exercises later to hide them from the picker without deleting.

**Location sharing** — NOT implemented yet. When ready, the approach will be:
1. Add `is_public boolean default false` to `locations`
2. Update the locations policy to `using (auth.uid() = user_id or is_public = true)`
3. Add a `location_shares` junction table for friend-specific sharing

**Zip codes** — Stored as `text` not `int` to preserve leading zeros and support international postal codes.

**Weight unit** — Stored per set (`weight_unit text default 'lbs'`) rather than referencing `profiles.unit_preference`. This ensures historical sets always display in the unit they were originally logged in, even if the user later changes their preference.

---

## Navigation Structure
Using Expo Router file-based routing with route groups.

```
app/
├── index.tsx              ← smart redirect based on auth state
├── (auth)/
│   ├── _layout.tsx
│   ├── sign-in.tsx
│   └── sign-up.tsx
├── (onboarding)/
│   ├── _layout.tsx
│   ├── name.tsx
│   └── preferences.tsx
└── (app)/
    ├── _layout.tsx        ← tab bar lives here
    └── index.tsx          ← home/dashboard
```

### Auth Flow
```
Open app
    ↓
index.tsx checks Supabase auth state
    ↓
Not logged in → (auth) group → sign-in or sign-up
    ↓
Logged in, no profile → (onboarding) → name → preferences
    ↓
Logged in, has profile → (app) group → home dashboard
```

---

## Auth Methods
- Email & password
- Google OAuth

---

## Current Status
- [x] Supabase project created
- [x] Supabase client configured in `lib/supabase.ts`
- [x] All tables created in Supabase
- [x] Row Level Security enabled and policies created
- [x] Empty file structure created in `app/`
- [ ] Auth screens (sign-in, sign-up)
- [ ] Onboarding screens (name, preferences)
- [ ] Main app screens (home, workout, history)
