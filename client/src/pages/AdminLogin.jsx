import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem('raza_admin_token', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-24">
      <h1 className="font-display text-2xl text-walnut mb-2 text-center">Admin Login</h1>
      <p className="text-walnut/50 text-sm text-center mb-8">Shop owner access only</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 focus:border-brass outline-none"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-walnut/20 rounded-lg px-4 py-2.5 bg-white/50 focus:border-brass outline-none"
        />
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-walnut text-linen py-2.5 rounded-full text-sm hover:bg-pine transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
