select recipe_id from favorites 
where user_id=$1;
-- select recipe_id
-- from favorites
-- join users on favorties.user_id=users.id;

/* i feel like i need to do a join here :P */