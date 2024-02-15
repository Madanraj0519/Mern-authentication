import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value });
  };

  // console.log(formData);
 
  // why Adding Async means bcoz, we are  waiting for the data to be added to the database. This takes a some time
  const handleSubmit = async(e) => {
    e.preventDefault();  /* this will prevent refreshing the page when we submit the form*/ 

    try{
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      setLoading(false);
      if(data.success === false){
        setError(true);
        setErrorMessage(data.message);
      }
      navigate('/sign-in');
    }catch(e){
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div  className='max-w-lg mx-auto pt-2'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='User Name' id='userName' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='User Email' id='userEmail' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange} />
        <input type='password' placeholder='User Password' id='userPassword' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have a account?</p>
        <Link to={'/sign-in'}>
           <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error && errorMessage}</p>
    </div>
  )
}

export default SignUp