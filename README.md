
### prop

```javascript

var prop = require( 'func-prop' )

var fighters = [
  {name: 'Evander'},
  {name: 'Muhammed'},
  {name: 'Mike'}
]

fighters.map( prop('name') ) 
//-> ['Evander', 'Muhammed', 'Mike']

```

### invoke.backbone

Allso works with backbone style model objects that has the method get

```javascript

var prop = require( 'func-prop' ).backbone

var fighters = new FightersCollection()
figthers.reset( fighters )

fighters.map( prop('name') )
//-> ['Evander', 'Muhammed', 'Mike']
```