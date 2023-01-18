import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { ThemeContext } from "../context/ThemeContext";

function LiveView() {
  const params = useParams();
  let navigate = useNavigate();
  let { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex min-h-8 content-cente p-4 textprimary">
        <button onClick={() => navigate(-1)}>
          <BsFillArrowLeftCircleFill className="h-8 w-8 text-[#283141] bg-white rounded-full border " />
        </button>
        <p className="ml-2 font-bold self-center">COINZY</p>
      </div>

      <div className="overflow-hidden h-[90vh] bg-primary text-primary">
        <AdvancedRealTimeChart
          autosize
          theme={theme}
          // eslint-disable-next-line react/style-prop-object
          style="3"
          symbol={`${params.id}USDT`}
        ></AdvancedRealTimeChart>
      </div>
    </>
  );
}

export default LiveView;
