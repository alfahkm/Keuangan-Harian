import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-custom-blue mb-2">💰 Keuangan Harian</h1>
          <p className="text-custom-blue/80">Masukkan username Anda untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-custom-blue mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-custom-blue/30 rounded-lg text-custom-blue placeholder-custom-blue/50 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent"
              placeholder="Masukkan username Anda"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 focus:ring-offset-white animate-pulseScale"
          >
            Masuk
          </button>
        </form>

        <div className="text-center text-sm text-custom-blue/70">
          <p>Data Anda akan disimpan secara terpisah untuk setiap username</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
