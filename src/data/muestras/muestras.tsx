const Muestras = Array.from({ length: 30 }, (_, i) => {
  const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  const tipos = ["Combinado", "Tarjeta de Crédito"];
  const nombresImpuestos = ["Juan Perez Lorca", "Ana Gómez", "Luis Martínez", "Carla Torres"];
  const nombresMercadotecnia = ["Ernesto Serrano", "Marta Ruiz", "Pedro Sánchez", "Lucía Ortega"];
  const nombresEstadoDeCuenta = ["Diego Ramírez", "Sofía Mendoza", "Carlos León"];
  const nombresTDC = ["Valeria Cruz", "Fernando Díaz", "Andrea López"];

  return {
    id: i + 1,
    periodo: `${meses[i % 12]}-${25 + Math.floor(i / 12)}`,
    tipo: tipos[i % tipos.length],
    validadoImpuestos: i % 2 === 0,
    validadorImpuestos: i % 2 === 0 ? nombresImpuestos[i % nombresImpuestos.length] : "",
    validadoMercadotecnia: i % 3 !== 0,
    validadorMercadotecnia: i % 3 !== 0 ? nombresMercadotecnia[i % nombresMercadotecnia.length] : "",
    validadoEstadoDeCuenta: i % 4 === 0,
    validadorEstadoDeCuenta: i % 4 === 0 ? nombresEstadoDeCuenta[i % nombresEstadoDeCuenta.length] : "",
    validadoTDC: i % 5 === 0,
    validadorTDC: i % 5 === 0 ? nombresTDC[i % nombresTDC.length] : ""
  };
});


export default Muestras;