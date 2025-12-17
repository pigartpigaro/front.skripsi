const penjaminan = {
  path: '/penjaminan',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/penjaminan/klaim' },
    {
      path: '/penjaminan/klaim',
      name: 'penjaminan.klaim',
      component: () => import('pages/simrs/penjaminan/klaim/IndexPage.vue')
    },
    {
      path: '/penjaminan/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default penjaminan
