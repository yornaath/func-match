
### match

```javascript

var match = require( 'func-match' )

var concat = match([String, String], function( a, b ){
                     return a + b
                   },
                   [String, Number], function( a, b ) {
                     return a + '::' + b
                   })

concat( 'foo', 'bar' )
// -> 'foobar'

concat( 'foo', 13 )
// -> 'foo::13

```

#### wildcard
```javascript
var foo = match([String, __],         'string *',
                [__, String],         '* number')

foo('bar', 19)
// -> 'string *'

foo(false, 'bar')
// -> '* string'

```
