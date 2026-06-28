function InventoryExpiry() {

    const items = [
        { name: 'Milk', days: 2 },
        { name: 'Bread', days: 1 },
        { name: 'Cheese', days: 5 },
        { name: 'Butter', days: 3 }
    ];

    return (

        <div className="panel expiryPanel">

            <div className="panelHeader">
                <h2>⚠️ Inventory Expiry</h2>
            </div>

            {
                items.map((item, index) => (

                    <div
                        key={index}
                        className="expiryItem"
                    >
                        <span>{item.name}</span>

                        <span className="expiryDays">
                            Expires in {item.days} days
                        </span>

                    </div>

                ))
            }

        </div>

    );
}

export default InventoryExpiry;