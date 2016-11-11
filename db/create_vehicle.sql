INSERT INTO Vehicles (make,model,year,ownerId)
Select $1,$2,Cast($3 as int),Cast($4 as int)
RETURNING *;
