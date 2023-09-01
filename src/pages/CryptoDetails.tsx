import { Box, Typography, useTheme } from "@mui/material";
import { getCryptoDetails } from "@src/services/cryptos";
import { customColors } from "@src/themes/customColors";
import { CotationType } from "@src/types/cryptos";
import { useQuery } from "@tanstack/react-query";
import Dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Cotations = {
  data: CotationType[];
  maxValue: number;
  minValue: number;
  average: string;
};

const CryptoDetails = () => {
  const theme = useTheme();
  const areaColor = theme.palette.primary.main;
  const bitchestColor = customColors.bitchest.main;
  const { id } = useParams();
  const [cotations, setCotations] = useState<Cotations>({
    data: [],
    maxValue: 0,
    minValue: 0,
    average: "0",
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`crypto-detail`, id],
    queryFn: () => getCryptoDetails(id ?? ""),
    staleTime: 60_000,
    enabled: !!id,
  });

  useEffect(() => {
    if (!data) return;
    const prices = data.cotations.map((cotation) => parseFloat(cotation.price));
    const average = (
      prices.reduce((acc, price) => acc + price, 0) / prices.length
    ).toFixed(2);
    setCotations((prev) => ({
      ...prev,
      average,
      maxValue: +(Math.max(...prices) * 1.5).toFixed(2),
      data: data.cotations.map((cotation) => {
        return {
          ...cotation,
          timestamp: Dayjs(cotation.timestamp).format("DD/MM"),
        };
      }),
    }));
  }, [data]);

  return (
    <>
      <Box pl={4} mb={4}>
        <Typography variant="h1">
          {data?.cryptocurrency.name}{" "}
          <Typography variant="caption" fontSize="1rem">
            ( {data?.cryptocurrency.symbol} )
          </Typography>{" "}
        </Typography>
        <Typography my={4}>
          Cours de la crypto monnaie sur les 30 derniers jours.
        </Typography>
      </Box>
      <Box height="800px" width="90vw">
        {cotations.data.length > 0 && (
          <ResponsiveContainer width="100%" height="50%">
            <AreaChart
              data={cotations.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`${areaColor}`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`${areaColor}`}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" />
              <YAxis
                // tick={{ stroke: bitchestColor }}
                label={{
                  value: "Cotations",
                  angle: -90,
                  position: "insideLeft",
                }}
                unit="€"
                dataKey={"price"}
                domain={[0, cotations.maxValue]}
              />
              {/* <CartesianGrid strokeDasharray="1 1" /> */}
              <Tooltip />
              <ReferenceLine
                y={(cotations.maxValue / 1.5).toFixed(2)}
                stroke={bitchestColor}
                strokeDasharray="3 3"
                isFront
              >
                <Label
                  value={`${(cotations.maxValue / 1.5).toFixed(2)} €`}
                  offset={20}
                  position="insideBottomLeft"
                />
              </ReferenceLine>
              <ReferenceLine
                y={cotations.average}
                stroke={theme.palette.primary.dark}
                strokeDasharray="3 3"
                isFront
              >
                <Label
                  value={`Moyenne : ${cotations.average} €`}
                  offset={20}
                  position="bottom"
                />
              </ReferenceLine>
              <Area
                type="monotone"
                dataKey="price"
                stroke={`${areaColor}`}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </>
  );
};

export default CryptoDetails;
