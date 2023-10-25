import React, { useEffect,useState,useRef } from "react";
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
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getFreshModel = () => ({
  name: "",
  email: "",
  contactNo: "",
  password: "",
});

export default function Registration() {
  const { context, setContext, resetContext } = useStateContext();
  const { values, setValues,errors, setErrors, handleInputChange } =
  useForm(getFreshModel);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

 useEffect(() => {
    resetContext();
  }, []);

  const register = (e) => {
    e.preventDefault();
    if (validate())
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.participantId });
          toast.success("You are Registered successfully")
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name != "" ? "" : "This field is required.";
    temp.contactNo = /^[0-9\b\+\-\(\)]+$/.test(values.contactNo)
      ? ""
      : "Contact No is not valid.";
    temp.password = values.password != "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };

 return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Registration
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={register}>
              <ToastContainer/>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && { error: true, helperText: errors.name })}
              />

              <TextField
                label="Contact No"
                name="contactNo"
                value={values.contactNo}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.contactNo && {
                  error: true,
                  helperText: errors.contactNo,
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
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>

            
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
