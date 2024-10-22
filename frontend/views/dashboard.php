<?php
session_start();

if (!isset($_SESSION['token'])) {
    header('Location: login.php');
    exit();
}

// Obtener los tokens del usuario desde la API
$response = callAPI('GET', 'http://localhost:3000/tokens/list-tokens', false, $_SESSION['token']);
$tokens = $response;

// Función para hacer llamadas a la API autenticadas
function callAPI($method, $url, $data, $token) {
    $curl = curl_init();
    
    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
            break;
    }

    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token,
    ));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
    curl_close($curl);

    return json_decode($result);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Bienvenido al Dashboard</h1>
    <a href="logout.php">Cerrar sesión</a>

    <h2>Listado de Tokens</h2>
    <ul>
        <?php foreach ($tokens as $token): ?>
            <li><?php echo $token->name . " (" . $token->symbol . ") - Suministro: " . $token->initialSupply; ?></li>
        <?php endforeach; ?>
    </ul>

    <h2>Crear un Nuevo Token</h2>
    <form action="create-token.php" method="POST">
        <label for="name">Nombre del Token:</label>
        <input type="text" name="name" required>
        <br>
        <label for="symbol">Símbolo del Token:</label>
        <input type="text" name="symbol" required>
        <br>
        <label for="initialSupply">Suministro Inicial:</label>
        <input type="number" name="initialSupply" required>
        <br>
        <button type="submit">Crear Token</button>
    </form>
</body>
</html>
