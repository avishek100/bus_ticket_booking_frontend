import React from "react";
import { createRoot } from "react-dom/client"; // Correct import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import React Query
import "./index.css"; // Tailwind CSS file
import App from "./App.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  {/* ✅ Wrap with QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
