import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/authReducer.js";
import { loginSuccess } from "../../redux/reducers/userReducer.js"

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    email: yup.string().email("Invalid Email").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
    address: yup.string().required("Address Is Required"),
    postalCode: yup.string().required("Postal Code Is Required"),
    contactNumber: yup.string().required("Contact Number Is Required"),
  });

  const loginSchema = yup.object().shape({
    email:yup.string().email("Invalid Email address").required("Email Address is required"),
    password:yup.string().required("Password Is Required")
  })

  const loginInitialValue ={
    email:"",
    password:"",
  }

  const registerInitialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    postalCode: "",
    contactNumber: "",
  };

  const register = async (values,onSubmitProps)=>{
    const response = await fetch("http://13.127.166.185:443/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if(!response.ok){
      console.log("Failed to register");
      return 
    }
     const loggedIn = await response.json();
     if (loggedIn.token && loggedIn.user) {
       dispatch(setToken(loggedIn.token));
       dispatch(loginSuccess(loggedIn.user));
       onSubmitProps.resetForm();
       navigate("/");
       setPageType("login");
       console.log("Registeration Successfully");
     }
    
    
    
  }

  const login = async (values,onSubmitProps) => {
    const response = await fetch("http://13.127.166.185:443/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if(!response.ok){
      console.log("Failed to login");
      return 
    }
    const loggedIn = await response.json();
    if(loggedIn.token && loggedIn.user){
      dispatch(setToken(loggedIn.token));
      dispatch(loginSuccess(loggedIn.user));
      navigate("/");
      onSubmitProps.resetForm();
    }
    console.log("response = ", loggedIn);

    
  }

  const handleSubmit = (values, onSubmitProps) => {
    {pageType !== "login" ? register(values, onSubmitProps) : login(values,onSubmitProps);}
  };

  return (
    <>
      <div className="heading">
        {pageType === "login" ? "Sign In" : "Register Your Self"}
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={
          pageType !== "login" ? registerInitialValue : loginInitialValue
        }
        validationSchema={pageType !== "login" ? registerSchema : loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            {pageType !== "login" && (
              <>
                <div className="mul_input">
                  <div className="input_container">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="input_container">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="input_container">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.contactNumber && errors.contactNumber && (
                    <div className="error">{errors.contactNumber}</div>
                  )}
                </div>

                <div className="mul_input">
                  <div className="input_container">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.address && errors.address && (
                      <div className="error">{errors.address}</div>
                    )}
                  </div>

                  <div id="postal_container" className="input_container">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={values.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.postalCode && errors.postalCode && (
                      <div className="error">{errors.postalCode}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="input_container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div className="input_container" >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <button type="submit">
              {pageType === "login" ? "Sign In" : "Register"}
            </button>
            <p
              id="changeForm"
              onClick={() =>
                setPageType(pageType === "login" ? "register" : "login")
              }
            >
              {pageType === "login"
                ? "Create Account"
                : "Already have an Account"}
            </p>
          </form>
        )}
      </Formik>
      {/* <div></div> */}
    </>
  );
};

export default Form;
