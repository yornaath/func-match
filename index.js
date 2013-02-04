
module.exports = function( name ) {
  return function( obj ) {
    return obj[ name ]
  }
}

module.exports.backbone = function( name ) {
  return function( obj ) {
    return obj.get( name )
  }
}