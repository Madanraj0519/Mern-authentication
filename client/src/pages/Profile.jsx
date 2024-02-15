import React, { useRef, useState, useEffect } from 'react'
import {useSelector} from "react-redux"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {app} from "../firebase"

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const {currentUser} = useSelector(state => state.user);
  
  useEffect(() => {
    if(image){
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async(image) => {
    // console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) + 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(
          (downloadURL) => {
            setFormData({ ...formData, userPhoto : downloadURL});
          });
      }   
      );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>User Profile</h1>
        <form className='flex flex-col gap-4'> 
          <input type='file' ref={fileRef} 
           hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
          <img src={formData.userPhoto || currentUser.userPhoto} 
           alt='profile'
           className='h-24 w-24 self-center cursor-pointer
           rounded-full object-cover mt-2'
           onClick={() => fileRef.current.click()}/>
           <p className='self-center text-sm'>
            {
              imageError ? 
              ( <span className='text-red-700'>Error Uploading image (file size must be less than 2 MB)</span>)
              : imagePercentage > 0 && imagePercentage < 100 ? 
              ( <span className='text-slate-700'>{`Uploading : ${imagePercentage}%`}</span>)
              : imagePercentage === 100 ? 
              (<span className='text-green-700+'>Image uploaded successfully</span>) : ''
            }
           </p>
           <input type='text' 
           defaultValue={currentUser.userName}
           placeholder='Username' id='userName'
           className='bg-slate-100 rounded-lg p-3'/>
           <input type='email' 
           defaultValue={currentUser.userEmail}
           placeholder='UserEmail' id='userEmail'
           className='bg-slate-100 rounded-lg p-3'/>
           <input type='password' 
          //  defaultValue={currentUser.password}
           placeholder='UserPassword' id='userPassword'
           className='bg-slate-100 rounded-lg p-3'/>
           <button className='bg-slate-700 text-white 
           p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Update
           </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default Profile