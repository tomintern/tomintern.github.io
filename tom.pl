<<<<<<< HEAD
printf "%-14s%14s\n", $_, ~~reverse
   for map {
      ($.,$i,$c) = split',';
      ($"x$i).($.x$c)
   } qw(

      C,5,3
      H,3,8
      E,1,11
      E,0,13
      R,1,13
      C,3,11
      H,5,9
      E,7,7
      E,8,6
      R,10,4
      C,12,2
      H,13,1

   )
=======
printf "%-14s%14s\n", $_, ~~reverse
   for map {
      ($.,$i,$c) = split',';
      ($"x$i).($.x$c)
   } qw(

      C,5,3
      H,3,8
      E,1,11
      E,0,13
      R,1,13
      C,3,11
      H,5,9
      E,7,7
      E,8,6
      R,10,4
      C,12,2
      H,13,1

   )
>>>>>>> 2af912c16f412bb58e672de9561b3cd0a71b7503
