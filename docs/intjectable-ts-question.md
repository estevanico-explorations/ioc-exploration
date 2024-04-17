## Nesting Dependency Tree

### About
Please bear with me as `IoC` containers are not my greatest strength and I have some questions. I am hoping to get a deeper understanding about nested dependencies.

I'm hoping to have a potentially deeply nested configuration object to make organization and namig of dependencies much easier. The example below is a trivial one but larger applications and libraries could potentially have many dependencies. So, if I were to write a nested configuration object I would hope to access that property like this `token('PARENT.PARENT.CHILD')()`. When injected the service would recieve the data directly within that path and no further work by the developer is required on their end.

The main benefits are to make retrieval of those dependancies more straight forward. This would also allow me to organize my dependency object to my liking.

[**NOTE**]: I took many liberties to simplify the code examples.

### Code
```ts
// --- SERVICES ----------------------------------------------------------------
// Example 1
const dummyService = injectable(token('IO.FILE')(), (fs) => ({
  do: () => fs.readFileSync('foo.txt').toString()
}))

// Example 2
const cityService = injectable(token('METADATA.ADDRESS.CITY')(), (city) => ({
  do: () => city // Returns "Boston"
}))

// --- CONFIG ------------------------------------------------------------------
const configs = {
  METADATA: {
    NAME: '',
    ADDRESS: {
      CITY: 'Boston',
    },
  },
  IO: {
    // import 'fs' from 'fs'
    FILE: fs,

    // MISC
    DB: {
      MODELS: {
        CARS: cars,
        USERS: users,
        CHAT: chats,
      }
    }
  }
}

const services = { dummyService, cityService }

// --- ENTRY POINT -------------------------------------------------------------
const main = () => {
  const entryPoint = injectable(services, { dummy, city }) => ({
    city.do(),
    dummy: dummy.do(),
  })

  return entryPoint(configs)
}

main()
```

### Workarounds
I think the next best option if this library weren't naitvily support this functionality would be to write selectors like `Redux` uses. 


```ts
const carsModel = {
  get: select,
  del: del,
  save: upsert,
}

// --- SELECTORS ---------------------------------------------------------------
const carsDep = () => token('IO.DB.MODELS.CARS')()

// --- SERVICES ----------------------------------------------------------------
// Example 1
const cars = injectable(carsDep, (cars) => ({
  // cars => car model so cars.get is a function on that model
  id: (id) => cars.get(id)
}))

// --- CONFIG ------------------------------------------------------------------
const configs = {
  IO: {
    DB:
      MODELS: {
        CARS: carsModel,
        USERS: users,
        CHAT: chats,
      }
    }
  }
}

const services = { cars }

// --- ENTRY POINT -------------------------------------------------------------
const main = () => {
  const entryPoint = injectable(services, { cars }) => ({
    car: cars.get(1),
  })

  return entryPoint(configs)
}

main()
```
