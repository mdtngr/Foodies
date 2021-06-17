import React, {useState}from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));


// Handles
const apiUrl ="http://localhost:3001";
const ORIGIN = "http://localhost:3000";

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [ORIGIN];
    const token = localStorage.getItem('token');
    console.log("THIS IS TOKEN");
    console.log(token);
    if (allowedOrigins.includes(origin)) {
      console.log(`stored token= ${token}`);
      config.headers.authorization  = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



const LoginForm = ({ handleClose }) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();


   const storedJwt = localStorage.getItem('token');
    const [jwt, setJwt] = useState(storedJwt || null);
    // const [foods, setFoods] = useState([]);
    // const [fetchError, setFetchError] = useState(null);

// Handles action to be performed on submit
  const onSubmit = data => {
    axios.post(`${apiUrl}/auth/login`, {

          email: data.email,
          password: data.password

      }).then((response) => {

        console.log(response.data);
        localStorage.setItem('token', response.data);
        setJwt(data.token);

        }, (error) => {
          console.log(error);
});
};

function getAllData (){
  const allData = axios.get(`${apiUrl}/users/allData`)
  .then((response) => {
    console.log(response);
  })
  .catch((err)=>{
    console.log(err);
  });

  console.log(allData);
  console.log(jwt);
}

  return (
    <>
     <button onClick={() => getAllData()}>
          Get All user Data
        </button>

    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
          />
        )}
        rules={{ required: 'Email required' }}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Password"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="password"
          />
        )}
        rules={{ required: 'Password required' }}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
    </>
  );
};

export default LoginForm;