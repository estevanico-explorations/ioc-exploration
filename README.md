# TypeScript IoC library explorations
Trying out some libraries and seeing how I like them for later use.

## [`@injectable-ts/core`](https://github.com/raveclassic/injectable-ts/blob/main/packages/core/README.md)
The most promising library that I've seen for `IoC` and will use this for injecting deps.

## [`injectx`](https://www.npmjs.com/package/injectx)
This one also works and has some nifty features but I think it's more suitable for mutable state. I have forked this repository and will play around in it's code to see what I can do with it.

## [`ts-import`](https://www.npmjs.com/package/ts-import)
Will not work for my usecases since it cannot handle dynamic `import` or `require` statements. While the idea is still nifty I think I will change my route here and use `rollupjs` and write a custom plugin to automatically write an `index.ts` file with the `import` statements required to be compiled to a single file. 

@TODO: I will remove this package from this repo since it isn't an IoC container and I wanted to try something else out anyhoo.
