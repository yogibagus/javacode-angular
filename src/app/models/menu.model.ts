export interface ListMenu {
    status_code: number;
    data: Menu[];
}

export interface Menu {
    id_menu?: number;
    nama?: string;
    harga?: number;
    status?: number;
    kategori?: number;
    nama_kat_menu?: string;
    deskripsi?: string;
    gambar?: string;
}

export interface DetailMenu {
    status_code?: number;
    data?: DataMenu;
}

export interface DataMenu {
    menu?: Menu;
    topping?: topping[];
    level?: topping[];
}

export interface topping {
    id_detail_menu?: number;
    type?: string;
    harga?: number;
    keterangan?: string;
    id_menu?: number;
}
