/*
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '21437432952-sp1i8aon5a53reh7e92oh3a1qbb3vm1a.apps.googleusercontent.com';

const Auth = ({onLogin}) => {
  const responseGoogle = (response) => {
    if (response.tokenId) {
      // Send token to Flask backend for validation and user creation
      fetch('http://localhost:5000/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.tokenId }),
      })
        .then((res) => res.json())
        .then((data) => {
          
            if(data.error){
                console.error('Login error:', data.error);
                alert('Login failed. Please try again.');
            }else{
                console.log('Logged in as:', data);
                localStorage.setItem('user', JSON.stringify(data.user));
                onLogin();
            }
        });
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div>
      <GoogleLogin onSuccess={responseGoogle} onError={() => console.log('Login Failed')} />
    </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;*/