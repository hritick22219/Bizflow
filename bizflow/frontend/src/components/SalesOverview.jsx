import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { day: 'Mon', sales: 3000 },
    { day: 'Tue', sales: 5000 },
    { day: 'Wed', sales: 4500 },
    { day: 'Thu', sales: 7000 },
    { day: 'Fri', sales: 6000 },
    { day: 'Sat', sales: 9000 }
];

function SalesOverview() {

    return (

        <div>

            <h2>📈 Sales Overview</h2>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data}>

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="sales"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default SalesOverview;