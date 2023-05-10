import { RouteInfo } from "../models/route-info";

export const ROUTES: RouteInfo[] = [
    { path: '/admin', title: 'Thống kê', icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/admin/user-management/list-user', title: 'Người dùng', icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/admin/category-management/list-category', title: 'Danh mục', icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/admin/product-management/list-product', title: 'Sản phẩm', icon: 'ni-single-02 text-yellow', class: '' },
];