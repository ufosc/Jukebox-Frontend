# Theme Definitions

## Colors

Relevant terms:

- Theme: Collection of styles/modes that act on the same classes.
- Mode: Set of styles that can be swapped out for each other, like light/dark mode. They do not require a rerender or refresh to change.
- Swatch: A collection of colors that represents a gradient of increasing lightness values for the same/similar hue and saturation values when using hsl.
- Palette: A group of colors with an abstract role that could have different values for each "mode". Typically has an associated "on" color for text or other overlapping elements.

### Color Definitions

The Colors file creates the base color palettes for the entire theme. The palettes are organized into a map separating each palette and listing the colors by their "lightness" level according to their hsl value. This map of palettes are then looped over to create css variable versions of each entry

Example Swatches:

```scss
// Template
$swatch: (
  $color-label: (
    $lightness: hsl(x, y, z),
  ),
);

// Example with Azure tonal swatch
$swatch: (
  a: (
    0: hsl(0, 0, 0),
    20: hsl(209, 75%, 50%),
    50: hsl(209, 75%, 50%),
  ),
);

// Generated values
:root {
  --tonal-a-0: hsl(0, 0, 0);
  --tonal-a-20: hsl(209, 75%, 25%);
  --tonal-a-50: hsl(209, 75%, 50%);
}
```

Example palettes:

```scss
// Template
$color-roles: (
  $palette: (
    $mode: (
      $role: 'color-code',
    ),
  ),
);

// Example with Primary color role
$color-roles: (
  primary: (
    light: (
      default: 'a-40',
      on: 'a-100',
    ),
  ),
);

// Generated values for modes
:root {
  --color-primary--light: var(--tonal-a-40);
  --color-primary-on--light: var(--tonal-a-100);
}

// Generated values if light mode is default
:root {
  --color-primary: var(--color-primary--light);
  --color-primary-on: var(--color-primary-on--light);
}
```

## Font

### Display

Used as standalone large text marking a larger section or domain.

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
