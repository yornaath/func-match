
var match   = require( '../index' ),
    assert  = require( 'assert' )



describe('func-match', function() {



  it('should match values or types and return the match', function() {

    var nrmatch = match( [1],       'one',
                         [2],       'two',
                         [Number],  'number' )

    assert.equal( nrmatch(1), 'one' )
    assert.equal( nrmatch(2), 'two' )
    assert.equal( nrmatch(8), 'number' )

  })

  it('should work with several values', function() {

    var matcher = match( [1,2,3], '123',
                         [4,5,6], '456' )

    assert.equal( matcher(1,2,3), '123' )
    assert.equal( matcher(4,5,6), '456' )

  })

  it('should lazily invoke and return the returned value if the match is a function', function() {

    var lazy = match( [String], function( string ) { return "string" } )

    assert.equal( lazy('s'), 'string' )

  })

  it('should work with constructed native types and literals', function() {

    var isString = match( [String], function() { return true } )

    assert.equal( isString(new String("string")), true )
    assert.equal( isString("string"), true )

  })

  it('should invoke the matching function with the parameters passed', function() {

    var concat = match( [String, String], function( a, b ) { 
                          return a + b 
                        },
                        [String, Number], function( s, n ) { 
                          return s + ':' + n 
                        })

    assert.equal( concat('foo', 'bar'), 'foobar' )
    assert.equal( concat('foo', 12), 'foo:12' )

  })

  it('should work with user types', function() {

    function MyType() {}

    var takesMyType = match([MyType, String], function( myType, string ) {
                              return 1
                            },
                            [MyType], function() {
                              return 2
                            },
                            [String], function() {
                              return 3
                            })

    var myType = new MyType

    assert.equal( takesMyType(myType, "lol"), 1 )
    assert.equal( takesMyType(myType), 2 )
    assert.equal( takesMyType("lol"), 3 )

  })

  describe('wildcard', function() {

    var __ = match.__

    it('should match on any using the match.__', function() {

      var foo = match( [String, __],         'string*',
                       [__, String],         '*string',
                       [Number, __, String], 'number*string')

      assert.equal( foo('lol', true), 'string*' )
      assert.equal( foo(false, 'lol'), '*string' )
      assert.equal( foo(42, {}, 'lol'), 'number*string' )

    })

  })


})

