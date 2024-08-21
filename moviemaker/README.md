# MovieMaker

Tiny utility that generates "movies" out of declarations. It supports parallax.

Heres the list of commands available:

| command                   | description                                      |
| ------------------------- | ------------------------------------------------ |
| el [id] [html_type]       | Creates a new element with a given `id`          |
| gel [id] [sel]            | Load an element from the DOM                     |
| var [name] [value]        | Sets a value                                     |
| rvar [name] [value]       | Sets a runtime value*                            |
| sty [id] [prop] [val]     | Sets a style property to an element              |
| stg [...id]               | Declares a styling group beginning               |
| stg-var [name] [value]    | Set a variable for members of an `stg`           |
| [prop] [val]              | Declares a style property in a styling group     |
| stg END                   | Ends a styling group declaration                 |
| addch [selector] [...id]  | Append childs to a selected HTML element         |
| wait [duration]           | Waits a given number of milliseconds             |
| stp [id] [prop] [val]     | Sets a property to an element*                   |
| text [id] [content]       | Sets a text to an element*                       |
| for [variable]            | Loops through the items of an array              |
| for END                   | Ends a `for` statement                           |
| js                        | Starts a raw JS block                            |
| js END                    | Ends a raw JS block                              |

- `*` The value is not auto-formatted, hence if it's a string, write it "text".
- `var`-declared values can be accessed with `$`
- `rvar`-declared values can be accessed with `@`

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
| for-item->[prop]          | Selects a property of a looped object            |
| for-item->index           | Uses the index of the currently looped object    |
| for-item->@               | Uses a value loop through with `for`             |
| json-get->[path]          | Loads a JSON resource using `fetch` at runtime   |
| rconcat->[a]:[b]          |  Concat two values at runtime                    |
