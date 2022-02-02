import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='login-parent'>
      <div className='row justify-content-center'>
        <div className='col-md-4 z1'>
          <div className='login-form'>
            <h2>login</h2>

            <hr />

            <input
              type='text'
              className='form-control'
              placeholder='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type='text'
              className='form-control'
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className='my-3'> login</button>

            <hr />

            <Link to='/register'>Click here to register</Link>
          </div>
        </div>

        <div className='col-md-5 z1'>
          <lottie-player
            src='https://assets10.lottiefiles.com/packages/lf20_6wutsrox.json'
            background='transparent'
            speed='1'
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className='login-bottom'></div>
    </div>
  );
}

export default LoginPage;
