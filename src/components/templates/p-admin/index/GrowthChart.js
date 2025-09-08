"use client";
import React from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function GrowthChart() {
    const data = [
        { name: "02/1/1", current: 4000, prev: 2400 },
        { name: "02/2/1", current: 4300, prev: 4000 },
        { name: "02/3/1", current: 5000, prev: 4300 },
        { name: "02/4/1", current: 3800, prev: 5000 },
        { name: "02/5/1", current: 4200, prev: 3800 },
        { name: "02/6/1", current: 3900, prev: 4200 },
    ];

    return (
        <div style={{ width: "100%", height: "350px" }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="prev" stroke="#ff0000" strokeWidth={2} />
                    <Line type="monotone" dataKey="current" stroke="#0000ff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GrowthChart;
