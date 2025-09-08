"use client";
import React from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function SaleChart() {
    const data = [
        { date: "02/1/1", sale: 2000 },
        { date: "02/1/2", sale: 3000 },
        { date: "02/1/3", sale: 3800 },
        { date: "02/1/4", sale: 2900 },
        { date: "02/1/5", sale: 4000 },
        { date: "02/1/6", sale: 3500 },
    ];

    return (
        <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="sale"
                        stroke="#711D1C"
                        fill="#711D1C"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SaleChart;

