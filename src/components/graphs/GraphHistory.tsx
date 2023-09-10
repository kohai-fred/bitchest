import type { TransactionDataType } from "@src/types/transaction.type.ts";
import { useEffect, useState } from "react";
import { XAxis, YAxis } from "recharts";
import GraphBaseContainer from "./GraphBaseContainer.tsx";
import TooltipElHistory from "./TooltipElHistory.tsx";
import Dayjs from "dayjs";

type Props = {
  dataArray: TransactionDataType[];
};
type Transactions = Array<
  TransactionDataType & { quantityHistory?: number; date?: string }
>;

const GraphHistory = ({ dataArray }: Props) => {
  const dataKeyName = "quantityHistory";
  const [graphData, setGraphData] = useState<Transactions>();

  useEffect(() => {
    const transactions: Transactions = [...dataArray];
    transactions.reduce(
      (acc, transaction) => {
        const { quantity, type, created_at } = transaction;
        transaction.date = Dayjs(created_at).format("DD/MM");
        if (type === "buy") {
          acc.start += +quantity;
          transaction.quantityHistory = acc.start;
        } else {
          transaction.quantityHistory = 0;
          acc.start = 0;
        }
        return acc;
      },
      { start: 0, history: [] as number[] }
    );
    setGraphData(transactions);
  }, [dataArray]);

  return (
    <GraphBaseContainer
      areaDataKey={dataKeyName}
      dataArray={dataArray}
      tooltip={<TooltipElHistory />}
    >
      <XAxis dataKey="date" />

      <YAxis
        label={{
          value: "Quantité",
          angle: -90,
          position: "insideLeft",
        }}
        dataKey={dataKeyName}
      />
    </GraphBaseContainer>
  );
};

export default GraphHistory;
