import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation to ensure both fields are filled
    if (!loginData.username || !loginData.password) {
      setError('Please fill out all fields');
      return;
    }

    setIsLoading(true);
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      // Redirect or other actions on successful login (e.g., navigation)
    } catch (error) {
      console.error('Failed to login:', error);
      // Update the error message if there’s a more specific error message
      setError(error instanceof Error ? error.message : 'Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p>{error}</p>}
        
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={loginData.username || ''}
          onChange={handleChange}
          required
        />
        
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={loginData.password || ''}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Submit Form'}
        </button>
      </form>
    </div>
  );
};

export default Login;
