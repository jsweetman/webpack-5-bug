# webpack-5-bug

Steps to reproduce:

1. Clone this repo
2. In the root directory `yarn`
3. In the ui folder, `yarn start`
4. Go to https://localhost:4000 in a browser, allow browser to navigate to that page
5. Blank page, look in console to see the error

```
Uncaught TypeError: Cannot read property 'BClass' of undefined
```

If you make any of the following changes (just one is fine), the bug does not occur:
* In `api/data/domain/src/aClass.ts` comment out `@Annotate(undefined)`
* In `api/data/domain/index.ts` move `export { BClass } from './src/bClass';` above `export { AClass } from './src/aClass';`
* In `ui/src/app/index.tsx` change `import { AClass } from "data-domain";` to `import { AClass } from "data-domain/src/aClass";`

This bug did not occur in webpack 4.
