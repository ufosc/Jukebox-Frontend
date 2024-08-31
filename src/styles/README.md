# Dev Suite Stylesheet

## Tokens

Global elements

```txt
[element]-[category]-[property]--[variant]--[state]
```

Local/scoped elements

```txt
[element]__[nested-element]--[variant]
```

## Layout

Available components:

- `.container`: Align elements using flexbox in to a row of 12 columns.
  - `.col-stretch`: Take up as much space as available in row
  - `.col-shrink`: Shrink to size of content
  - `.col-span-#`: Take span # out of 12 columns
- `.flex`: Apply flexbox
  - `.flex-row`: Direction row
  - `.flex-col`: Direction col
