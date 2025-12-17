const siasik = {
  path: '/siasik',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', name: 'siasik', redirect: '/siasik/saldo/saldoawal' },
    {
      path: '/siasik/saldo/saldoawal',
      // name: 'siasik.saldo',
      component: () => import('pages/siasik/transaksi/saldo/saldoawal/IndexPage.vue')
    },
    {
      path: '/siasik/saldo/silpa',
      // name: 'siasik.saldo',
      component: () => import('pages/siasik/transaksi/saldo/pembiayaan/IndexPage.vue')
    },
    {
      path: '/siasik/ls/kontrak',
      name: 'siasik.ls.kontrak',
      component: () => import('pages/siasik/transaksi/ls/kontrak/IndexPage.vue'),
      children: [
        { path: '', name: 'kontrak', redirect: '/siasik/ls/kontrak/form' },
        {
          path: '/siasik/ls/kontrak/form',
          name: 'siasik.ls.kontrak.form',
          component: () =>
            import('src/pages/siasik/transaksi/ls/kontrak/formkontrak/IndexPage.vue')
        },
        {
          path: '/siasik/ls/kontrak/list',
          name: 'siasik.ls.kontrak.list',
          component: () =>
            import('src/pages/siasik/transaksi/ls/kontrak/listkontrak/IndexPage.vue')
        },


      ]
    },
    {
      path: '/siasik/ls/serahterima',
      name: 'siasik.ls.serahterima',
      component: () => import('pages/siasik/transaksi/ls/serahterima/IndexPage.vue'),
      children: [
        { path: '', name: 'serahterima', redirect: '/siasik/ls/serahterima/formserahterima' },
        {
          path: '/siasik/ls/serahterima/formserahterima',
          name: 'siasik.ls.serahterima.formserahterima',
          component: () =>
            import('src/pages/siasik/transaksi/ls/serahterima/FormInput/IndexPage.vue')
        },
        {
          path: '/siasik/ls/serahterima/listserahterima',
          name: 'siasik.ls.serahterima.listserahterima',
          component: () =>
            import('src/pages/siasik/transaksi/ls/serahterima/ListData/IndexPage.vue')
        },

      ]
    },
    {
      path: '/siasik/ls/npdls',
      name: 'siasik.ls.npdls',
      component: () => import('pages/siasik/transaksi/ls/npdls/IndexPage.vue'),
      children: [
        { path: '', name: 'npdls', redirect: '/siasik/ls/npdls/newformnpd' },
        {
          path: '/siasik/ls/npdls/newformnpd',
          name: 'siasik.ls.npdls.newformnpd',
          component: () =>
            import('src/pages/siasik/transaksi/ls/npdls/NewFormnpdls/IndexPage.vue')
        },
        {
          path: '/siasik/ls/npdls/newlistnpd',
          name: 'siasik.ls.npdls.newlistnpd',
          component: () =>
            import('src/pages/siasik/transaksi/ls/npdls/ListDataNpdls/IndexPage.vue')
        },

      ]
    },
    {
      path: '/siasik/ls/notadinas',
      name: 'siasik.ls.notadinas',
      component: () => import('pages/siasik/transaksi/ls/notadinas/IndexPage.vue'),
      children: [
        { path: '', name: 'notadinas', redirect: '/siasik/ls/notadinas/formdata' },
        {
          path: '/siasik/ls/notadinas/formdata',
          name: 'siasik.ls.notadinas.formdata',
          component: () =>
            import('src/pages/siasik/transaksi/ls/notadinas/formdata/IndexPage.vue')
        },
        {
          path: '/siasik/ls/notadinas/listdata',
          name: 'siasik.ls.notadinas.listdata',
          component: () =>
            import('src/pages/siasik/transaksi/ls/notadinas/listdata/IndexPage.vue')
        },

      ]
    },
    // {
    //   path: '/satset/kunjungan',
    //   name: 'satset.kunjungan',
    //   component: () => import('pages/satset/kunjungan/IndexPage.vue')
    // },

    {
      path: '/siasik/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default siasik
