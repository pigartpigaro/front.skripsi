// vite

import { defineBoot } from '@quasar/app-vite/wrappers'
import _ from 'lodash'

const globalComponents = import.meta.glob('components/~global/*.vue', { eager: true, import: 'default' })
const startIndex = '/~global/'.length

// export default async ({ app }) => {
//   Object.entries(globalComponents).forEach(([path, m]) => {
//     const componentName = _.upperFirst(
//       _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
//     )
//     app.component(
//       `${componentName}`, m
//     )
//   })
// }

export default defineBoot(({ app }) => {

  

  // return new Promise((resolve, reject) => {
    // do something

    const componentName = Object.keys(globalComponents).map(key => {
    
      return {
        path: key.substring(startIndex, key.length - 4),
        comp: _.upperFirst(_.camelCase(key.split('/').pop().replace(/\.\w+$/, ''))),
        component: globalComponents[key]
      }
    })
  
    componentName.forEach(async(val) => {
      // console.log('val', val);
      // // console.log('key', key);
      app.component(`${val?.comp}`, val?.component)
      
    })
  // })
  
})
