export type PayloadType<T> = {
  chartType: undefined;
  color: string;
  dataKey: string;
  fill: string;
  fillOpacity: number;
  formatter: undefined;
  name: string;
  payload: T;
  stroke: string;
  type: undefined;
  unit: undefined;
  value: string;
};

export type TooltipElType<T> = {
  active?: boolean;
  label?: string;
  payload?: PayloadType<T>[];
};
