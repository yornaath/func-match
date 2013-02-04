
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
