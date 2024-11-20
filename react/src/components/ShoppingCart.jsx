// src/ShoppingCart.js
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ShoppingCart = () => {
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([
        { label: 'Songs You Wrote - Album', value: 39, quantity: 1 }
    ]);

    const total = cartItems.reduce((acc, item) => acc + item.value * item.quantity, 0);

    const footer = (
        <div style={styles.cartFooter}>
            <p>Total to Pay: {total} ₪</p>
            <Button label="Proceed to Payment" icon="pi pi-check" onClick={() => alert('Proceeding to payment')} />
        </div>
    )

    return (
        <div>
            <Button label="Show Cart" icon="pi pi-shopping-cart" onClick={() => setVisible(true)} />
            <Dialog header="Selected Albums" visible={visible} style={{ width: '30vw' }} footer={footer} onHide={() => setVisible(false)}>
                <ListBox value={cartItems} options={cartItems} optionLabel="label" itemTemplate={(item) => (
                    <div style={styles.cartItem}>
                        <div style={styles.itemDetails}>
                            <p>{item.label}</p>
                            <p>{item.value} ₪ × {item.quantity}</p>
                        </div>
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => setCartItems(cartItems.filter(cartItem => cartItem !== item))} />
                    </div>
                )} />
            </Dialog>
        </div>
    );
}

const styles = {
    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1em',
    },
    itemDetails: {
        flexGrow: 1,
        marginRight: '1em',
    },
    cartFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

export default ShoppingCart;
