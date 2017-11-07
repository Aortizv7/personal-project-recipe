delete from favorites
where recipe_id=$1
and user_id=$2;