import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setLoading(false);
      toast.success('Registration Success!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Registration Failed');
      setLoading(false);
    }
  };

  return (
    <div className='register-parent'>
      {loading && <Loader />}
      <div className='register-top'></div>
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
            <input
              type='text'
              className='form-control'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <button className='my-3' onClick={register}>
              {' '}
              register
            </button>

            <hr />

            <Link to='/login'>Click here to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
