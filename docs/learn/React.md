# Learn React

## Bootstrapping - Writing React with JavaScript

The following code uses pure ES6 javascript and HTML5, no React macros or "magic".

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Jukebox</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

```js
// src/main.js
import { createRoot } from 'react-dom/client'
import { App } from './App.js'

createRoot(document.getElementById('root')!).render(App)
```

```js
// src/App.js
export const App = () => {
  return React.createElement('div', null, 'Hello World')
}
```

Renders:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Jukebox</title>
  </head>
  <body>
    <div id="root">
      <div>Hello World</div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

## Components

### How they work

Each of the following code examples are the same, and get increasingly more vanilla.

Functional components, with React JSX syntax:

```tsx
const Example = () => {
  return <div>Lorem Ipsum</div>
}
```

Class components, with React JSX syntax:

```tsx
class Example extends React.Component {
  render() {
    return <div>Lorem Ipsum</div>
  }
}
```

Functional component, without JSX syntax:

```js
const Example = () => {
  return React.createElement('div', null, 'Hello World')
}
```

Html file with pure vanilla JS:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Jukebox</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      var root = document.getElementById('root')
      var Example = document.createElement('div')
      Example.textContent = 'Hello World'

      root.appendChild(Example)
    </script>
  </body>
</html>
```

Ultimately, all these generate this inside the root element:

```html
<div>Lorem Ipsum</div>
```

## Hooks

## State

## Effects

## Context
