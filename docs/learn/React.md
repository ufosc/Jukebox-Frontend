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

### Summary

To create context, you must create the thing that will hold the data, then determine who has access to that box.

Here's a minimal way of doing it:

```tsx
// src/components/Component.tsx

export const ComponentContext = createContext({ foo: '', bar: 0 })

export const Component = () => {
  return (
    <ComponentContext.Provider data={{ foo: 'Lorem', bar: 5 }}>
      <SomeInfo />
    </ComponentContext.Provider>
  )
}

// src/components/SomeInfo.tsx

export const SomeInfo = () => {
  const { foo, bar } = useContext(ComponentContext)

  return (
    <div>
      <p>Foo: {foo}</p>
      <p>Bar: {bar}</p>
    </div>
  )
}
```

### Examples

Say, for example, I have a list of track names and I want to see what the current track is in multiple components. The following two sections show how one would go about that without context, then with context. None of these components/files correlate to any files in the project.

#### Example Without Context

This would be the traditional way before context was added:

```tsx
// src/Page.tsx

export const Page = () => {
  const [currentTrack, setCurrentTrack] = useState('Example Track')

  return <section>
    <SomeComponent track={currentTrack} onSetTrack={setCurrentTrack} />
    <AnotherComponent track={currentTrack} onSetTrack={setCurrentTrack}>
      <ChildComponent track={currentTrack} />
      <AnotherChildComponent track={currentTrack}>
        <NestedChildComponent track={currentTrack} />
      </AnotherChildComponent>
    <AnotherComponent>
  </section>
}
```

And this is what a child component might look like:

```tsx
// src/components/AnotherComponent.tsx

export const AnotherComponent = (props: {
  track: string
  onSetTrack: (track: string) => void
  children: ReactNode
}) => {
  const { track, onSetTrack, children } = props

  return (
    <div>
      <TrackInfo track={track} onSetTrack={onSetTrack} />
      {children}
    </div>
  )
}
```

With a deeply nested track info component:

```tsx
// src/components/tracks/TrackInfo.tsx

export const TrackInfo = (props: {
  track: string
  onSetTrack: (track: string) => void
}) => {
  const { track, onSetTrack } = props

  return (
    <div>
      <p>Current Track: {track}</p>
      <button onClick={() => onSetTrack('New Track')}>Set New Track</button>
    </div>
  )
}
```

This is what's called "prop drilling", and it's very annoying and tedious.

#### Example With Context

Instead, use context:

```tsx
// src/Page.tsx

export const TrackContext = createContext({
  currentTrack: 'ExampleTrack',
  setCurrentTrack: (track: string) => {},
})

export const Page = () => {
  const [currentTrack, setCurrentTrack] = useState('Example Track')

  return (
    <section>
      <TrackContext.Provider
        data={{ currentTrack, setCurrentTrack }}
      >
        <SomeComponent />
        <AnotherComponent>
          <ChildComponent />
          <AnotherChildComponent>
            <NestedChildComponent />
          </AnotherChildComponent>
        <AnotherComponent>
      </TrackContext.Provider>
    </section>
  )
}
```

With a cleaner child component:

```tsx
// src/components/AnotherComponent.tsx

export const AnotherComponent = (props: { children: ReactNode }) => {
  const { children } = props

  return (
    <div>
      <TrackInfo />
      {children}
    </div>
  )
}
```

And the track info component will get whatever data it needs directly from context:

```tsx
// src/components/tracks/TrackInfo.tsx

export const TrackInfo = () => {
  const { currenTrack, setCurrenTrack } = useContext(TrackContext)

  return (
    <div>
      <p>Current Track: {currentTrack}</p>
      <button onClick={() => setCurrentTrack('New Track')}>
        Set New Track
      </button>
    </div>
  )
}
```
