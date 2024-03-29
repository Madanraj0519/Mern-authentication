import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector( state => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value });
  };

  // console.log(formData);
 
  // why Adding Async means bcoz, we are  waiting for the data to be added to the database. This takes a some time
  const handleSubmit = async(e) => {
    e.preventDefault();  /* this will prevent refreshing the page when we submit the form*/ 

    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if(data.success === false){
        dispatch(signInFailure(data));
      }else{
        navigate('/');
        dispatch(signInSuccess(data));
      }
    }catch(e){
      dispatch(signInFailure(error));
    }
  };

  return (
    <div  className='max-w-lg mx-auto pt-2'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text-' placeholder='User Email' id='userEmail' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange} />
        <input type='password' placeholder='User Password' id='userPassword' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading' : 'Sign In'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have a account?</p>
        <Link to={'/sign-up'}>
           <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? error.message || 'something went wrong' : ''}</p>
    </div>
  )
}

export default SignIn