

/**
 * Wildcard
 *
 * @api public
 */
var __ = {}


/**
 * Pattern matcher
 *
 * @api public
 *
 * @param {Array<Array>} form
 * @return {*}
 */
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

/**
 * Matches a pattern against arguments
 *
 * @api private
 *
 * @param {Array} pattern
 * @param {Array} args
 * @return {Boolean}
 */
function isMatch( pattern, args ) {
  var i, match, cand, matches

  matches = 0

  for( i = 0; i < pattern.length; i++ ) {

    match = pattern[ i ]
    cand = args[ i ]

    if( match === __ ) matches++
    else if( match == Number && typeof cand == 'number' ) matches++
    else if( match == String && typeof cand == 'string' ) matches++
    else if( typeof match == 'function' && isInstanceOf(cand, match) ) matches++
    else if( match === cand ) matches++

  }

  return matches === pattern.length
}


/**
 * Checks if a candidate value is instance of match
 *
 * @api private
 *
 * @param {*} cand
 * @param {*} match
 * @return {Boolean}
 */
function isInstanceOf( cand, match ) {
  return cand instanceof match
}


/**
 * Creates an array containing tupples of pattern and fn
 *
 * @api private
 *
 * @param {Array} array
 * @return {Array<Array>}
 */
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


/**
 * Creates a new array from Arguments
 *
 * @api private
 *
 * @param {Arguments} args
 * @return {Array}
 */
function toArray( args ) {
  return Array.prototype.slice.call( args, 0 )
}


module.exports = match;
module.exports.__ = __;