
import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

const CreditCardForm = () => {
  return (
    <Card title="Credit Card Details">
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cardNumber">Card Number</label>
          <InputText id="cardNumber" />
        </div>
        <div className="p-field">
          <label htmlFor="expiration">Expiration Date</label>
          <InputText id="expiration" />
        </div>
        <div className="p-field">
          <label htmlFor="cvv">CVV</label>
          <InputText id="cvv" />
        </div>
      </div>
    </Card>
  );
};

export default CreditCardForm;

