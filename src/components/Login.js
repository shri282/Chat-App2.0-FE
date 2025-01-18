import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "../config/axios";
import "../styles/signup.css";
import Toster from "../ui components/Toster";

function Login() {
  
  const { register, handleSubmit, control, formState, setValue } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const [toster, setToster] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  
  const handleClose = () => {
    setToster({
      open: false,
      severity: "success",
      message: "",
    });
  };

  const onSubmit = (data) => {
    const { email, password } = data; 
    if(!email || !password) {
      setToster({
        open: true,
        severity: "error",
        message: "All fields are required",   
      });
      return;
    }
    
    axios.get("/api/users/login", { 
      params: { email, password },
     })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.token);
      setToster({
        open: true,
        severity: "success",
        message: "User logged in successfully",
      });
      navigate("/chats");
    })
    .catch((error) => {
      setToster({
        open: true,
        message: error.message,
      });
    });
  };
  
  return (
    <>
      <div className="formcontainer">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ display: "flex", flexDirection: "column" }}
          >

          <div className="form-fields">
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="form-fields">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              {...register("password")}
              />
            <p className="error">{errors.password?.message}</p>
          </div>

          <button type="submit">Login</button>
          <button className="guestbtn" type="button" style={{backgroundColor:'red', marginTop:'3px', ':hover':{backgroundColor:'yellow'}}} onClick={() => 
            { 
              setValue('email','guest@gmail.com'); 
              setValue('password','guest1234');
            }
          }
          onMouseEnter={(e) => {e.target.style.backgroundColor = 'darkred'}}
          onMouseLeave={(e) => {e.target.style.backgroundColor = 'red'}}
          >Get guest user credentials</button>
          <DevTool control={control} />
        </form>
      </div>
      {
        toster.open && (<Toster Toster={toster} handleClose={handleClose} />)
      }
   </>
  )
}

export default Login