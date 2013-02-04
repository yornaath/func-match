
var __ = {}

function match( form ) {
  var form
  
  form = createForm( toArray(arguments) )
  
  return function() {
    var args, i, seq, pattern, then

    args = toArray( arguments )

    for( i = 0; i < form.length; i++ ) {

      seq = form[ i ]

      pattern = seq[ 0 ]
      then = seq[ 1 ]

      if( isMatch(pattern, args) ) {
        return typeof then === 'function' ? then.apply( this, args ) : then
      }

    }

    throw new TypeError( 'no match found for' )
  }
}


function isMatch( pattern, args ) {
  var i, match, cand, matches

  matches = 0

  for( i = 0; i < pattern.length; i++ ) {
    match = pattern[ i ]
    cand = args[ i ]

    if( match === __ ) matches++
    if( match == Number && typeof cand == 'number' ) matches++
    if( match == String && typeof cand == 'string' ) matches++
    if( typeof match == 'function' && cand instanceof match ) matches++
    if( match === cand ) matches++

  }

  return matches === pattern.length
}


function createForm( array ) {
  var form, i, item, seq

  form = []

  for (i = 0; i < array.length; i++) {
    item = array[ i ]
    if( i === 0 || !(i % 2) ) {
      seq = []
    } else {
      form.push( seq )  
    }
    seq.push( item )
  }

  return form
}


function toArray( args ) {
  return Array.prototype.slice.call( args, 0 )
}

module.exports = match
module.exports.__ = __