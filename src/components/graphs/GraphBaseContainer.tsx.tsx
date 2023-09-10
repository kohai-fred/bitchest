import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useTheme } from "@mui/material";
import { customColors } from "@src/themes/customColors";
import { CotationType } from "@src/types/cryptos";
import { TransactionDataType } from "@src/types/transaction.type";
import { stringToHexColor } from "@src/utils/stringToHexColor";
import Dayjs from "dayjs";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props<T> = {
  dataArray: Array<T>;
  areaDataKey: string;
  tooltip?: ReactJSXElement;
};

const GraphBaseContainer = <T,>({
  dataArray,
  areaDataKey,
  tooltip,
  children,
}: PropsWithChildren<Props<T>>) => {
  const theme = useTheme();
  let areaColor = useRef(theme.palette.primary.main);
  const bitchestColor = customColors.bitchest.main;

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataArray}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={`${areaColor.current}`}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={`${areaColor.current}`}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          {tooltip && (
            <Tooltip
              cursor={{ stroke: "red", strokeWidth: 1 }}
              animationEasing="ease-in-out"
              content={tooltip}
            />
          )}
          {children}
          <Area
            type="monotone"
            dataKey={areaDataKey}
            stroke={areaColor.current}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default GraphBaseContainer;
