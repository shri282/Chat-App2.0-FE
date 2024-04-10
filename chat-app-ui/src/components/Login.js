import React from "react";
import "../styles/signup.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function Login() {

  const { register, handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
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

        <button type="submit">Sign in</button>
        <DevTool control={control} />
      </form>
    </div>
  )
}

export default Login