-- Tabla Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

-- Tabla Administrador
CREATE TABLE Administrador (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuario(id)
);

-- Tabla Profesional
CREATE TABLE Profesional (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuario(id),
    especialidad VARCHAR(100)
);

-- Tabla Paciente
CREATE TABLE Paciente (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuario(id),
    fecha_diagnostico DATE
);

-- Tabla Cita
CREATE TABLE Cita (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES Paciente(id),
    profesional_id INT REFERENCES Profesional(id),
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(50)
);

-- Tabla Actividad
CREATE TABLE Actividad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    descripcion TEXT
);

-- Tabla Paciente_Actividad
CREATE TABLE Paciente_Actividad (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES Paciente(id),
    actividad_id INT REFERENCES Actividad(id),
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Tabla Diario_Paciente
CREATE TABLE Diario_Paciente (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES Paciente(id),
    fecha DATE,
    contenido TEXT,
    estado_animo VARCHAR(50)
);

-- Tabla Historial_Clinico
CREATE TABLE Historial_Clinico (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES Paciente(id),
    profesional_id INT REFERENCES Profesional(id),
    fecha DATE,
    notas TEXT,
    tratamiento TEXT
);
