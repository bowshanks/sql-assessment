Select u.firstname,u.lastname,v.*
From Vehicles v join Users u on v.ownerId=u.id
Where u.firstname like $1||'%';
