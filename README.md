# plunge.js
Drop down in vanilla Javascript

A simple script which can help you with drop downs in vanilla javascript.

## Installation

```
  bower install plunge --save
```

## Usage

Plunge works by adding a trigger to an element that is connected to the element that needs to take the plunge.

Add ` data-pl-trigger="IDENTIFIER" ` to the trigger element.

Add ` data-pl-id="IDENTIFIER" ` to the dropdown element.

### Optional

Position the dropdown, default is `auto`.

`data-pl-position="auto | left | top | right | bottom"`

When you need more distance between dropdown element and the trigger, you can use margin in CSS to push the dropdown away from the element.

## Known issues

- When a parent stops propagation, the event will never reach the root, be aware of other scripts you use.
