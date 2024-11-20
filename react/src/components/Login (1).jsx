import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { add } from '../axios/httpRequest';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Login(props) {   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', { username, password });

    try {
      const response = await add('/api/Auth/Login', { username, password });
      console.log('Response:', response);

      const token = response;
      if (token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userName = decodedToken.UserName 
        localStorage.setItem('username', userName);
        const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        localStorage.setItem('role',role)

        navigate('/');
      } else {
        setError('Login failed. Invalid token received.');
      }
    } catch (error) {
        debugger
      console.error('Error logging in:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-content-center">
      <Card title="Sign In" style={{ width: '25rem', marginTop: '2em' }}>
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
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              className={error ? 'p-invalid' : ''}
            />
          </div>

          {error && <Message severity="error" text={error} />}

          <Button type="submit" label="Sign In" className="mt-2" />
          
          <Button  label="Sign up" onClick={()=>navigate('/register')} className="mt-2" />

        </form>
      </Card>
    </div>
  );
}

export default Login;
