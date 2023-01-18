import React from "react";

function CoinHeader() {
  return (
    <thead className="bg-primary">
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold sm:pl-6"
        ></th>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold sm:pl-6"
        >
          #
        </th>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold  sm:pl-6"
        >
          Coin
        </th>

        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold sm:pl-6"
        ></th>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold  sm:pl-6"
        >
          Price
        </th>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold  sm:pl-6"
        >
          24h
        </th>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6 hidden lg:table-cell"
        >
          24h Volume{" "}
        </th>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold 0 sm:pl-6  hidden md:table-cell"
        >
          MKT
        </th>
        <th
          scope="col"
          className="py-3.5 pl-0 pr-3 text-left text-sm font-semibold sm:pl-6 "
        >
          L7D
        </th>
      </tr>
    </thead>
  );
}

export default CoinHeader;
