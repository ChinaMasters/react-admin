const menuList = [
  {
    key: 1,
    icon: 'home',
    text: '首页',
    path: '/home'
  },
  {
    key: 2,
    icon: 'user',
    text: '用户管理',
    path: '/user',
    children:[
      {
        key: 21,
        icon: 'inbox',
        text: '权限管理',
        path: '/permit'
      },
      {
        key: 22,
        icon: 'container',
        text: '菜单管理',
        path: '/menu'
      },
      {
        key: 23,
        icon: 'menu',
        text: '角色管理',
        path: '/role'
      },
      {
        key: 24,
        icon: 'container',
        text: '状态管理',
        path: '/redux'
      }
    ]
  },
  {
    key: 4,
    icon: 'calendar',
    text: '通用组件',
    path: '/demo',
    children:[
      {
        key: 41,
        icon: 'code',
        text: '表格',
        path: '/table',
        children:[
          {
            key: 411,
            icon: 'fund',
            text: '基本表格',
            path: '/basetable'
          },
        ]
      },
    ]
  },
]

export default menuList