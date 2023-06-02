import React, { useState } from "react";
import loginImage from "../../assets/login.png";
import "./Auth.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { LoginFunction, LoginWithGoogleFunction } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import GoogleButton from "react-google-button";
import { useSelector } from "react-redux";

const initialForm = {
  email: "",
  password: "",
  confirm_password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state)=>state?.auth)

  const handleForm = ({ target: { name, value } }) => {
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    LoginFunction(form?.email, form?.password)
      .then(() => {
        setLoading(false);
        toast.success("Login Successfully.");
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };
  const googleLoginHandle = () => {
    LoginWithGoogleFunction().then(() => {
      navigate("/");
    });
  };

  if(user?.id) return <Navigate to="/"/>

  return (
    <>
      {loading && <Loader />}
      <section className="container auth">
        <div className="img">
          <img src={loginImage} alt="Login" width="400" />
        </div>
        <Card>
          <div className="form">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit} method="post">
              <input
                name="email"
                onChange={handleForm}
                value={form?.email}
                type="email"
                placeholder="Email"
                required
              />
              <input
                name="password"
                onChange={handleForm}
                value={form?.password}
                type="password"
                placeholder="Password"
                required
              />
              <button className="--btn --btn-primary --btn-block">Login</button>
              <div className="links">
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <GoogleButton
              style={{ width: "100%" }}
              onClick={googleLoginHandle}
            />
            <span className="register">
              <p>Don't have an account?</p>
              <Link to="/register">&nbsp;Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
