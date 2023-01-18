import CoinHeader from "./CoinHeader";
import Coin from "./Coin";
import Pageination from "./Pageination";

function SearchResults({ searchData, data, page, setPage }) {
  return (
    <div className="-mx-4 mt-0 md:p-4 overflow-hidden bg-primary sm:-mx-6 md:mx-0 md:rounded-lg p-4">
      <h2 className="text-xl font-bold pb-4">Crypto Currency</h2>
      <table className="min-w-full divide-y divide-gray-300 shadow">
        <CoinHeader />
        <tbody className="divide-y divide-txt-primary  bg-primary text-primary">
          {data
            .filter((value) => {
              if (searchData === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchData.toLowerCase())
              ) {
                return value;
              } else {
                return null;
              }
            })
            .slice((page - 1) * 10, page * 10)
            .map((coin) => (
              <Coin coin={coin} key={coin.id} />
            ))}
        </tbody>
      </table>
      <Pageination page={page} setPage={setPage} searchData={searchData} />
    </div>
  );
}

export default SearchResults;
