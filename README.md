# TypeScript IoC library explorations
Trying out some libraries and seeing how I like them for later use.

## [`@injectable-ts/core`](https://github.com/raveclassic/injectable-ts/blob/main/packages/core/README.md)
The most promising library that I've seen for `IoC` and will use this for injecting deps.

## [`injectX`](https://www.npmjs.com/package/injectx)
This one also works and has some nifty features but I think it's more suitable for mutable state. I have forked this repository and will play around in it's code to see what I can do with it.

## ~~[`ts-import`](https://www.npmjs.com/package/ts-import)~~
~~Will not work for my usecases since it cannot handle dynamic `import` or `require` statements. While the idea is still nifty I think I will change my route here and use `rollupjs` and write a custom plugin to automatically write an `index.ts` file with the `import` statements required to be compiled to a single file.~~

## Documentation & Further Explorations
### `@injectable-ts`
- [Auto Injectables](./docs/auto-injectable.md)
- [Injectable Ts Examples](./docs/injectable-ts.examples.md)
- [Injectable Ts Question(s)](./docs/intjectable-ts-question.md)
- [Multi Injectibles](./docs/multi-injectable-funcs.md)
- [Tree Examples](./docs/tree.examples.md)

### Misc
- [Best Practices](./docs/best-practices.md)
- [Global State](./docs/global-state.md)
- [Thoughts](./docs/thoughts.md)
- [TODOs](./docs/todos.md)
