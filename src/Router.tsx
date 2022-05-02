import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages";
import { Layout } from "./components";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
