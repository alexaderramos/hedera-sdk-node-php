<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Registro de Usuario</h1>
    <form action="auth.php?action=register" method="POST">
        <label for="username">Nombre de Usuario:</label>
        <input type="text" name="username" required>
        <br>
        <label for="password">Contraseña:</label>
        <input type="password" name="password" required>
        <br>
        <button type="submit">Registrar</button>
    </form>
    <a href="login.php">¿Ya tienes cuenta? Inicia sesión</a>
</body>
</html>
