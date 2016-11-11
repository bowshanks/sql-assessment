Update Vehicles set ownerid = NULL
Where id = CAST($1 as int);
