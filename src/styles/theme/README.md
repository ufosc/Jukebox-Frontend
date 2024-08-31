# Theme Definitions

## Structure

Relevant terms:

- Theme: Collection of styles/modes that act on the same classes.
- Mode: Set of styles that can be swapped out for eachother, like light/dark mode. They do not require a rerender or refresh to change.
- Palette: A collection of colors that represents a gradient of increasing lightness values for the same/similar hue and saturation values when using hsl.
- Swatch: An abstract color that could have a different value for each "mode", and has an associated "on" color for text or other overlapping elements.

### Colors.scss

The Colors file creates the base color palettes for the entire theme. The palettes are organized into a map separating each palette and listing the colors by their "lightness" level according to their hsl value. This map of palettes are then looped over to create css variable versions of each entry

```scss
// Template
$palettes: (
  $palette-name: (
    $lightness: hsl(x, y, z),
  ),
);

// Example
$palettes: (
  $p: (
    0: hsl(0, 0, 0),
    20: hsl(209, 75%, 50%),
    50: hsl(209, 75%, 50%),
  ),
);

// Generated values
:root {
  --p0: hsl(0, 0, 0);
  --p20: hsl(209, 75%, 25%);
  --p50: hsl(209, 75%, 50%);
}
```

### Theme.scss

The theme file contains one map that defines all of the color swatches for the theme.
