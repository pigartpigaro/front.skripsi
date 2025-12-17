const mpp = {
  path: '/mpp',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/mpp/ranap' },
    {
      path: '/mpp/ranap',
      name: 'mpp.ranap',
      component: () => import('pages/simrs/mpp/ranap/IndexPage.vue')
    },
    // {
    //   path: '/mpp/suratkontrol',
    //   name: 'mpp.suratkontrol',
    //   component: () => import('pages/simrs/mpp/suratkontrol/IndexPage.vue')
    // },

    {
      path: '/mpp/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }

  ]
}
export default mpp
