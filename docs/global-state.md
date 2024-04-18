# Global State
A way to manage a mutable (for now) global state object that can be used throughout an app. This is mostly things like saving `env` vars or some shit. Perhaps like a cache. `injectable-ts` doesn't allow for this since it's all immutable but what if I took [`InjectX`](https://github.com/mrpotatoes/injectX-exploration) and see if I could do it with that? I'd have to fork it to be safe tho.

If I were to try this with [`InjectX`](https://github.com/mrpotatoes/injectX-exploration) I would need to remove the reflect stuff prolly.