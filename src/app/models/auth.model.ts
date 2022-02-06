export interface Auth {
    status_code?: number;
    data?: Data;
}

export interface Data {
    user?: User;
}

export interface User {
    id_user?: number;
    email?: string;
    nama?: string;
    m_roles_id?: number;
    akses?: Akses;
    token?: string;
}

export interface Akses {
    edit_user?: boolean;
    edit_hak_akses?: boolean;
    setting_menu?: boolean;
    setting_customer?: boolean;
    setting_promo?: boolean;
    setting_diskon?: boolean;
    setting_voucher?: boolean;
    laporan_penjualan?: boolean;
    laporan_penjualan_menu?: boolean;
    laporan_penjualan_customer?: boolean;
}
