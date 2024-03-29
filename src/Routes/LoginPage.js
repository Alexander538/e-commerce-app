import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const auth = getAuth();

function LoginPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('currentUser', JSON.stringify(result));
      setLoading(false);
      toast.success('Login Successful!');
      window.location.href = '/'
    } catch (error) {
      toast.error('Login Failed');
      setLoading(false);
    }
  };

  return (
    <div className='login-parent'>
      {loading && <Loader />}
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

            <button className='my-3' onClick={login}>
              {' '}
              login
            </button>

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
