import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='register-parent'>
      <div className='register-top'>

      </div>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <lottie-player
            src='https://assets10.lottiefiles.com/packages/lf20_hu9cd9.json'
            background='transparent'
            speed='1'
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className='col-md-4 z1'>

          <div className='register-form'>

            <h2>Register</h2>

            <hr />

            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='confirm password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

            <button className='my-3'> register</button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
