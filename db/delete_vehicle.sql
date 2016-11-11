DELETE FROM Vehicles
Where id = Cast($1 as int);
