import "antd/dist/antd.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "./Router";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);

export default App;
