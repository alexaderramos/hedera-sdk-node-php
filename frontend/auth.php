<?php
session_start();
include 'api.php';  // Incluir api.php para usar las funciones de la API

$action = $_GET['action'] ?? '';

if ($action == 'register') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Llamar a la API para registrar al usuario
    $response = registerUser($username, $password);

    if (isset($response->token)) {
        $_SESSION['token'] = $response->token;
        header('Location: dashboard.php');
        exit();
    } else {
        echo "Error en el registro: " . $response->message;
    }
}

if ($action == 'login') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    // Llamar a la API para iniciar sesión
    $response = loginUser($username, $password);

    if (isset($response->token)) {
        $_SESSION['token'] = $response->token;
        header('Location: dashboard.php');
        exit();
    } else {
        echo "Error en el login: " . $response->message;
    }
}
?>
