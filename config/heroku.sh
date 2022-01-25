git push heroku main && heroku pg:reset --confirm jcp-crafter && heroku run rails db:migrate db:seed || \
heroku login && git push heroku main && heroku pg:reset --confirm jcp-crafter && heroku run rails db:migrate db:seed || \
heroku login && heroku git:remote -a jcp-crafter && git push heroku main && heroku pg:reset --confirm jcp-crafter && heroku run rails db:migrate db:seed \
