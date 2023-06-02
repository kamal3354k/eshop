import React, { useState } from "react";
import Card from "../../components/card/Card";
import forgotImage from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import { ResetPasswordFuncition } from "../../firebase/config";
import { toast } from "react-toastify";

const Reset = () => {
  const [email, setEmail] = useState();

  const ResetFormHandler = (e) => {
    e.preventDefault();
    ResetPasswordFuncition(email)
      .then(() => {
        alert("Check your email!");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <section className="container auth">
      <div className="img">
        <img src={forgotImage} alt="Register" width="400" />
      </div>
      <Card>
        <div className="form">
          <h2>Reset Password</h2>
          <form onSubmit={ResetFormHandler}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className="links">
              <p>
                <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
