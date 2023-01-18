import React from "react";
import CoinSearch from "../components/CoinSearch";
import Footer from "../components/Footer";


function Home({ data, setPage, page }) {
  return (
    <div>
      <CoinSearch data={data} setPage={setPage} page={page} />
      <Footer />
    </div>
  );
}

export default Home;
