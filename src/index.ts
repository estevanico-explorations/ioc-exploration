import { constructorDeps, objectDeps, overriddenDeps, combinedDeps, treeDeps, deepDeps } from './injectable-ts'

const injectableTS = () => {
  /**
   * Regardless of which option is chosen the function body needs to still be
   * in order of calls because if one function requires the output of a another
   * (dependant values) then they must be stacked correctly.
   */
  // --- RUN APPLICATIONS ----------------------------
  console.clear()

  console.log('--- DEEP TREE ------------------------------------')
  deepDeps()
  
  // console.log('--- OBJECT PARAM ---------------------------------')
  // objectDeps()

  // console.log('\n--- FUNCTION LIST PARAM -------------------------')
  // constructorDeps()

  // console.log('\n--- OVERRIDDEN DEPS -----------------------------')
  // overriddenDeps()
  
  // console.log('\n--- COMBINED DEPS -------------------------------')
  // combinedDeps()
  
  // console.log('\n--- TREE DEPS -----------------------------------')
  // treeDeps()

  // --- EXPECTED OUTPUT -----------------------------
  //
  // --- OBJECT PARAM ---------------------------------
  // [ 'movie()' ]
  // entryPoint(token): auth token
  // entryPoint(movie): [ 'movie()' ]
  //
  // --- FUNCTION LIST PARAM -------------------------
  // [ 'movie()' ]
  // entryPoint(token): auth token
  // entryPoint(movie): [ 'movie()' ]
  //
  // --- OVERRIDDEN DEPS -----------------------------
  // [OVERRIDDEN LOGGER] [ 'movie()' ]
  // [OVERRIDDEN LOGGER] entryPoint(token):
  // [OVERRIDDEN LOGGER] entryPoint(movie):
  //
  // --- COMBINED DEPS -------------------------------
  // [run()]: override! hey
  // [d()]: TZTZ
  // [run()]: ASD! hey zzzz
  // 
  // --- TREE DEPS -----------------------------------
  // [TODO]
}

injectableTS()
