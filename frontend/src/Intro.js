import styles from "./css/intro.module.css";
function Intro() {
  return (
    <div className={styles.display}>
      <p className={styles.about}>
        Thank you for taking the time to participate in this survey. Your
        feedback is very important to us. Please fill in the following fields
        with your personal information:
      </p>
      <ul className={styles.fieldsInfo}>
        <li>
          <b>Name:</b> Enter your full name.
        </li>
        <li>
          <b>Email:</b> Enter your valid email address.
        </li>
        <li>
          <b>Phone number:</b> Enter your phone number with the country code.
        </li>
        <li>
          <b>Gender:</b> Select your gender identity from the options.
        </li>
        <li>
          <b>Nationality:</b> Select your country of citizenship.
        </li>
        <li>
          <b>Address: </b> Enter your complete postal address.
        </li>
        <li>
          <b>Message: </b> Enter any additional comments or suggestions you have
          for us.
        </li>
      </ul>
    </div>
  );
}

export default Intro;
