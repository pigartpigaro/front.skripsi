import { useMasterPemeriksaanFisik } from 'src/stores/simrs/master/poliklinik/pemeriksaanfisik'
import { onMounted, ref } from 'vue'

export function useMenuPemeriksaan() {

  const menus = ref([])
  const master = useMasterPemeriksaanFisik()

  const search = ref('')

  function filterredMenu() {
    const newMenus = menus.value
    if (search.value !== '' || search.value !== null) {
      const filter = search.value.toLowerCase()
      return newMenus.filter(x => {
        // const data = x.name.toLowerCase()
        const data = x.nama.toLowerCase()
        return data.indexOf(filter) > -1
      })
    }
    return newMenus
  }

  onMounted(() => {
    menus.value = master.items
  })

  return { menus, search, filterredMenu }
}
