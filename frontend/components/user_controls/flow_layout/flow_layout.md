# GridLayout

To begin using the grid layout follow these instructions.

Decide on your parts. Two sections must be filled out.
1. The gridTemplateAreas
2. The corresponding components


## The gridTemplateAreas

An example below illustrates the general formatting. For making a grid
of various dimensions. A full horizontal category means that a
component fills the entire top area.
```javascript
let areas = [
    ['header_template header_template header_template header_template header_template header_template'],
    ['menu main main main right right'],
    ['menu footer_template footer_template footer_template footer_template footer_template']
]
```

This is the component layout. Its an association of a component linked/mapped 
to the grid area.
```javascript
let components = {
    'header': <div>Header</div>,
    'menu': <div>Menu</div>,
    'main': <div>Main</div>,
    'right': <div>Right</div>,
    'footer': <div>Footer</div>
}
```

## Rendering
To render the grid pass in the gridTemplateAreas and components to the props

```javascript
import GridLayout from "../grid_layout/grid_layout";
<GridLayout areas={areas} components={components}/>
```


## Finale

```javascript
import GridLayout from "../grid_layout/grid_layout";

... // inside a render function

let areas = [
    ['header_template header_template header_template header_template header_template header_template'],
    ['menu main main main right right'],
    ['menu footer_template footer_template footer_template footer_template footer_template']
]
let components = {
    'header': <div>Header</div>,
    'menu': <div>Menu</div>,
    'main': <div>Main</div>,
    'right': <div>Right</div>,
    'footer': <div>Footer</div>
}

<GridLayout gridTemplateAreas={areas} components={components}/>
```

<br>

![GridLayout](render_example.png)

<br>

## Customizing
To add styles to the grid or the grid items, a class name to either can be passed
down by defining the props ```grid``` and ```item```.

```javascript
<GridLayout gridClass="grid" itemClass="item" .../>
```

Now in the css file, the container and the grid items can be accessed.
```css
.grid {
    grid-gap: 10px;
    background-color: #2196F3;
    padding: 10px;
}

.item {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
}
```
<br>

![GridLayout](styled_example.png)