import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link, Navigate } from "react-router-dom";
import registerImage from "../../assets/register.png";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { SignUpFunction } from "../../firebase/config";
import { useNavigate } from "react-router-dom";



const initialForm = {
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const handleForm = ({ target: { name, value } }) => {
    setForm((pre) => ({ ...pre, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setLoading(false);
      toast.warning("Password and Confirm Password do not match!!");
    } else {
      SignUpFunction(form?.email, form?.password)
        .then(() => {
          setLoading(false)
          toast.success("Register Successfully.");
          navigate("/login")
        })
        .catch((e) => {
          setLoading(false);
          toast.error(e.message);
        });
    }
  };



  
  return (
    <>
      {loading && <Loader cover={true}/>}
      <section className="container auth">
        <Card>
          <div className="form">
            <h2>Register</h2>
            <form method="post" onSubmit={handleFormSubmit}>
              <input
                name="email"
                value={form.email}
                type="email"
                placeholder="Email"
                required
                onChange={handleForm}
              />
              <input
                name="password"
                value={form.password}
                type="password"
                placeholder="Password"
                required
                onChange={handleForm}
              />
              <input
                name="confirm_password"
                value={form.confirm_password}
                type="password"
                placeholder="Confirm Password"
                required
                onChange={handleForm}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className="register">
              <p>Already have an account?</p>
              <Link to="/login">&nbsp;Login</Link>
            </span>
          </div>
        </Card>
        <div className="img">
          <img src={registerImage} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
