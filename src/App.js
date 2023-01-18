import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CoinPage from "./routes/CoinPage";
import { ImSpinner } from "react-icons/im";
import ScrollToTop from "./components/ScrollToTop";
import LiveView from "./routes/LiveView";
import { AuthContextProvider } from "./context/AuthContext";
import DashBoard from "./routes/DashBoard";

function App() {
  const [page, setPage] = useState(1);

  const location = useLocation();

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className=" page bg-primary flex justify-center  items-center mt-80">
        <p className="spin text-7xl text-accent font-extrabold animate-spin">
          <ImSpinner />
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-80">
        <p className="text-2xl text-accent font-extrabold">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <ScrollToTop />
        {location.pathname !== "/" &&
          !location.pathname.includes("/liveview") &&
          !location.pathname.includes("/coin") && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={<Home data={data} setPage={setPage} page={page} />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/liveview/:id" element={<LiveView />} />

          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
