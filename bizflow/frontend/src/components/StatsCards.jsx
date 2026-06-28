function StatsCards() {

    const cards = [

        {
            title: 'Total Products',
            value: '150',
            color: '#dbeafe',
            icon: '📦'
        },

        {
            title: 'Total Orders',
            value: '214',
            color: '#dcfce7',
            icon: '🛒'
        },

        {
            title: 'Low Stock',
            value: '12',
            color: '#fef3c7',
            icon: '⚠️'
        },

        {
            title: 'Out of Stock',
            value: '8',
            color: '#fee2e2',
            icon: '❌'
        },

        {
            title: 'Total Sales',
            value: '₹18,560',
            color: '#ede9fe',
            icon: '💰'
        }
    ];

    return (

        <div className="statsContainer">

    {cards.map((card, i) => (

        <div
            key={i}
            className="statCard"
        >

            <div
                className="iconBox"
                style={{ background: card.color }}
            >
                {card.icon}
            </div>

            <div className="statsContent">

                <p>{card.title}</p>

                <h2>{card.value}</h2>

            </div>

        </div>

    ))}

</div>

    );
}



export default StatsCards;