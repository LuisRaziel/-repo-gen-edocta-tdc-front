export interface Muestra {
    periodo: string; // ISO date string
    cifs: string; // Coma separada, puede convertirse en string[]
    tipoCuenta: number;

    idImpuestos: number;
    impuestosFecha: string; // ISO date string
    validadoImpuestos: number;
    validadorImpuestos: string | null;

    idMercadotecnia: number;
    mercadotecniaFecha: string; // ISO date string
    validadoMercadotecnia: number;
    validadorMercadotecnia: string | null;

    idEstadoDeCuenta: number;
    estadoDeCuentaFecha: string; // ISO date string
    validadoEstadoDeCuenta: number;
    validadorEstadoDeCuenta: string | null;

    idTDC: number;
    tdcFecha: string; // ISO date string
    validadoTDC: number;
    validadorTDC: string | null;

    id: number;
    creado: string; // ISO date string with time
    activo: boolean;
    index: number;
}