it is a boilerplate of CRUD operation for a full stack application: Flask backend, 

React frontend, and a SQLITE databasea.

1) to start flask server :

create virtual environment for the server :

pip3 install pipenv

pipenv shell

pipenv install 

pipenv install flask flask_sqlalchemy flask_marshmallow marshmallow-sqlalchemy python-dotenv

create db for the server :

from app import db

db.create_all()

exit()

start server :

python3 app.py 

or 

flask run


2) test CRUD api of flask server from Postman 

a) Create a product 

POST at http://localhost:5000/product

set Content-Type   application/json

set Content-Length  calculated when request is sent 

set accpt  */*

set  body raw json, e.g. 

{
    "name": "item-10",

    "description": "super good orange ",

    "price": 5.78,

    "qty": 1800
}

b) Read

GET at http://localhost:5000/product

or

GET at http://localhost:5000/product/<id>

GET at http://localhost:5000/product/1

c) Update a product 

PUT at http://localhost:5000/product/<id>

PUT at http://localhost:5000/product/1

set Content-Type   application/json

set Content-Length  calculated when request is sent 

set accpt  */*

set  body raw json, e.g. 

{
    "name": "item-10-updated",

    "description": "updated super good orange ",

    "price": 5.78,

    "qty": 1800
}

d) Delete

Delete at http://localhost:5000/product/<id>

DELETE at http://localhost:5000/product/1


3) start react frontend app 

yarn instll

yarn start 

