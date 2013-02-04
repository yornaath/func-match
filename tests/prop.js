
var prop    = require( '../index' ),
    bprop   = prop.backbone,
    assert  = require( 'assert' )



describe('func-prop', function() {


  var users = [
    {name: 'a', get: get},
    {name: 'b', get: get},
    {name: 'c', get: get}
  ]

  function get( prop ) {
    return this[ prop ]
  }



  it('should return a function that returns the correct property on an object', function() {

    var names = users.map( prop('name') )

    assert.deepEqual( names, ['a', 'b', 'c'] )

  })

  it('should work with backbone style model objects', function() {
  
    var names = users.map( bprop('name') )

    assert.deepEqual( names, ['a', 'b', 'c'] )

  })

})