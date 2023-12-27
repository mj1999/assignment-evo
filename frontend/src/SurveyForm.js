import { useState } from "react";
import styles from "./css/surveyform.module.css";

const nationsOptions = [
  "Indian",
  "American",
  "Chinese",
  "French",
  "German",
  "Japanese",
  "British",
  "Australian",
  "Canadian",
  "Brazilian",
];
function SurveyForm({ submitIdentifier }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [nationality, setNationality] = useState();
  const [address, setAddress] = useState();
  const [message, setMessage] = useState();
  const [submitted, setSubmitted] = useState(false);

  function handleInput(value, setFunc) {
    setFunc(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/submit", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        gender,
        nationality,
        address,
        message,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setSubmitted(true);
          submitIdentifier(true);
        } else {
          if (data.present) {
            window.alert(
              "You have already filled the form and your response has been submitted in the database "
            );
          } else {
            window.alert(data.message);
          }
        }
      });
  }
  return (
    <div className={styles.display}>
      {submitted ? (
        <p className={styles.success}>
          ThankYou for your submission, The survey was successfully submitted we
          appreciate you taking time out for us.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            required
            name="name"
            value={name}
            className={styles.input}
            onChange={(e) => {
              handleInput(e.target.value, setName);
            }}
          />

          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            required
            name="email"
            value={email}
            className={styles.input}
            onChange={(e) => {
              handleInput(e.target.value, setEmail);
            }}
          />

          <label htmlFor="phone" className={styles.label}>
            Phone Number:
          </label>
          <input
            required
            name="phone"
            value={phone}
            className={styles.input}
            type="number"
            maxLength={10}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                window.alert("Phone number should be max 10 digits"); //just a basic check so that number remains below 10 digits
              }
              handleInput(+e.target.value, setPhone); //+value so that we get a integer value only
            }}
          />

          <label htmlFor="gender" className={styles.label}>
            Select Gender:
          </label>
          <select
            name="gender"
            className={styles.input}
            onChange={(e) => {
              handleInput(e.target.value, setGender);
            }}
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"others"}>Other</option>
          </select>

          <label htmlFor="nationality" className={styles.label}>
            Select Nationality:
          </label>
          <select
            name="nationality"
            className={styles.input}
            onChange={(e) => {
              handleInput(e.target.value, setNationality);
            }}
          >
            {nationsOptions.map((nation) => (
              <option value={nation}>{nation}</option>
            ))}
          </select>

          <label htmlFor="address" className={styles.label}>
            Address:
          </label>
          <input
            required
            name="address"
            value={address}
            className={styles.input}
            onChange={(e) => {
              handleInput(e.target.value, setAddress);
            }}
          />

          <label htmlFor="message" className={styles.label}>
            Message:
          </label>
          <textarea
            required
            name="message"
            placeholder="Your message here"
            onChange={(e) => {
              handleInput(e.target.value, setMessage);
            }}
          />

          <input type="submit" className={styles.submitBtn}></input>
        </form>
      )}
    </div>
  );
}

export default SurveyForm;
