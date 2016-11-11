Update Vehicles set ownerId = NULL
Where id = CAST($2 as int);
