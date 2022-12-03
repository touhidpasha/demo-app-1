import axios from "axios";
import React, { useState } from "react";

import "./UserRegister.css";

export default function UserRegister(props) {
  const [fValue, changeFormValues] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
    jobType: "",
  });
  // /^[a-zA-Z0-9!@#$%^&*]{8,}$/

  const [errorMsg, setErrorMessage] = useState("");

  const [regex, getRegex] = useState({
    password: new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,}$"),
    email: new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$"),
  });

  const getFormValues = (event) => {
    setErrorMessage("");
    changeFormValues({
      ...fValue,
      [event.target.name]: event.target.value,
    });
    if (!regex.password.test(fValue.password))
      setErrorMessage(
        "UpperCase letter(A-Z) lowercase letter(a-z) number(0-9) special char(!@#$)"
      );

    console.log(fValue);
  };

  const createUser = async () => {
    //     http://3.110.193.62:8080/FrelancProjV1/api/validateEmail

    // {
    //     "user_email":"raulaabinash@gmail.com"
    // }
    if (fValue.firstName.length < 3 || fValue.lastName.length < 3)
      alert("name should contain more than 3 chars");
    else if (fValue.contactNumber.length != 10)
      alert("please enter 10 digin number");
    else if (!regex.email.test(fValue.email)) alert("email nor valid");
    else if (fValue.country == "") alert("please mention country name");
    else if (
      !regex.password.test(fValue.password) ||
      fValue.password != fValue.confirmPassword
    )
      alert("password must be valid");
    else if (fValue.jobType == "") alert("please select job type");

    var res;
    try {
      // res = await axios.post(
      //   "http://3.110.193.62:8080/FrelancProjV1/api/validateEmail",
      //   { user_email: "touhidpasha552@gmail.com" },
      //   {
      //     headers: {
      //       key: "Authorization",
      //       value: "ZnJlbGFuY2VBcHA6d2ViJjEyNw==",
      //       type: "text",
      //     },
      //   }
      // );
      res = await  axios.post(
        "http://3.110.193.62:8080/FrelancProjV1/api/validateEmail",
        { user_email: fValue.email },
        { headers: {"Authorization" : `Bearer ZnJlbGFuY2VBcHA6d2ViJjEyNw==`} }
      );
      if(res.data.succesmessage=="yes")
      alert("user already exists")
      console.log("email validation" + res.data);
    } catch (e) {
      console.log("email validation" + e);
    }

    try {
      res =  await axios.post(
        "http://3.110.193.62:8080/FrelancProjV1/api/userReg",

        {
          user_type: fValue.jobType,
          user_country:fValue.country,
          user_first_name: fValue.firstName,
          user_last_name: fValue.lastName,
          user_email: fValue.email,
          user_mobile: fValue.contactNumber,
          user_password: fValue.password,
          country: fValue.country,
          user_experience: "1 Year",
          user_picture: "",
        },
        { headers: {"Authorization" : `Bearer ZnJlbGFuY2VBcHA6d2ViJjEyNw==`} }
      );
      console.log("create user" + res.data);
    } catch (e) {
      console.log("create user" + e);
    }
    console.log(fValue);
  };
  return (
    <div id="form">
      <div id="col">
        <form onSubmit={(e) => e.preventDefault()}>
          <div id="row">
            <input
              className="input"
              placeholder="First name"
              name="firstName"
              value={fValue.firstName}
              onChange={getFormValues}
            ></input>

            <input
              className="input"
              placeholder="Last name"
              name="lastName"
              value={fValue.lastName}
              onChange={getFormValues}
            ></input>
          </div>
          <div id="row">
            <input
              className="input"
              placeholder="contact number"
              name="contactNumber"
              value={fValue.contactNumber}
              onChange={getFormValues}
            ></input>
          </div>
          <div id="row">
            <input
              className="input"
              placeholder="email"
              name="email"
              value={fValue.email}
              onChange={getFormValues}
            ></input>
          </div>
          <div id="row">
            <input
              className="input"
              placeholder="country"
              name="country"
              value={fValue.country}
              onChange={getFormValues}
            ></input>
          </div>
          <div id="row">
            <input
              className="input"
              placeholder="Password"
              name="password"
              value={fValue.password}
              onChange={getFormValues}
            ></input>
            <input
              className="input"
              placeholder="confirm Password"
              name="confirmPassword"
              value={fValue.confirmPassword}
              onChange={getFormValues}
            ></input>{" "}
          </div>
          {/* <div id="row"> */}
          <p1 className="hint">{errorMsg}</p1>
          {/* </div> */}
          <div id="row" onChange={getFormValues}>
            <input type="radio" value="frelancer" name="jobType" />
            <p1>frelancer</p1>
            <input type="radio" value="client" name="jobType" /> <p1>client</p1>
          </div>
          <p1>by signingin up you agree to ABC terms of services</p1>
          <div id="row-button">
            <button onClick={createUser} variant="contained" color="primary">
              continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
