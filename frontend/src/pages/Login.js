// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpia cualquier error previo

    try {
      const response = await loginUser({ correo, contraseña });

      // **MANEJO DE LA RESPUESTA EXITOSA**
      console.log('Inicio de sesión exitoso:', response.data); // 'response.data' contendrá { token, user, message }

      // **GUARDAR EL TOKEN DE AUTENTICACIÓN**
      // Aquí es donde guardarás el token para futuras solicitudes.
      // Puedes usar localStorage, sessionStorage o un contexto de estado.
      localStorage.setItem('authToken', response.data.token);

      // **GUARDAR LA INFORMACIÓN DEL USUARIO (OPCIONAL)**
      // Puedes guardar información básica del usuario si la necesitas globalmente.
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // **REDIRECCIONAR AL DASHBOARD**
      navigate('/dashboard');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.response?.data?.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
}

export default Login;