Select u.firstname,u.lastname,v.*
From Vehicles v join Users u on v.ownerId=u.id
Where year > 2000
Order by year desc;
