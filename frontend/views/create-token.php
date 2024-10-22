<?php
session_start();

if (!isset($_SESSION['token'])) {
    header('Location: login.php');
    exit();
}

$name = $_POST['name'];
$symbol = $_POST['symbol'];
$initialSupply = $_POST['initialSupply'];

// Llamar a la API para crear el token
$response = callAPI('POST', 'http://localhost:3000/tokens/create-token-hedera', [
    'name' => $name,
    'symbol' => $symbol,
    'initialSupply' => $initialSupply
], $_SESSION['token']);

if (isset($response->tokenId)) {
    header('Location: dashboard.php');
} else {
    echo "Error al crear el token: " . $response->error;
}
?>
