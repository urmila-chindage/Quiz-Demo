import React, { useEffect,useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import { Link,useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getFreshModel = () => ({
  email: "",
  password: "",
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [allRecords,setAllRecords] = useState([]);

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  
  const getAllRecords = async() => {
    createAPIEndpoint(ENDPOINTS.participant)
      .fetch() 
        .then((res) => {
          setAllRecords(res.data)
          console.log(res.data)
        })
  }

  useEffect(() => {
    resetContext();
    getAllRecords();
  }, []);


  const login = () => {
   if (validate()) {
    let isDuplicate = false;
    const temp = [...context.email]
        temp.push({
            email:values.email
           
        })
    allRecords.forEach((val) => {
      if (val.email === values.email && val.password === values.password) {
            isDuplicate = true;
            setContext({ participantId: val.participantId })
            toast.success("You are Logged In successfully!!")
            navigate("/quiz")
        }
  })
  if (!isDuplicate) {
       toast.error("You are Unauthorized")
      }
    }
  }

  const validate = () => {
    let temp = {};
    temp.email = (/\S+@\S+\.\S+/).test(values.email)
      ? ""
      : "Email is not Valid.";
    temp.password = values.password != "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Login
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off">
              <ToastContainer/>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'} 
                value={values.password}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
                InputProps={{ 
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                onClick = {()=>login()}
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
            <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={Link}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
            </Typography>
           
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
