import { useState, useEffect } from "react";
import SurveyForm from "./SurveyForm";
import Intro from "./Intro";
import "./css/App.css";

function App() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authorised, setAuthorised] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submitted, setSubmitted] = useState();

  const [items, setItems] = useState();
  useEffect(() => {
    console.log("effect");
    fetch("http://localhost:8000/view")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.surveys);
      });
  }, [submitted]);

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:8000/auth", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthorised(true);
          setShowLogin(false);
        } else {
          window.alert("enter correct username/password");
        }
      });
  }
  return (
    <>
      {showLogin ? (
        <form style={{ marginTop: "5vh" }} onSubmit={handleLogin}>
          <label htmlFor="">UserName</label>
          <input
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          &nbsp;
          <label htmlFor="">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          ></input>
          &nbsp;
          <input type="submit"></input>
          &nbsp;&nbsp;&nbsp;
          <div>
            <p>username: "admin", password: "password"</p>
          </div>
        </form>
      ) : (
        <div className="app-display">
          {authorised ? (
            <>
              <h1 className="heading">ADMIN VIEW</h1>
              <div className="admin-display">
                {items.map((item) => (
                  <div className="surveyItem">
                    <div>
                      <b>NAME:-</b> {item.name}
                    </div>
                    <div>
                      <b>EMAIL:-</b> {item.email}
                    </div>
                    <div>
                      <b>PHONE:-</b> {item.phone}
                    </div>
                    <div>
                      <b>GENDER:-</b> {item.gender}
                    </div>
                    <div>
                      <b>NATIONALITY:-</b> {item.nationality}
                    </div>
                    <div>
                      <b>ADDRESS:-</b> {item.address}
                    </div>
                    <div>
                      <b>MESSAGE:-</b> {item.message}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <h1 className="heading">Survey Form</h1>
              {!showSurvey ? (
                <>
                  {" "}
                  <Intro />
                  <button
                    onClick={() => {
                      setShowSurvey(true);
                    }}
                    className="start-btn"
                  >
                    Start
                  </button>
                </>
              ) : (
                <SurveyForm submitIdentifier={setSubmitted} />
              )}
            </>
          )}
        </div>
      )}
      <button
        className="loginBtn"
        onClick={() => {
          setShowLogin((prevVal) => {
            return !prevVal;
          });
          setAuthorised(false);
        }}
      >
        Toggle View
      </button>
    </>
  );
}

export default App;
