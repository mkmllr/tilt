# Tilt
A simple tilt effect in vanilla js.

## Demo

https://codepen.io/mkmllr/full/XWOgVBx

## Usage

```javascript
let item = document.querySelector('[data-tilt]');
item.tilt();
```

```javascript
let items = document.querySelectorAll('[data-tilt]');
items.forEach(el => el.tilt());
```

## Options

```javascript
// default settings:
let options = {
  angle: 10,
  invert: false,
  perspective: 1000,
  reset: true,
  scale: 1,
  transformElement: '',
  transitionEasing: 'cubic-bezier(.03, .98, .52, .99)',
  transitionSpeed: 1500,
};

item.tilt(options);
```
