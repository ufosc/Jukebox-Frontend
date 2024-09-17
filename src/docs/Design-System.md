# Design System and Style Guide

## Tokens

### Global elements 

Will be named using this structure:

```txt
[element|token]-[category|role]-[property|context]--[variant]--[state]
```

Example:

```scss
// Naming css variables
.example {
  color: var(color-surface-on--hover);
}
```

- Token: `color`
- Role: `surface`
- Context: `on` (signifies the color of text that appears on `color-surface` in this case)
- Variant: `hover`

```html
<!-- Naming html classes -->
<div class="form-group--large">
  ...
</div>
```

- Token: `form`
- Category: `group`
- Variant: `large`

### Local/scoped elements

Uses the following structure:

```txt
[element]__[nested-element]--[variant]
```

Nesting can go as far down as necessary.

Example:

```html
<nav class="nav-bar">
  <img class="nav-bar__image">
  <ul class="nav-bar__list">
    <li class="nav-bar__list__item"></li>
    <li class="nav-bar__list__item"></li>
    <li class="nav-bar__list__item"></li>
  </ul>
  <ul class="nav-bar__list--mobile">...</ul>
</nav>
```

This allows the following SCSS code & scoping:

```scss
.nav-bar {
  // full class: nav-bar
  // ...

  &__image {
    // full class: nav-bar__image
    // ...
  }

  &__list {
    // full class: nav-bar__list
    // ...

    &__item {
      // full class: nav-bar__list__item
      // ...
    }

    &--mobile {
      // full class: nav-bar__list--mobile
      // ...
    }
  }
}
```

## Colors

Token: `color`

### Syntax

Naming structure:

```
color-[role]-[on|dim|bright]
```

_NOTE: In the future, dim/bright will probably be considered "variants", but they are currently just considered to be their own colors._

Example:

```scss
.component {
  background-color: var(--color-surface);
  color: var(--color-surface-on);
}
```

### Colors & Color Roles

#### Color names

Main colors:

- Coral
- Teal
- Lemon

System Colors:

- Red
- Yellow
- Green
- Neutral

#### Color Roles

Every color roles has an associated "on" color, or the color that text should be if it were to appear on that color.

Main roles:

- **Primary**: The main brand color
- **Secondary**: Main accent color used to compliment primary
- **Tertiary**: Sparsely used accent color
- **Error**: Indicates wrong, bad, negative state
- **Warning**: Indicates a state of caution
- **Success**: Indicates a good state, successful action, proper path

Each of those roles will also have sub roles:

- **Contrast**: These colors pass the AA/AAA accessibility tests and should be used when text needs to be readable, but also colored.
- **Container**: TODO...

Utility roles:

- **Surface**
- **Outline**
- **Label**
- **Disabled**


## Typography

Token: `font`

### Display

Used as standalone large text marking a larger section or domain.

Use:

```scss
.example-class {
  // Sizes: xl, lg, md, sm, xs
  @include font-display('md');
}
```

### Data Display

Used to display large or prominent numbers, statistics, etc.
Unlike normal Display, these have an emphasis on utility and
readability, whereas Display is more stylistic.

### Headline

Marks normal sections and text blocks, classic headers 1-2

### Title

Precludes lower emphasis sections, classic headers 3-6

### Label

Utility text, represents actions or small-form items.
Should never head sections, content, etc.

### Body

Long form text, normal base text, provides easiest reading experience


