export interface Users {
    status_code?: number;
    data?: UserData;
}

export interface UserData {
    id_user?: number;
    nama?: string;
    email?: string;
    alamat?: string;
    telepon?: string;
    username?: string;
    password?: string;
    m_roles_id?: number;
    is_deleted?: number;
}

export interface ListRoles {
    status_code?: number;
    data?: Role[];
}

export interface Role {
    id_roles?: number;
    akses?: Akses;
    nama?: string;
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


