<?php
session_start();

// Si el usuario ya está autenticado (existe un token en la sesión), redirigirlo al dashboard
if (isset($_SESSION['token'])) {
    header('Location: dashboard.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Inicio</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Bienvenido a la Aplicación de Gestión de Tokens</h1>
    <p>Por favor, regístrate o inicia sesión para acceder a tu panel.</p>
    
    <a href="login.php">Iniciar Sesión</a> | 
    <a href="register.php">Registrarse</a>
</body>
</html>
