import React from "react";
import "../styles/signup.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function SignUp() {
  const { register, handleSubmit, control, formState, watch } = useForm();
  const { errors } = formState;
  const [toster, setToster] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });

  const onSubmit = (data) => {
    const { username, email, password, upload } = data;

    if(!username || !email || !password) {
      setToster({
        open: true,
        severity: "error",
        message: "All fields are required",
      });
      return;
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", upload[0]);
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);

    axios.post("http://localhost:3000/api/users/register", formData, config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("accessToken", response.data.token);
        setToster({
          open: true,
          severity: "success",
          message: "User created successfully",
        });
      })
      .catch((error) => {
        setToster({
          open: true,
          message: error.message,
        });
      });
  };

  const formFields = watch();

  const handleClose = () => {
    setToster({
      open: false,
      severity: "success",
      message: "",
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
          <label htmlFor="username">Name </label>
          <input
            type="text"
            id="username"
            placeholder="username"
            name="username"
            {...register("username", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Minimum length should be 3",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

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
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            name="password"
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-fields">
          <label htmlFor="confirmPassword">Confirm Password </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            name="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) =>
                value === formFields.password || "Passwords do not match",
            })}
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <div className="form-fields">
          <label htmlFor="upload">Upload Profile Picture </label>
          <input
            type="file"
            id="upload"
            name="upload"
            {...register("upload")}
          />
          <p className="error">{errors.upload?.message}</p>
        </div>

        <button type="submit">Sign Up</button>
        <DevTool control={control} />
      </form>
    </div>
      <Snackbar open={toster.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toster.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toster.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
