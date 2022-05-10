import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages";
import { Layout } from "./components";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={{ pathname: "/dashboard", search: "?account=visa&period=day" }} />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);