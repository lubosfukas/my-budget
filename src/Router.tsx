import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { Dashboard } from "./pages";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={{ pathname: "/dashboard", search: "?account=visa&period=date" }} />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
