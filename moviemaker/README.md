# MovieMaker

Tiny utility that generates "movies" out of declarations. It supports parallax.

Heres the list of commands available:

| command                   | description                                      |
| ------------------------- | ------------------------------------------------ |
| el [id] [html_type]       | Creates a bew element with a given `id`          |
| var [name] [value]        | Sets a value                                     |
| sty [id] [prop] [val]     | Sets a style property to an element              |
| stg [...id]               | Declares a styling group beginning               |
| [prop] [val]              | Declares a style property in a styling group     |
| stg END                   | Ends a styling group declaration                 |
| addch [selector] [...id]  | Append childs to a selected HTML element         |

## Using parallax for an element:

To enable parallax for an element, use the following instruction:
```
plx [id] [style-range] [scroll-range]
```
