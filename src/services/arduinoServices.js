//GET REGISTROS
export function getRegistros(page) {
  return fetch(`http://localhost/ard/getRegistros.php?page=${page}`)
    .then((response) => response.json())
    .catch((er) => console.log(er));
}

//GET ULTIMO REGISTRO
export function getUltimoRegistro() {
  return fetch("http://localhost/ard/getUltimoRegistro.php")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
}
