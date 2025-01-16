# Project Code Style Guide

- [Component Structure](#component-structure)
  - [Arrow Functions](#arrow-functions)
  - [Named Exports vs Default Exports](#named-exports-vs-default-exports)
- [Using Barrel Exports](#using-barrel-exports)
- [Pages vs Components](#pages-vs-components)
- [To Semicolon, or Not to Semicolon](#to-semicolon-or-not-to-semicolon)

## Component Structure

Example:

```tsx
/**
 * Example Component
 *
 * Describe the component in this docstring. When
 * hovering over the component in an IDE, these
 * comments will appear in a popup - allowing quick
 * access to info about the component.
 */
export const Example = (props: { one: string; two?: number }) => {
  // Props
  const { one, two } = props

  // Redux Store Access
  const someValue = useSelector(selectSomeValue)

  // Context/hooks
  const { foo, bar } = useContext(FooBarContext)

  // State
  const [lorem, setLorem] = useState<string>('ipsum')

  // Effects
  useEffect(() => {
    console.log('dolor sit')
  }, [lorem])

  // Implementation ...

  return <div></div>
}
```

### Arrow Functions

Why use arrow functions versus traditional function declarations (using the `function` key word)? It doesn't matter. It's purely a design preference.

However, there are some benefits:

1. Consistent function declarations in callbacks and "thenables" (actual word, docs: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables)).
   Example:

   ```tsx
   // How we define components
   export const Example = () => {}

   // How we define callbacks
   setTimeout(() => {
     console.log('This happened after 1sec')
   }, 1000)
   ```

2. Slightly shorter syntax, sometimes. Example of similar size:

   ```tsx
   // Function declaration
   function Example() {
     return <div></div>
   }

   // Arrow function
   const Example = () => {
     return <div></div>
   }
   ```

   Example of shorter syntax:

   ```tsx
   // Function declaration
   function Loading() {
     return <p>Loading...</p>
   }

   // Arrow function
   const Loading = () => <p>Loading...</p>
   ```

3. It's also a widely used and modern syntax. While yes, that is bandwagon-ing, I also think this makes it easier to transition to/from this project from/to another react project.

You may disagree with this decision, as strong opinions about syntax are common (like Torvalds about tabs vs spaces, lol), but ultimately having a consistent style allows for a cleaner codebase.

### Named Exports vs Default Exports

We use this:

```tsx
// Named export
export const Example = () => {}
```

Instead of this:

```tsx
// Default export
const Example = () => {}

export default Example
```

Because the former has the following benefits:

1. Better logging, some stack traces reportedly don't show the function name when using default exports.
2. Easier refactoring. If you were to rename the component in the first, your IDE would rename all instances of the function. If you did the same for the default export, your IDE would be unlikely to rename it since the name of the component is just an alias for that function in each place it's used.
3. Preference. We think it's cleaner.

## Using Barrel Exports

Traditionally, after some time, you would probably have a component like this:

```tsx
import { One } from 'src/components/One'
import { Two } from 'src/components/Two'
import { Three } from 'src/components/Three'
import { Four } from 'src/components/Four'
import { Five } from 'src/components/Five'
import { Six } from 'src/components/Six'

export const Example = () => {
  return (
    <div>
      <One />
      <Two />
      <Three />
      <Four />
      <Five />
      <Six />
    </div>
  )
}
```

I've seen lots of files like these where you have to scroll in order to get past the imports. While sometimes this is necessary, I think if there's a way to simplify things, then we should.

Consider this:

```tsx
import { One, Two, Three, Four, Five, Six } from 'src/components'

export const Example = () => {
  return (
    <div>
      <One />
      <Two />
      <Three />
      <Four />
      <Five />
      <Six />
    </div>
  )
}
```

How is this possible? With a file named `index.ts` at `src/components` that looks like this:

```ts
// src/components/index.ts
export * from './One.tsx'
export * from './Two.tsx'
export * from './Three.tsx'
export * from './Four.tsx'
export * from './Five.tsx'
export * from './Six.tsx'
```

Typescript will now see the components directory as a module, and now you can import each of the components from the `components` module instead of their individual files.

This has the following benefits:

1. Shorter syntax for importing multiple things from a shared directory.
2. Easier to refactor. Outside functions accessing a component no longer need to worry about where an individual component is in the folder tree, so we can regroup components more easily, and with fewer changes across the project.

## Pages vs Components

In a traditional React tutorial, you may only work with "components", so it may be a bit odd to also work with "pages". This method is widely used in Next.js as a way to define routes and implement components. While our pages don't define the routes like in Next.js (page name and location in the folder tree determines the url path in Next.js), only pages should be used in `Router` components. Components should be used in other components, and in pages.

## To Semicolon, or Not to Semicolon

> Answer: **No Semicolons**

If they aren't required to run JS, why should we type them?

If you want to use them, there are plenty of other languages that are willing to self destruct because of them.
