import { useState } from "react";
import SearchResults from "./SearchResults";
import Navbar from "./Navbar";
import HeaderSection from "./HeaderSection";
import TrendingCoins from "./TrendingCoins";

function CoinSearch({ data, page, setPage }) {
  const [searchData, setSearchData] = useState("");
  return (
    <>
      <Navbar setSearchData={setSearchData} setPage={setPage} page={page} />
      <HeaderSection />

      <div className="lg:px-8 page">
        <SearchResults
          searchData={searchData}
          setSearchData={setSearchData}
          data={data}
          page={page}
          setPage={setPage}
        />
        <TrendingCoins />
      </div>
    </>
  );
}

export default CoinSearch;
