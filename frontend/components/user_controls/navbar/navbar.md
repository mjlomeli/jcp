# Navbar

The navbar layout renders a component, and has the ability
to assemble a navbar link header.

Decide on your parts. Two distinct parts must be filled out.
1. The navigation bar belt.
2. The drop down content.

## Setting up the data

This is an example of navbar to dropdown relations.
```javascript
let entries = {
    "home": "#",    // navbar link titled Home_page and an href="#"
    "dropdown": {   // navbar link titled Dropdown with no href
        "Link 1": "#", // the Dropdown has a 1 dropdown titled "Link 1" with href="#"
    }
}
```


Here is another example with more parts.
```javascript
let entries = {
    "home": "#",    // no dropdown
    "news": "#",    // no dropdown
    "dropdown": {   // has 3 drop downs
        "link 1": "#",
        "link 2": "#",
        "link 3": "#"
    }
}
```

## Rendering
To apply this navbar assign the prop ```navEntries```.

```javascript
import NavbarLayout from "./navbar";

<NavbarLayout navEntries={entries}/>
```

## Finale
Lets put it all together.

```javascript
import NavbarLayout from "./navbar";

... // inside a render function

let entries = {
    "Home_page": "#",    // no dropdown
    "News": "#",    // no dropdown
    "Dropdown": {   // has 3 drop downs
        "Link 1": "#",
        "Link 2": "#",
        "Link 3": "#"
    }
}
<NavbarLayout navEntries={entries}/>
```

<br>

![NavbarLayout](render_example.png)
