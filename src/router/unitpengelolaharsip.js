const unitpengelolaharsip = {
  path: '/unit_pengolah_arsip',
  component: () => import('layouts/V2/IndexLayout.vue'),
  meta: { requireAuth: true },
  children: [
    { path: '', redirect: '/unitpengelolaharsip/arsip' },
    {
      path: '/unitpengelolaharsip/arsip',
      name: 'unitpengelolaharsip.arsip',
      component: () => import('pages/simrs/unitpengelolaharsip/arsip/IndexPage.vue')
    },
    {
      path: '/unitpengelolaharsip/notfound',
      component: () => import('pages/MidlewareNotFound.vue')
    }
  ]
}
export default unitpengelolaharsip
