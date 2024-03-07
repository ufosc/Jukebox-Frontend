# Project Structure

## File structure

```txt
src
  - docs
  - components
  - assets
  - styles
  - store
  - hooks
  - mock
  - utils
  Theme.jsx
  Router.jsx
  
  - [domain]
  | index.js
  | - components
  | - store
  | - mock
  | - pages
```

## Component Structure

```txt
[Component]
  [Component].jsx
  [Component].module.css
  [Component].test.js
  [Component].utils.js
```

## Conventions

- Barrel exports
- Mono-repo, domain driven design
- Only named exports
- Function components
- Arrow functions
