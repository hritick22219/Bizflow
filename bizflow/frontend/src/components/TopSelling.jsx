function TopSelling() {

    const products = [

        { name: 'Milk', orders: 45 },

        { name: 'Bread', orders: 32 },

        { name: 'Oil', orders: 28 },

        { name: 'Rice', orders: 21 },

        { name: 'Cheese', orders: 13 }
    ];

    return (

        <div className="panel">

            <div className="panelHeader">

                <h2>Top Selling Products</h2>

                <span>View All</span>

            </div>

            {products.map((item, index) => (

                <div key={index}>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >

                        <p>{item.name}</p>

                        <p>{item.orders} orders</p>

                    </div>

                    <progress
                        value={item.orders}
                        max="50"
                        style={{ width: '100%' }}
                    />

                </div>

            ))}

        </div>
    );
}

export default TopSelling;