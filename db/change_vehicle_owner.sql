Update Vehicles set ownerId = CAST($1 as int)
Where id = CAST($2 as int)
RETURNING *;
