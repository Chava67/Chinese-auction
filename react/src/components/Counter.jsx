import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/saga-blue/theme.css';  // ניתן לבחור תבנית אחרת
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';

const Counter = () => {
    const [value, setValue] = useState(1);

    return (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ gap: '0.5rem' }}>
            <Button
                icon="pi pi-minus"
                onClick={() => { if (value > 1) setValue(value - 1) }}
                className="p-button-rounded p-button-primary p-button-text"
                style={{ width: '2rem', height: '2rem' }}
            />
            <InputText
                value={value}
                onValueChange={(e) => setValue(e.value)}
                style={{ width: '2rem', height: '2rem', textAlign: 'center', fontSize: '1rem', margin: '10' }}
                inputStyle={{ height: '2rem', lineHeight: '2rem', padding: '0.5rem' }}
                placeholder="1"
                min={1}  // כאן נוסיף את ההגבלה
            />
            <Button
                icon="pi pi-plus"
                onClick={() => setValue(value + 1)}
                className="p-button-rounded p-button-primary p-button-text"
                style={{ width: '2rem', height: '2rem', margin: '10' }}
            />
        </div>
    );
};

export default Counter;
