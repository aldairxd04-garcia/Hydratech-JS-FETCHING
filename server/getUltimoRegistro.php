<?php
$servername = "localhost"; //192.185.131.25
$username = "amberage_root";
$password = "Q2om%)?H.sAQV(r(MD";
$dbname = "amberage_kukultech";

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los datos de la tabla
$sql = "SELECT * 
FROM estadoHydratech 
ORDER BY fechaRegistro DESC
LIMIT 1;
";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Convertir a JSON
$jsonData = json_encode($data);

// Mostrar el JSON
echo $jsonData;

// Cerrar la conexión a la base de datos
$conn->close();
?>