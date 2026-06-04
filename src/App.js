import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export default function App() {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupMessage, setSignupMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        signupData.email.toLowerCase()
    );

    if (existingUser) {
      setSignupMessage('User already exists with this email');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        signupData
      );

      setSignupMessage(response.data.message);

      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
      });

      fetchUsers();
    } catch (error) {
      if (error.response) {
        setSignupMessage(error.response.data.message);
      } else {
        setSignupMessage('Backend server not reachable');
      }
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        loginData
      );

      setLoginMessage(response.data.message);
      setLoggedInUser(response.data.user);
    } catch (error) {
      if (error.response) {
        setLoginMessage(error.response.data.message);
      } else {
        setLoginMessage('Backend server not reachable');
      }
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617, #0f172a, #1d4ed8)',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: 'white',
      fontSize: '52px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subtitle: {
      textAlign: 'center',
      color: '#cbd5e1',
      marginBottom: '50px',
      fontSize: '18px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    card: {
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '28px',
      padding: '35px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      color: 'white',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    description: {
      color: '#cbd5e1',
      marginBottom: '30px',
    },
    inputBox: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '15px',
      marginBottom: '18px',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'white',
      marginLeft: '10px',
      fontSize: '15px',
    },
    button: {
      width: '100%',
      padding: '16px',
      borderRadius: '16px',
      border: 'none',
      background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    darkButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '16px',
      border: 'none',
      background: 'linear-gradient(135deg, #0f172a, #334155)',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    message: {
      marginTop: '20px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: '15px',
      borderRadius: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    toggle: {
      color: '#7dd3fc',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    usersSection: {
      marginTop: '30px',
    },
    search: {
      width: '100%',
      padding: '14px',
      borderRadius: '14px',
      border: 'none',
      outline: 'none',
      marginBottom: '20px',
    },
    userCard: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: '15px',
      borderRadius: '16px',
      marginBottom: '12px',
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Modern Authentication System</h1>

      <p style={styles.subtitle}>
        React + Node.js + MySQL + Playwright Automation Testing
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="#22d3ee" />
            <h2 style={styles.title}>Create Account</h2>
          </div>

          <p style={styles.description}>
            Register a new user account for automation testing.
          </p>

          <InputField
            styles={styles}
            id="firstName"
            icon={<User color="#22d3ee" size={18} />}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={signupData.firstName}
            onChange={handleSignupChange}
          />

          <InputField
            styles={styles}
            id="lastName"
            icon={<User color="#22d3ee" size={18} />}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={signupData.lastName}
            onChange={handleSignupChange}
          />

          <InputField
            styles={styles}
            id="signupEmail"
            icon={<Mail color="#22d3ee" size={18} />}
            type="email"
            name="email"
            placeholder="Email Address"
            value={signupData.email}
            onChange={handleSignupChange}
          />

          <InputField
            styles={styles}
            id="mobile"
            icon={<Phone color="#22d3ee" size={18} />}
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={signupData.mobile}
            onChange={handleSignupChange}
          />

          <InputField
            styles={styles}
            id="signupPassword"
            icon={<Lock color="#22d3ee" size={18} />}
            type={showSignupPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
          />

          <InputField
            styles={styles}
            id="confirmPassword"
            icon={<Lock color="#22d3ee" size={18} />}
            type={showSignupPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={handleSignupChange}
          />

          <button
            id="toggleSignupPassword"
            style={styles.toggle}
            onClick={() => setShowSignupPassword(!showSignupPassword)}
          >
            {showSignupPassword ? 'Hide Passwords' : 'Show Passwords'}
          </button>

          <button
            id="signupBtn"
            style={styles.button}
            onClick={registerUser}
          >
            Register User
          </button>

          {signupMessage && (
            <div id="signupMessage" style={styles.message}>
              {signupMessage}
            </div>
          )}
        </div>

        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck color="#4ade80" />
            <h2 style={styles.title}>Login</h2>
          </div>

          <p style={styles.description}>
            Login using registered credentials.
          </p>

          <InputField
            styles={styles}
            id="loginEmail"
            icon={<Mail color="#22d3ee" size={18} />}
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleLoginChange}
          />

          <InputField
            styles={styles}
            id="loginPassword"
            icon={<Lock color="#22d3ee" size={18} />}
            type={showLoginPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />

          <button
            id="toggleLoginPassword"
            style={styles.toggle}
            onClick={() => setShowLoginPassword(!showLoginPassword)}
          >
            {showLoginPassword ? 'Hide Password' : 'Show Password'}
          </button>

          <button
            id="loginBtn"
            style={styles.darkButton}
            onClick={loginUser}
          >
            Login
          </button>

          {loginMessage && (
            <div id="loginMessage" style={styles.message}>
              {loginMessage}
            </div>
          )}

          {loggedInUser && (
            <div
              id="welcomeBox"
              style={{
                marginTop: '20px',
                backgroundColor: 'rgba(34,197,94,0.2)',
                padding: '20px',
                borderRadius: '18px',
              }}
            >
              <h3>Welcome Back 👋</h3>
              <p>
                {loggedInUser.first_name} {loggedInUser.last_name}
              </p>
              <p>{loggedInUser.email}</p>

              <button
                id="logoutBtn"
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setLoggedInUser(null);
                  setLoginMessage('Logged out successfully');
                }}
              >
                Logout
              </button>
            </div>
          )}

          <div style={styles.usersSection}>
            <h2 style={{ marginBottom: '15px' }}>Registered Users</h2>

            <input
              id="searchUser"
              style={styles.search}
              type="text"
              placeholder="Search users by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div>
              {users
                .filter((user) =>
                  user.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((user) => (
                  <div key={user.id} style={styles.userCard}>
                    <p>
                      <strong>
                        {user.first_name} {user.last_name}
                      </strong>
                    </p>

                    <p>{user.email}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  styles,
  id,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div style={styles.inputBox}>
      {icon}

      <input
        id={id}
        style={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
