import "./App.css";
import Home from "./Components/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Components/Details";
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home title={title} setTitle={setTitle} />} />
          </Route>
          <Route path="/details">
            <Route index element={<Details title={title} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
