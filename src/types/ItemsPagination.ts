import { Muestra } from "./Muestra";

export interface ItemsPagination{
    paginas: number;
    paginaActual: number;
    noItems: number,
    datos:  Muestra[]
}