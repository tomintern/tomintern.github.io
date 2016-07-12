
printf "%-14s%14s\n", $_, ~~reverse
   for map {
      ($.,$i,$c) = split',';
      ($"x$i).($.x$c)
   } qw(

      P,5,3
      L,3,8
      O,1,11
      Y,0,13
      P,1,13
      L,3,11
      O,5,9
      Y,7,7
      P,8,6
      L,10,4
      O,12,2
      Y,13,1

   )



