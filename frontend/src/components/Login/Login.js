import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../dataHandling/userHandling";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pw]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, pw)
      .then(() => {
        setPw("");
        setEmail("");
      })
      .catch()
      .finally(() => {
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <div className='login'>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live='assertive'
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            required
          />

          <button>Sign In</button>
          <p>
            Don't have an account yet?
            <br />
            <span className='line'>
              <Link to='/register'>
                <a>Sign Up</a>
              </Link>
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};
export default Login;
