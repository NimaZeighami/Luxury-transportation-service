import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState("passenger");
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [firstName, setFirstName] = useState(true);
  const [lastName, setLastName] = useState(true);
  const [email, setEmail] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(true);
  const [registerPassword, setRegisterPassword] = useState(true);
  const [reWritePassword, setReWritePassword] = useState(true);
  const [notSameError, setNotSameError] = useState(false);
  const [isPassForgot, setIsPassForgot] = useState(false);

  const navigate = useNavigate();

  localStorage.clear();
  const handleRecoveryPassword = async (e) => {
    try {
      const response = await fetch(
        "https://dignitylimo.com/users/requests2.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "forget",
            passenger_email: phoneNumberOrEmail,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      // setErrorMessage("Your login data is incorrect. Try again!");
    }
    setIsPassForgot(false);
    setErrorMessage("Check Your Email Please !!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on new submission
    setNotSameError(""); // Reset password mismatch message

    if (!isRegistered && registerPassword !== reWritePassword) {
      setNotSameError("Your password and its repeat do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://dignitylimo.com/users/requests.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: isRegistered
            ? new URLSearchParams({
                action: "login",
                role: role,
                email: phoneNumberOrEmail,
                password: password,
              })
            : new URLSearchParams({
                action: "user_new",
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email: email,
                password: registerPassword,
              }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "repeat") {
        setErrorMessage(data.message);
        setIsRegistered(true);
      } else if (data.status === "success") {
        setErrorMessage(data.message);
        setIsRegistered(true);
      } else if (data) {
        // If successful login or signup, store data in localStorage and navigate
        localStorage.setItem("id", data.data[0].id);
        localStorage.setItem("firstName", data.data[0].first_name);
        localStorage.setItem("lastName", data.data[0].last_name);
        localStorage.setItem("email", data.data[0].email);
        localStorage.setItem("phoneNumber", data.data[0].phone_number);
        localStorage.setItem("role", role);
        if (data.data[0].driver_id)
          localStorage.setItem("driverId", data.data[0].driver_id);
        if (role === "passenger") navigate("/dashboard/passenger");
        else if (role === "driver") navigate("/dashboard/driver");
        else navigate("/dashboard/manager");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Your login data is incorrect. Try again!");
    }
  };

  const handleChangeFormType = () => {
    setErrorMessage("");
    setIsRegistered(!isRegistered);
    setIsPassForgot(false);
  };
  const handleForgetPassword = () => setIsPassForgot(!isPassForgot);

  return (
    <div className="flex items-center min-h-screen p-4 bg-slate-500  lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-36  text-white bg-red-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            DPL
          </div>
          <p className="mt-6 font-normal text-center  text-gray-300 md:mt-0">
            We offer safe and convenient transportation services for
            individuals, corporate clients, and events throughout the Washington
            DC, Virginia and Maryland area.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>
              {isRegistered ? "Don't have an account?" : "Do have an account?"}
            </span>
            <p
              className="underline cursor-pointer"
              onClick={handleChangeFormType}
            >
              {!isRegistered ? "Get Started!" : "Create an account!"}
            </p>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our {/* <a href="#" className="underline"> */}
            terms {/* </a>{" "} */}
            and {/* <a href="#" className="underline"> */}
            conditions
            {/* </a> */}
          </p>
        </div>
        {isPassForgot ? (
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Recovery Password
            </h3>
            <form
              action="#"
              className="flex flex-col space-y-5"
              onSubmit={handleRecoveryPassword}
            >
              <div className="flex flex-col space-y-1">
                <label
                  for="email"
                  className="text-sm mt-2 font-semibold text-gray-500"
                >
                  Enter Your Email address
                </label>
                <input
                  type="text"
                  id="email"
                  onChange={(e) => setPhoneNumberOrEmail(e.target.value)}
                  required
                  autofocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-red-700 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Send Recovery Email
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              {isRegistered ? "Login" : "SignUp"}
            </h3>
            <span
              className={
                errorMessage
                  ? "text-base text-red-500 bg-red-200 p-1 border-b-1 border-yellow-400 rounded-md"
                  : " "
              }
            >
              {errorMessage}
            </span>
            <form
              action="#"
              className="flex flex-col space-y-5"
              onSubmit={handleLogin}
            >
              {isRegistered ? (
                <>
                  <div className="flex flex-col space-y-1">
                    <label
                      for="email"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      Email address / Phone Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      onChange={(e) => setPhoneNumberOrEmail(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        for="password"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Password
                      </label>
                      <p
                        className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                        onClick={handleForgetPassword}
                      >
                        Forgot Password?
                      </p>
                    </div>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      for="email"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="passenger">Passenger</option>
                      <option value="manager">Manager</option>
                      <option value="driver">Driver</option>
                    </select>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                      />
                      <label
                        for="remember"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col">
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="firstName"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="lastName"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="email"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      E-mail
                    </label>
                    <input
                      type="text"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="phoneNumber"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="registerPassword"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      id="registerPassword"
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 ">
                    <label
                      for="reWritePassword"
                      className="text-sm mt-2 font-semibold text-gray-500"
                    >
                      Repeat Password
                    </label>
                    <input
                      type="text"
                      id="reWritePassword"
                      onChange={(e) => setReWritePassword(e.target.value)}
                      required
                      autofocus
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                    <span className="text-sm text-red-500">{notSameError}</span>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-red-700 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {isRegistered ? "Log in" : "Register"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
