Select v.*
From Vehicles v join Users u on v.ownerId=u.id
Where u.email = $1;
