import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { get, remove, update } from '../axios/httpRequest';
import { useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import Bar from './Bar';
import Payment from './Payment';

function Cart(props) {
    const [products, setProducts] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            props.updateQuantity()
            const response = await get(`api/Cart`);
            console.log('API Response:', response);
            if (Array.isArray(response)) {
                setProducts(response);
                setCartQuantity(response.length);
                calculateTotalPrice(response);
            } else {
                console.error('Expected an array of products, got:', response);
                setProducts([]);
                setCartQuantity(0);
                setTotalPrice(0);
                setError('Cart is empty.');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setError('Error fetching cart data.');
        }
    };

    const calculateTotalPrice = (products) => {
        let totalPrice = 0;
        products.forEach((product) => {
            totalPrice += product.gift.price * product.quantity;
        });
        setTotalPrice(totalPrice);
    };

    const reduce = async (giftId) => {
        await update(`api/Cart/Reduce/${giftId}`);
        getAll();
    };

    const increas = async (giftId) => {
        await update(`api/Cart/Increas/${giftId}`);
        getAll();
    };

    const removeProduct = async (giftId) => {
        await remove(`api/Cart/${giftId}`);
        getAll();
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id} data-pr-position="center">
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-6rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:5281/api/File/get/${product.gift.picture}`}  alt={product.name} data-pr-position="center" />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.gift.name}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.gift.price}</span>
                            <div className="p-d-flex p-ai-center p-jc-center" style={{ gap: '0.5rem' }}>
                                <Button
                                    icon="pi pi-minus"
                                    onClick={() => reduce(product.gift.id)}
                                    className="p-button-rounded p-button-primary p-button-text"
                                    style={{ width: '2rem', height: '2rem' }}
                                />
                                <InputText
                                    value={product.quantity}
                                    placeholder="1"
                                    style={{ width: '5rem', height: '2rem', textAlign: 'center', fontSize: '1rem', marginLeft: '10px', marginRight: '10px' }}
                                    inputStyle={{ height: '2rem', lineHeight: '2rem', padding: '0.5rem' }}
                                    min={1}
                                />
                                <Button
                                    icon="pi pi-plus"
                                    onClick={() => increas(product.gift.id)}
                                    className="p-button-rounded p-button-primary p-button-text"
                                    style={{ width: '2rem', height: '2rem' }}
                                />
                                <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => removeProduct(product.gift.id)} style={{ marginLeft: '10px' }}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <>
            {error ? (
                <div className="text-center my-4">{error}</div>
            ) : (
                <>
                    <div className="card" style={{ width: '50%', marginRight: '50px' }}>
                        <DataView value={products} listTemplate={listTemplate} paginator rows={5} />
                    </div>
                    {products.length > 0 && (
                        <div className=" mt-4">
                            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                        </div>
                    )}
                    <Payment getAll={getAll} price={totalPrice} updateQuantity={props.updateQuantity}></Payment>
                </>
            )}
        </>
    );
}

export default Cart;

