import {INavBarData} from "./helper";

const navbarData: INavBarData[] = [
  {
    routeLink: 'list',
    icon: 'fas fa-home',
    label: 'Accueil'
  },
  {
    routeLink: 'types',
    icon: 'fas fa-folder',
    label: 'Types',
    items: [
      {
        routeLink: 'types/gsm',
        label: 'GSM'
      },
      {
        routeLink: 'types/internet-mobile',
        label: 'INTERNET MOBILE'
      },
      {
        routeLink: 'types/fix',
        label: 'FIX-VPNADSL-VPNLL'
      },
      {
        routeLink: 'types/internet-mobile-vpn',
        label: 'INTERNET MOBILE VPN'
      }
    ]
  },
  {
    routeLink: 'facturations',
    icon: 'fas fa-file-invoice',
    label: 'Facturations'
  },
  {
    routeLink: 'rapprochement',
    icon: 'fas fa-file-excel',
    label: 'Rapprochement'
  }
];

const navbarData2 = [

  {
    routeLink: 'users',
    icon: 'fas fa-users',
    label: 'Utilisateurs'
  }
];


export {navbarData, navbarData2};
