# ROI Platform Dashboard — (https://github.com/soumikdhak/Roi_platform_Dashboard)
 
React (TypeScript) dashboard for the ROI Platform investment and referral system. Built with Vite, Redux Toolkit, React Router, and Tailwind CSS.
 
**Tech stack:** React, TypeScript, Redux Toolkit, React Router (`createBrowserRouter`), React Hook Form, Tailwind CSS, Chart.js (`react-chartjs-2`), FontAwesome

## 1. Setup steps
 
```bash
git clone https://github.com/soumikdhak/Roi_platform_Dashboard.git
cd Roi_platform_Dashboard
npm install
```
 
Create a `.env` file in the root (see [Environment variables](#2-environment-variables) below).
 
```bash
npm run dev
```

***The app starts on `http://localhost:5000`. Make sure the backend API is running first — see the backend repo's README for setup.***

## 2. Environment variables
 
Create a `.env` file in the root with:
 
| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:8000/api/v1` |
 
Vite only exposes env variables prefixed with `VITE_` to the client — any variable without that prefix will be `undefined` in the app.
 
---

## 3. Project structure
 
```
src/
├── api/              # Axios instance and request config
├── component/        # Reusable UI: Header, Cards, BarChart, modals (Login, Register, InvestmentForm, ReferrelTree, ReferrelIncome, RoiHistory)
├── pages/             # Route-level pages: LandingPage, DashBoard
├── redux/
│   ├── slices/        # authSlice, investmentSlice, referrelTreeSlice, referrelIncomeSlice
│   └── store.ts
├── interfaces/        # Shared TypeScript interfaces for API payloads and Redux state
├── types/             # Typed Redux hooks (useAppDispatch, useAppSelector)
├── utils/             # Helpers: date formatting, first-letter extraction, etc.
├── app.tsx          # createBrowserRouter route definitions
└── main.tsx            # App entry point — mounts RouterProvider + Redux Provider
```

## 4. State management
 
Redux Toolkit, with one slice per domain:
 
| Slice | Responsibility |
|---|---|
| `authSlice` | Login, register, logout, dashboard summary data, chart data |
| `investmentSlice` | Creating investments, fetching investment history |
| `referrelTreeSlice` | Direct and full nested referral tree |
| `referrelIncomeSlice` | Paginated referral income history |
 
Each async operation (login, fetch dashboard, create investment, etc.) is a `createAsyncThunk`, with `pending`/`fulfilled`/`rejected` cases handled in the corresponding slice's `extraReducers`.
 
---

## 5. Assumptions made during development
 
- The backend issues JWTs as httpOnly cookies on login/register; the frontend does not manually store or attach tokens — Axios is configured to send credentials with each request.
- Investment plans (name, ROI rate, duration, min/max amount) are currently defined on the frontend as fixed constants; in a production setup these would likely be fetched from the backend so plan changes don't require a frontend redeploy.
- After a successful investment, the dashboard data is re-fetched to keep the displayed wallet balance in sync, rather than trusting locally-computed state.
- Modals (login, register, investment form, referral tree, history views) are implemented as nested routes rendered through `<Outlet />`, rather than a separate modal-state-management library.