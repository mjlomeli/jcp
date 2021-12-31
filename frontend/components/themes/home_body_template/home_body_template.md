# CardListing

The card layout renders a component, and has the ability
to flip like a playing card on a click onto another component.
To begin using the card layout follow these instructions.

Decide on your parts. Two sections must be filled out.
1. The front of the card
2. The back of the card


## Either side of the card must be a component

An example below illustrates the general component to be the front and back.

```javascript
// front of card_layout
let ace_hearts = <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg" alt="ace_hearts"/>

// back of card_layout
let ace_spades = <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/703px-01_of_spades_A.svg.png" alt="ace_spades"/>
```

## Rendering
To apply these two into the card layout, assign the props ```front``` and ```back``` to
each respectively.
```javascript
<CardLayout front={ace_hearts} back={ace_spades} />
```

## Finale
Lets put it all together.

```javascript
import CardLayout from "../card_layout/card_layout";

... // inside a render function

let ace_hearts = <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_heart_A.svg"
                      alt="ace_hearts"/>
let ace_spades = <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/703px-01_of_spades_A.svg.png"
    alt="ace_spades"/>

<CardLayout front={ace_hearts} back={ace_spades}/>
```

<br>

![CardLayout](render_example.png)

<br>

## Customizing

### Custom onClick
To add your own onClick, pass your onClick method to the props called ```onClick```. It will override the
flip.
```javascript
<CardLayout onClick={() => myOnClickFunction} .../>
```