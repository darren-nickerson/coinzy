import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((item) => item.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {coins?.length === 0 ? (
        <p className="mt-4 pl-4 text-md">
          You don't have any coins saved.
         <Link className="text-accent pl-2" to="/">Click here to search coins.</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-10">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="relative flex items-center space-x-3 rounded-lg border  px-6 py-5  bg-primary border-secondary shadow-xl"
            >
              <div className="flex-shrink">
                <img
                  className="h-10 w-10 rounded-full"
                  src={coin?.image}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex grow justify-between">
                <Link to={`/coin/${coin.id}`}>
                  <p className="text-sm font-bold text-primary">{coin.name}</p>
                </Link>
                <p className="truncate   self-center text-xl font-bold">
                  <RiDeleteBin5Line
                    onClick={() => deleteCoin(coin.id)}
                    className="cursor-pointer  text-gray-500"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCoin;
