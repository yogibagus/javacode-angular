export interface listPromo {
    status_code?: number;
    data?: promo[];
}

export interface promo {
    id_promo?: number;
    nama?: string;
    type?: string;
    nominal?: number;
    kadaluarsa?: number;
    syarat_ketentuan?: string;
    gambar?: string;
}

export interface detailPromo {
    status_code?: number;
    data?: promo;
}
