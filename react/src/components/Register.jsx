import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { add } from '../axios/httpRequest';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', { username, password, firstName, lastName, phone, mail });

    if (!username || !password || !firstName || !lastName || !phone || !mail) {
      setError('Please fill in all fields.');
      return;
    }

    try {
        const registerResponse = await add('/api/Auth/Register', { username, password, firstName, lastName, phone, mail });
        console.log('Registration response:', registerResponse);
        navigate('/login');
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          console.log('Registration error:', status, data); // פרטי השגיאה מהשרת
          if (status === 500 ) {
            setError('Username already exists. Please choose another one.');
          } else {
            setError('Registration failed. Please try again later.');
          }
        } else {
          console.error('Error registering:', error);
          setError('Registration failed. Please try again.');
        }
      }
      
  };

  return (
    <div className="flex justify-content-center">
      <Card title="Register" style={{ width: '25rem', marginTop: '2em' }}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <InputText
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <InputText
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={mail}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'p-invalid' : ''}
            />
          </div>

          {error && <Message severity="error" text={error} />}

          <Button type="submit" label="Register" className="mt-2" />
        </form>
      </Card>
    </div>
  );
}

export default Register;
