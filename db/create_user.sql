INSERT INTO Users (firstname,lastname,email)
Select $1,$2,$3
Returning *;
