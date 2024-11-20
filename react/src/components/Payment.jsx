
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CreditCardInput from "./CreditCardInput";
import { add, update } from "../axios/httpRequest";
import { navigate, useNavigate } from "react-router-dom";

export default function Payment(props) {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const pay=async()=>{
        await add(`/api/Purchase`)
        props.updateQuantity()
        navigate('/');
        setVisible(false)
    }
    const footerContent = (
        <div>
            <Button label="cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="pay" icon="pi pi-check" onClick={() => pay()} autoFocus />
        </div>
    );

    return (
        <>
            <Button label="Check Out" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header="Check Out" visible={visible} style={{ width: '30vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
            <CreditCardInput price={props.price}></CreditCardInput>
            </Dialog>
        </>
    )
}
        