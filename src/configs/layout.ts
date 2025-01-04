export const SIDE_NAV = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'material-symbols:dashboard-outline',
    childrens: [
      {
        title: 'Analytics',
        path: '/dashboard/analytics',
        icon: 'material-symbols:analytics-outline',
        childrens: [
          {
            title: 'Sales',
            path: '/dashboard/analytics/sales',
            icon: 'solar:sale-broken'
          }
        ]
      },
      {
        title: 'Ecommerce',
        path: '/dashboard/ecommerce',
        icon: 'material-symbols:shopping-cart-outline'
      }
    ]
  },
  {
    title: 'Apps',
    path: '/apps',
    icon: 'garden:app-26',
    childrens: [
      {
        title: 'Email',
        path: '/apps/email',
        icon: 'mdi-light:email'
      }
    ]
  }
]
