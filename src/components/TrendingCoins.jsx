import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function TrendingCoins() {
  const url = `https://api.coingecko.com/api/v3/search/trending`;

  const { isLoading, isError, data, error, isFetching } = useQuery({
    queryKey: ["coinsTrending"],
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-80 bg-primary">
        <p className="text-2xl text-accent font-extrabold">Loading....</p>
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

  if (isFetching) {
    return (
      <div className="flex justify-center items-center mt-80">
        <p className="text-2xl text-accent font-extrabold">Fetching...</p>
      </div>
    );
  }
  return (
    <div className=" bg-primary my-10">
      <h2 className="text-xl font-bold px-4 md:pb-2 pb-8">
        Trending Crypto Currency
      </h2>
      <div className="justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-primary gap-4 rounded-xl md:p-4">
        {data.coins.map((coin) => (
          <div key={coin.item.id}>
            <Link to={`/coin/${coin.item.id}`}>
              <div className="flex p-4 bg-primary shadow-xl rounded-xl border-2 border-secondary">
                <img
                  src={coin.item.small}
                  alt="coin"
                  className="rounded-full h-14 w-14 b-primary p-2 self-center"
                />
                <div className="pl-4 leading-relaxed">
                  <p className="leading-6">{coin.item.name}</p>
                  <p className="leading-5 flex gap-2">
                    <img
                      className="h-4 w-4 align-middle mt-[2px]"
                      src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                      alt=""
                    />
                    {coin.item.price_btc.toLocaleString(undefined, {
                      minimumFractionDigits: 5,
                      maximumFractionDigits: 11,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingCoins;
