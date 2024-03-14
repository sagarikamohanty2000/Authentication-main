import React,{useRef,useContext} from 'react';
import {useHistory}  from 'react-router-dom';
import AuthContext from '../Store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const passwordRef = useRef();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    const newPassword = passwordRef.current.value;

    try{
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCRV_pMlgg9YkB23h8BAghdxFtTTaHpd1M', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: newPassword,
        returnSecureToken:false
      }),
      header: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok)
    {
      const data = await response.json();
      console.log(data);
      throw new Error(data.error.message);
    }

    else{
    history.replace('/');
    }
  }

catch(error){
 alert(error);
 
}
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
