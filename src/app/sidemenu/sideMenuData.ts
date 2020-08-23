import { formatDate } from "@angular/common";

export class SideMenuData {
    _id: string;
    title: string;
    have_submenu: Boolean;
    sub_menu: Array<submenu>
}

export class submenu {
    is_selected: Boolean;
    is_active: Boolean;
    name: string;
    url: string;
    icon: string;
    code: string;
}