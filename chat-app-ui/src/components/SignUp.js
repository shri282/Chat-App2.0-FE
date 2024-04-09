import React from "react";
import "../styles/signup.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function SignUp() {
  const { register, handleSubmit, control, formState, watch } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const formFields = watch();

  return (
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
  );
}

export default SignUp;
