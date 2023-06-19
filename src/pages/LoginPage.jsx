import "bootstrap/dist/css/bootstrap.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formMode, setFormMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { authState, setAuthState } = useContext(AuthContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormModeSwitch = () => {
    setError(""); // Clear any previous error messages
    if (formMode === "login") {
      setFormMode("create");
    } else {
      setFormMode("login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission and page refresh

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          userName: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const { authorization, username, userId } = response.data;

        // Save the token and username in local storage
        localStorage.setItem("token", authorization);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        // Update the AuthContext state
        setAuthState({
          token: authorization,
          username: username,
          userId: userId,
        });

        // Perform any necessary actions upon successful login
        alert("Login successful");
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault(); // Prevent form submission and page refresh

    // Add validation logic here (e.g., password length, password confirmation, etc.)
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        userName: username,
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        // Account creation successful
        alert("Account created successfully");
        setFormMode("login"); // Switch back to login form
      } else {
        // Handle account creation failure
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      // Handle account creation failure
      setError("An error occurred during account creation. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-lg-6 border border-primary p-4">
        {formMode === "login" ? (
          <>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
              {/* Login form fields */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {/* Form actions */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleFormModeSwitch}
                >
                  Create Account
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-center">Create Account</h2>
            <form onSubmit={handleCreateAccount}>
              {/* Create account form fields */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {/* Form actions */}
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleFormModeSwitch}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
