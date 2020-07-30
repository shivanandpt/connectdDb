# connectdDbHow to connect to the different DBs

# MongoDB

Add .env file and root level of project and add

    NODE_ENV = development
    DB_TYPE = Mongodb

Add DB configs to the developmentMongodb.json file and it will connect to given DBS.
It uses MongoDB to connect the DB.

# MySql

Add .env file and root level of project and add

    NODE_ENV = development
    DB_TYPE = MySql

Add DB configs to the developmentMySql.json file and it will connect to given DBS. 

# Connection test 

You can test the connection by code present in the router/index.js file.
Choose the module depending upon your DB type.
Both DB APIs have added in code, comment the one which you don't need

One server is running hit both APIs using postman or any code of your choice.
It will return an empty array if DB is MongoDB.
And will return an error if DB is MySql.

You can add data in respective collections/tables and check with APIif you want to.