import { CotationType } from "@src/types/cryptos";
import GraphBaseContainer from "./GraphBaseContainer.tsx";
import {
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
  Area,
  XAxis,
} from "recharts";
import TooltipElCotation from "./TooltipElCotation.tsx";
import { customColors } from "@src/themes/customColors.ts";
import Dayjs from "dayjs";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material";

type Props = {
  dataArray: CotationType[] & { date?: string };
};
type GraphType = {
  data: Array<CotationType>;
  maxValue: number;
  average: string;
};
const GraphCotation = ({ dataArray }: Props) => {
  const theme = useTheme();
  let areaColor = useRef(theme.palette.primary.main);
  const bitchestColor = customColors.bitchest.main;
  const [graphData, setGraphData] = useState<GraphType>({
    data: [],
    maxValue: 0,
    average: "",
  });

  useEffect(() => {
    if (!dataArray) return;
    const prices = dataArray.map((data) => parseFloat(data.price));
    const average = (
      prices.reduce((acc, price) => acc + price, 0) / prices.length
    ).toFixed(2);
    setGraphData((prev) => ({
      ...prev,
      average,
      maxValue: +(Math.max(...prices) * 1.5).toFixed(2),
      data: dataArray.map((data) => {
        return {
          ...data,
          date: Dayjs(data.created_at).format("DD/MM"),
          created_at: Dayjs(data.created_at).format("DD-MM-YYYY[ ]HH:MM"),
        };
      }),
    }));
  }, [dataArray]);
  return (
    <GraphBaseContainer
      tooltip={<TooltipElCotation />}
      dataArray={graphData.data}
      areaDataKey="price"
    >
      <XAxis dataKey="date" />
      <YAxis
        // tick={{ stroke: bitchestColor }}
        label={{
          value: "Cotations",
          angle: -90,
          position: "insideLeft",
        }}
        unit="€"
        dataKey={"quantityHistory"}
        domain={[0, graphData.maxValue]}
      />
      {/* <CartesianGrid strokeDasharray="1 1" /> */}
      <Legend
        verticalAlign="top"
        height={36}
        payload={[
          { value: "Max", type: "line", color: bitchestColor },
          {
            value: "Moyenne",
            type: "line",
            // color: theme.palette.primary.dark,
            color: "orange",
          },
        ]}
      />
      <ReferenceLine
        y={(graphData.maxValue / 1.5).toFixed(2)}
        stroke={bitchestColor}
        strokeDasharray="3 3"
        isFront
      >
        <Label
          value={`${(graphData.maxValue / 1.5).toFixed(2)} €`}
          offset={20}
          position="insideBottomRight"
          fill={bitchestColor}
        />
      </ReferenceLine>
      <ReferenceLine
        y={graphData.average}
        stroke="orange"
        strokeDasharray="3 3"
        isFront
      >
        <Label
          value={`${graphData.average} €`}
          offset={20}
          position="insideBottomLeft"
          fill="orange"
          // position="bottom"
        />
      </ReferenceLine>
    </GraphBaseContainer>
  );
};

export default GraphCotation;
