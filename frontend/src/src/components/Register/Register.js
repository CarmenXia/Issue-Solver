import { useRef, useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Register.css";
import * as userHandling from "../../dataHandling/userHandling";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,25}$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pw, setPw] = useState("");
  const [validPw, setValidPw] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const [matchPw, setMatchPw] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const testedName = USER_REGEX.test(username);
    setValidName(testedName);
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    const testedPw = PW_REGEX.test(pw);
    //console.log(pw);
    //console.log(testedPw);
    setValidPw(testedPw);
    const testedMatch = pw === matchPw;
    setValidMatch(testedMatch);
  }, [pw, matchPw]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pw, matchPw]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const test1 = USER_REGEX.test(username);
    const test2 = EMAIL_REGEX.test(email);
    const test3 = PW_REGEX.test(pw);
    if (!test1 || !test2 || !test3) {
      setErrMsg("Invalid entry");
      return;
    }
    try {
      await userHandling.register(username, email, pw);
      /* setUsername("");
      setEmail("");
      setPw("");
      setMatchPw("");*/
      window.location = "/login";
    } catch (err) {}
  };

  return (
    <div className='register'>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live='assertive'
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
            Username:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !username ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='text'
            id='username'
            ref={userRef}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            value={username}
            required
            aria-invalid={validName ? "false" : "true"}
            aira-describedby='nameRequest'
            onFocus={() => setUserFocus(true)}
            onBlur={() => {
              setUserFocus(false);
            }}
          />
          <p
            id='nameRequest'
            className={
              userFocus && username && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            3 to 26 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor='email'>
            Eamil:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aira-describedby='emailRequest'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => {
              setEmailFocus(false);
            }}
          />
          <p
            id='emailRequest'
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Please enter your email adress.
          </p>

          <label htmlFor='password'>
            Password:
            <span className={validPw ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPw || !pw ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete='off'
            required
            aria-invalid={validPw ? "false" : "true"}
            aria-describedby='pwRequest'
            onFocus={() => setPwFocus(true)}
            onBlur={() => setPwFocus(false)}
          />
          <p
            id='pwRequest'
            className={pw && pwFocus && !validPw ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            6 to 20 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
          </p>
          <label htmlFor='confirm-pw'>
            Confirm Password:
            <span className={validPw && validMatch ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                (validPw && validMatch) || !matchPw ? "hide" : "invalid"
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type='password'
            id='confirm-pw'
            onChange={(e) => setMatchPw(e.target.value)}
            value={matchPw}
            required
            aria-onInvalid={validMatch ? "false" : "true"}
            aria-describedby='confirmRequset'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmRequset'
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          <button
            disabled={!validName || !validPw || !validMatch ? true : false}
          >
            Sigh up
          </button>
        </form>
        <p>
          Already registered?
          <br />
          <span className='line'>
            <Link to='/login'>
              <a>Sign In</a>
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Register;
