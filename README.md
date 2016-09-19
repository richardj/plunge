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

#### Child elements in trigger element

When your trigger contains child elements it might happen that you click on the child element and it doesn't recognise this as a proper trigger for the dropdown. This is easily fixed with the following snippet of CSS.

``` 
[data-pl-trigger] * { 
  pointer-events: none; 
}
```

This makes sure that even though you click on the child element of a trigger (an icon, a span part of the text etc). That it will ignore that event and triggers a click event on the first parent element that can handle pointer events, in this case our trigger.

## Known issues

- When a parent stops propagation, the event will never reach the root, be aware of other scripts you use.
- When the parent of the dropdown element has a transform applied, the positioning will be relative to that parent.
