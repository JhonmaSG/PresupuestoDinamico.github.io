import { Ingreso } from "./Ingreso.js";
import { Egreso } from "./Egreso.js";

const ingresos = [];
const egresos = [];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const mostrarModal = () => {
  const modalImpresion = new bootstrap.Modal(
    document.getElementById("modalImpresion")
  );
  modalImpresion.show();
};

document.getElementById("btnImprimir").addEventListener("click", () => {
  window.print();
});

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresosHTML = `
        <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${
                      ingreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(
                          ingreso.valor
                        )}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="eliminarIngreso(${
                                  ingreso.id
                                })"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
  return ingresosHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1); //(id, elementos a eliminar)
  cargarCabecero();
  cargarIngresos();
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresosHTML = `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
          <div class="elemento_porcentaje">${formatoPorcentaje(
            egreso.valor / totalEgresos()
          )}</div>
          <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline" 
            onclick="eliminarEgreso(${egreso.id})"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
  return egresosHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1); //(id, elementos a eliminar)
  cargarCabecero();
  cargarEgresos();
};

// Función principal para agregar datos
const agregarDato = () => {
  let forma = document.forms['forma'];
  let tipo = forma['tipo'].value;
  let descripcion = forma['descripcion'];
  let valor = parseFloat(forma['valor'].value);
  let caja = document.getElementById('contenedorAgregar');

  if (descripcion.value !== '' && !isNaN(valor)) {
    if (!validarValor(tipo, valor)) return; // Validar el valor según el tipo

    // Actualizar el fondo y los datos
    cambiarColorFondo(tipo, caja);

    if (tipo === 'ingreso') {
      ingresos.push(new Ingreso(descripcion.value, valor));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo === 'egreso') {
      egresos.push(new Egreso(descripcion.value, valor));
      cargarCabecero();
      cargarEgresos();
    }

    // Limpiar campos
    descripcion.value = '';
    forma['valor'].value = '';
    descripcion.focus();
  }
};

// Función cambiar color
const cambiarColorFondo = (tipo) => {
  const inputs = document.querySelectorAll('.agregar_descripcion, .agregar_valor');
  const select = document.querySelector('.agregar_tipo');
  
  inputs.forEach(input => {
    input.style.backgroundColor = tipo === 'ingreso' ? '#d1f0f0' : '#ffd1d1';
  });
   select.style.backgroundColor = tipo === 'ingreso' ? '#d1f0f0' : '#ffd1d1';
};

// Función validación
const validarValor = (tipo, valor) => {
  if (valor < 0) {
    alert(`El valor de un ${tipo} no puede ser negativo.`);
    return false;
  }
  return true;
};

// Evento para cambio de tipo en tiempo real
document.addEventListener('DOMContentLoaded', () => {
  const tipo = document.getElementById('tipo');
  tipo.addEventListener('change', () => cambiarColorFondo(tipo.value));
});


window.cargarApp = cargarApp;
window.formatoPorcentaje = formatoPorcentaje;
window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso = eliminarEgreso;
window.agregarDato = agregarDato;
window.mostrarModal = mostrarModal;
