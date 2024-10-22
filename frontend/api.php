<?php

function callAPI($method, $url, $data = false, $token = null) {
    $curl = curl_init();
    
    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data) {
                curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
            }
            break;
        case "GET":
            if ($data) {
                $url = sprintf("%s?%s", $url, http_build_query($data));
            }
            break;
        // Otros métodos como PUT, DELETE se pueden añadir aquí si es necesario
    }

    // Setear los headers
    $headers = [
        'Content-Type: application/json',
    ];

    if ($token) {
        $headers[] = 'Authorization: Bearer ' . $token;
    }

    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);

    $result = curl_exec($curl);
    curl_close($curl);

    return json_decode($result);
}

// Función para registrar un usuario
function registerUser($username, $password) {
    $url = 'http://localhost:3000/auth/register';
    $data = [
        'username' => $username,
        'password' => $password
    ];

    return callAPI('POST', $url, $data);
}

// Función para iniciar sesión
function loginUser($username, $password) {
    $url = 'http://localhost:3000/auth/login';
    $data = [
        'username' => $username,
        'password' => $password
    ];

    return callAPI('POST', $url, $data);
}

// Función para crear un token en Hedera
function createToken($name, $symbol, $initialSupply, $token) {
    $url = 'http://localhost:3000/tokens/create-token-hedera';
    $data = [
        'name' => $name,
        'symbol' => $symbol,
        'initialSupply' => $initialSupply
    ];

    return callAPI('POST', $url, $data, $token);
}

// Función para listar los tokens creados por el usuario
function listTokens($token) {
    $url = 'http://localhost:3000/tokens/list-tokens';
    return callAPI('GET', $url, false, $token);
}
?>
