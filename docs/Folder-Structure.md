# Project Structure

Structure is inspired by Angular, Django, Domain Driven Design techniques, and this article: [A Front-End Application Folder Structure that Makes Sense](https://medium.com/@fadamakis/a-front-end-application-folder-structure-that-makes-sense-ecc0b690968b).

```txt
src/
|-- config/
|   |-- index.ts
|-- utils/
|   |-- index.ts
|-- docs/
|   |-- index.ts
|-- mock/
|   |-- index.ts
|-- lib/
|   |-- index.ts
|-- store/
|   |-- store.ts
|   |-- index.ts
|   |-- [slice]/
|   |   |-- slice.ts
|   |   |-- actions.ts
|   |   |-- thunks.ts
|   |   |-- selectors.ts
|   |   |-- index.ts
|-- styles/
|   |-- abstracts/
|   |-- base/
|   |-- components/
|   |-- font/
|   |-- layout/
|   |-- theme/
|   |-- main.scss
|-- network/
|   |-- network.ts
|   |-- index.ts
|-- types/
|   |-- index.d.ts
|-- shared/
|   |-- components/
|   |   |-- [Component]/
|   |   |   |-- Component.tsx
|   |   |   |-- Component.module.scss
|   |   |   |-- Component.test.tsx
|   |   |-- index.ts
|   |-- hooks/
|   |   |-- index.ts
|   |-- context/
|   |   |-- index.ts
|-- apps/
    |-- [domain]/
        |-- types/
        |   |-- index.d.ts
        |-- components/
        |   |-- [Component]/
        |   |   |-- Component.tsx
        |   |   |-- Component.module.scss
        |   |   |-- Component.test.tsx
        |   |-- index.ts
        |-- store/
        |   |-- [slice]/
        |   |   |-- slice.ts
        |   |   |-- actions.ts
        |   |   |-- thunks.ts
        |   |   |-- selectors.ts
        |   |   |-- index.ts
        |   |-- index.ts
        |-- hooks/
        |   |-- index.ts
        |-- layouts/
        |   |-- index.ts
        |-- pages/
        |   |-- index.ts
        |-- routes.tsx
        |-- index.ts
```
