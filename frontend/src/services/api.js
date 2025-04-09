// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Ajusta esto a la URL de tu backend

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiService = { // Exporta un objeto con las funciones
    loginUser: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    registerUser: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export { apiService }; // Exporta apiService como una exportación nombrada
// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api'; // Cambiado la importación

const Register = () => {
    const navigate = useNavigate();
    const [nombre_completo, setNombreCompleto] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rolNombre, setRolNombre] = useState('paciente'); // Valor por defecto
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await apiService.registerUser({ // Usa apiService.registerUser
                nombre_completo,
                correo,
                contraseña,
                rolNombre,
            });
            setMessage(response.message); // Usar response.message en lugar de response.data.message
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Error al registrar usuario.');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="nombre_completo">Nombre Completo:</label>
                    <input
                        type="text"
                        id="nombre_completo"
                        value={nombre_completo}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label htmlFor="rolNombre">Registrarse como:</label>
                    <select
                        id="rolNombre"
                        value={rolNombre}
                        onChange={(e) => setRolNombre(e.target.value)}
                    >
                        <option value="paciente">Paciente</option>
                        <option value="profesional">Profesional</option>
                        {/* Opcional: <option value="administrador">Administrador</option> */}
                    </select>
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
    );
};

export default Register;