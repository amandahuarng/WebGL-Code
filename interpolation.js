function map_point( P, Q, A, B, X )
{
  /**
  Mapping and Linear Interpolation:
  Determines the alpha value from the points P, X, and Q,
  and determines where the corresponding point should be
  between A and B.
  */
  var px = subtract(X, P);
  var pq = subtract(Q, P);
  var alpha = length(px) / length(pq);
  return mix( A, B, alpha );
}
