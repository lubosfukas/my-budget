import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "./Router";

import "antd/dist/antd.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);

export default App;
