import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Order, orders } from "@/data/orders";

const monthNames: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface SalesData {
  month: string;
  orders: number;
}

const mapDatesByMonth = (orders: Order[]): SalesData[] => {
  let orderData: SalesData[] = [];

  orders.forEach((order) => {
    const date = new Date(order.orderedOn ?? "");
    const month = date.toLocaleString("default", { month: "short" }); // Get the month name

    // Create a key for the month and year
    const key = `${month}`;

    if (orderData.some((order) => order.month)) {
      orderData = orderData.map((order) =>
        order.month === key ? { ...order, orders: order.orders + 1 } : order
      );
    } else {
      const newData: SalesData = { month: key, orders: 1 };
      orderData.push(newData);
    }
  });

  monthNames.forEach(month => {
    if (!orderData.some((order) => order.month == month)) {
      const newData: SalesData = { month: month, orders: 0 };
      orderData.push(newData);
    }
  })

  return orderData;
};

function getMonthsAgo(months: number): Date {
  const today = new Date();
  const lastMonth = new Date(today);

  // Subtract one month
  lastMonth.setMonth(today.getMonth() - months);

  return lastMonth;
}

export default function BarChartSet() {


  let lastYearsOrders = orders.results.filter(
    (order) => new Date(order.orderedOn ?? "") > new Date(getMonthsAgo(12))
  );

  let ordersPerMonth = mapDatesByMonth(lastYearsOrders);
  let labels = ordersPerMonth.map((data) => data.month);
  let values = ordersPerMonth.map((data) => data.orders);
  console.log(ordersPerMonth);

  let width = 1000;

  if (typeof window !== "undefined") {
    width = window.screen.width * 0.8
  }
  
  return (
    <BarChart
      series={[
        { data: values, label: "orders", id: "ordersId" },
      ]}
      xAxis={[{ data: labels, scaleType: "band" }]}
      width={width}
      height={width * 0.4}
    />
  );
}