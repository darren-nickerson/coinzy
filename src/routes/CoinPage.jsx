import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { ImSpinner } from "react-icons/im";
import Footer from "../components/Footer";
import { MdShowChart } from "react-icons/md";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function CoinPage() {
  const params = useParams();
  let navigate = useNavigate();

  const url = `https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&sparkline=true
  `;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coin", params.id],
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="page flex justify-center items-start">
        <p className="text-5xl text-accent font-extrabold">
          <ImSpinner className="spin  animate-spin" />
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
    <>
      <div className="flex min-h-8 content-cente p-4  bg-secondary shadow-lg">
        <button onClick={() => navigate(-1)}>
          {" "}
          <BsFillArrowLeftCircleFill className="h-8 w-8 text-[#283141] bg-white rounded-full border " />
        </button>
        <p className="ml-2 font-bold self-center">COINZY</p>
      </div>

      <div className="page mb-10">
        <div className="flex">
          <img className="h-8 w-8" src={data.image?.large} alt="" />
          <div className="flex self-center ml-4">
            <p className="text-2xl font-bold self-center"> {data?.name} </p>
            <p className="self text-lg -center mt-1 ml-2 uppercase text-accent">
              {data?.symbol}
            </p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className="text-4xl font-bold mt-2">
                $
                {data?.market_data.current_price.usd.toLocaleString({
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-primary text-xs mt-2">
                Last Updated:{" "}
                {moment(data.last_updated).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <Link
                className="hover:text-accent flex justify-end"
                to={`/liveview/${data.symbol}`}
              >
                <button className="text-accent text-md px-6 rounded-xl bg-secondary py-2 mt-4 flex">
                  <MdShowChart className="mr-2 self-center text-xl" /> Full
                  Featured Chart{" "}
                </button>
              </Link>
            </div>
            <div className="my-10 transition">
              <Sparklines data={data.market_data.sparkline_7d.price}>
                <SparklinesLine color="teal" />
              </Sparklines>
              <span className="float-right text-xs text-accent mr-4">
                Last 7 days chart
              </span>
            </div>
            <div className="grid grid-cols-5 bg-primary text-xs">
              <div className="bg-primary grow">
                <div className="bg-secondary border text-center p-1">24hr</div>
                <div className="bg-primary p-3 border border-t-0 text-center">
                  {data.market_data.price_change_percentage_24h > 0 ? (
                    <p className="text-green-500">
                      {data.market_data.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.market_data.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}{" "}
                </div>
              </div>
              <div className="bg-primary grow">
                <div className="bg-secondary border text-center p-1">7d</div>
                <div className="bg-primary p-3 border border-t-0 text-center">
                  {data.market_data.price_change_percentage_7d > 0 ? (
                    <p className="text-green-500">
                      {data.market_data.price_change_percentage_7d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.market_data.price_change_percentage_7d.toFixed(2)}%
                    </p>
                  )}{" "}
                </div>
              </div>
              <div className="bg-primary grow">
                <div className="bg-secondary border text-center p-1">14d</div>
                <div className="bg-primary p-3 border border-t-0 text-center">
                  {data.market_data.price_change_percentage_14d > 0 ? (
                    <p className="text-green-500">
                      {data.market_data.price_change_percentage_14d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.market_data.price_change_percentage_14d.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-primary grow">
                <div className="bg-secondary border text-center p-1">30d</div>
                <div className="bg-primary p-3 border border-t-0 text-center">
                  {data.market_data.price_change_percentage_30d > 0 ? (
                    <p className="text-green-500">
                      {data.market_data.price_change_percentage_30d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.market_data.price_change_percentage_30d.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
              <div className=" w-full bg-primary grow">
                <div className="bg-secondary border text-cente  sm:mt-0 text-center p-1 ">
                  1 year
                </div>
                <div className="bg-primary p-3 border border-t-0 text-center">
                  {data.market_data.price_change_percentage_1y > 0 ? (
                    <p className="text-green-500">
                      {data.market_data.price_change_percentage_1y.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-red-500">
                      {data.market_data.price_change_percentage_1y.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="mt-10 mb-4 text-2xl font-bold">Details</h3>
              <p
                className="prose-lg"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.description.en.split(". ")),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CoinPage;
