import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import styled from 'styled-components';

const CreditCardInput = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }
    setCardNumber(formatCardNumber(value));
  };

  const formatCardNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
  };

  return (
    <>
       <span className="text-2xl font-semibold">${props.price}</span>

      <InputContainer>
        <Label htmlFor="cardNumber">Card Number</Label>
        <IconWrapper>
          <i className="pi pi-credit-card" />
          <StyledInputText
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19" // 16 digits + 3 spaces
          />
        </IconWrapper>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <IconWrapper>
          <i className="pi pi-calendar" />
          <StyledInputMask
            id="expiryDate"
            mask="99/99"
            value={expiryDate}
            placeholder="MM/YY"
            onChange={(e) => setExpiryDate(e.value)}
          />
        </IconWrapper>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="cvv">CVV</Label>
        <IconWrapper>
          <i className="pi pi-lock" />
          <StyledInputText
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength="3"
          />
        </IconWrapper>
      </InputContainer>
      {/* <ButtonContainer>
        <Button label="Submit" icon="pi pi-check" />
      </ButtonContainer> */}
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const InputContainer = styled.div`
  margin: 10px 0;  // צמצום המרווח בין השדות
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;  // רווח קטן מתחת לכותרת
  font-size: 14px;
  font-weight: bold;
`;

const IconWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  i {
    position: absolute;
    left: 10px; // רווח בין האייקון לשמאל התיבה
    font-size: 1.2em; // גודל האייקון
  }
`;

const StyledInputText = styled(InputText)`
  width: 100%;
  padding-left: 35px; // רווח בתוך התיבת טקסט אחרי האייקון
  padding-right: 10px; // רווח בתוך התיבת טקסט בצד ימין
`;

const StyledInputMask = styled(InputMask)`
  width: 100%;
  padding-left: 35px; // רווח בתוך התיבת טקסט אחרי האייקון
  padding-right: 10px; // רווח בתוך התיבת טקסט בצד ימין
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export default CreditCardInput;
