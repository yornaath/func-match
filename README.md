
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
var __ = match.__

var foo = match([String, __], 'string *',
                [__, Number], '* number')

foo('bar', {})
// -> 'string *'

foo(false, 42)
// -> '* number'

```
