function InventoryExpiry() {

    const items = [
        { name: 'Milk', days: 2 },
        { name: 'Bread', days: 1 },
        { name: 'Cheese', days: 5 },
        { name: 'Butter', days: 3 }
    ];

    return (

        <div>

            <h2>⚠ Inventory Expiry</h2>

            {items.map((item, index) => (

                <div
                    key={index}
                    style={styles.item}
                >

                    <span>{item.name}</span>

                    <span style={{ color: 'orange' }}>
                        Expires in {item.days} days
                    </span>

                </div>

            ))}

        </div>
    );
}

const styles = {

    item: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '14px 0',
        borderBottom: '1px solid #e2e8f0'
    }
};

export default InventoryExpiry;