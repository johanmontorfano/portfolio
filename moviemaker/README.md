# MovieMaker

Tiny utility that generates "movies" out of declarations. It supports parallax.

Heres the list of commands available:

| command                   | description                                      |
| ------------------------- | ------------------------------------------------ |
| el [id] [html_type]       | Creates a bew element with a given `id`          |
| var [name] [value]        | Sets a value                                     |
| sty [id] [prop] [val]     | Sets a style property to an element              |
| stg [...id]               | Declares a styling group beginning               |
| stg-var [name] [value]    | Set a variable for members of an `stg`           |
| [prop] [val]              | Declares a style property in a styling group     |
| stg END                   | Ends a styling group declaration                 |
| addch [selector] [...id]  | Append childs to a selected HTML element         |
| wait [duration]           | Waits a given number of milliseconds             |
| stp [id] [prop] [val]     | Sets a property to an element*                   |
| text [id] [content]       | Sets a text to an element*                       |

* The value is not auto-formatted, hence if it's a string, write it "text".


## Using parallax for an element:

To enable parallax for an element, use the following instruction:
```
plx [id] [style-range] [style_unit] [style-prop] [scroll-range]
```

## Macros:

| macro                     | description                                      |
| ------------------------- | ------------------------------------------------ |
| rand-range->[a]:[b].unit  | Generates a random number in a specific unit     |
| rand-hex->[a]:[b]         | Generates a random color between two hex colors  |
| stg-var->[name]           | Uses a value set using `stg-var`                 |
