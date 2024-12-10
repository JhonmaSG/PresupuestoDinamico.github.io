<<<<<<< HEAD
import { Dato } from './Dato.js';
export class Ingreso extends Dato{
    static contadorIngresos = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }
=======
import { Dato } from './Dato.js';
export class Ingreso extends Dato{
    static contadorIngresos = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }
>>>>>>> 04662ee232ffa3c60c4da51bf2c8f1f086837bb0
}