import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Coin({ coin }) {
  const [savedCoins, setSavedCoins] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoinData(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.uid) {
      setSavedCoins(!savedCoins);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Sign in to save coins");
    }
  };

  const findCoin = coinData?.find((item) => item.id === coin.id);

  return (
    <tr key={coin.id}>
      <td
        onClick={saveCoin}
        className="whitespace-nowrap py-4 pl-2 pr-3  font-medium sm:pl-6 text-xl cursor-pointer"
      >
        {findCoin ? (
          <AiFillStar className="text-yellow-500" />
        ) : (
          <AiOutlineStar />
        )}
      </td>

      <td className="whitespace-nowrap py-4 pl-0 pr-3 text-sm font-medium sm:pl-6">
        {coin.market_cap_rank}
      </td>
      <td className="whitespace-nowrap  pl-0 pr-3 text-sm font-medium sm:pl-6">
        <Link className="hover:text-accent" to={`/coin/${coin.id}`}>
          <div className="flex">
            <div>
              <img
                src={coin.image}
                alt=""
                className="h-5 w-5 sm:h-10 sm:w-10 sm:p-2  "
              />
            </div>
            <div className="pt-[10px] ml-2 capitalize hidden font-bold lg:table-cell">
              {" "}
              {coin.name}
            </div>
          </div>
        </Link>
      </td>
      <td className="whitespace-nowrap py-4 pl-0 pr-3 text-sm font-medium sm:pl-6 uppercase">
        <Link className=" hover:text-accent" to={`/coin/${coin.id}`}>
          {coin.symbol}
        </Link>
      </td>
      <td className="whitespace-nowrap py-4 pl-0 pr-3 text-sm font-medium sm:pl-6">
        ${coin.current_price.toLocaleString()}
      </td>
      <td className="whitespace-nowrap py-4 pl-0 pr-3 text-sm font-medium sm:pl-6 ">
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-500">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-500">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 hidden lg:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6  hidden md:table-cell">
        {coin.market_cap.toLocaleString()}
      </td>
      <td className="py-4 pl-0 pr-3 text-sm font-medium sm:pl-6 w-40 object-cover">
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
}

export default Coin;
