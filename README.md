# red-green-light

## Requirements

This project requires the use of `node version 16`. Please ensure you have the correct version currently active. 

Alternatively, use `node version manager` to use multiple versions of node: https://github.com/coreybutler/nvm-windows/releases

## Starting your MySQL server
For Red Light Green Light we decided to use MySQL. To set it up locally we tried to make it as easy as possible, so if you haven't already, use the following steps to get MySQL up and running. (But if you already have, refer to [Setting up the database](#setting-up-the-database))

### Intsalling MySQL Workbench
MySQL workbench comes with all the features we need to set up our databases.

Please download MySQL from the following link: https://dev.mysql.com/downloads/installer/

Remember, you don't need to log in. Just click `No thanks, just start my download`.

Be sure that you're downloading **version 8**!

Go through the setup, taking note of the following steps:

On the Install screen select the full package:

![Choose setup type](readme_images/choose_setup_type.png)

### Already have it installed, but forgot your password?
We all forget our root password sometimes (I know I did), so here's a tutorial just for you: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html

### Setting up the database
Now that we have MySQL primed and ready, create a new database connection:

![Add a new connection](readme_images/add_connection.png)

You can leave the options as they are:

![Create connection](readme_images/create_connection.png)

Test the connection to make sure it works (using the password for your root account) and click OK

---

## Initializing the DB

Create a `.env` file in your root folder `red-green-light/.env` with the following structure:

```
JWT={YOUR_JWT_KEY}
DB_USER={YOUR_DB_USER}
DB_PASS={YOUR_DB_PASSWORD}
DB_PORT=3306
DB_HOST=127.0.0.1
DB_AUTH=authdatabase
DB_GAME=gamedatabase

SESSION_SECRET={YOUR_SESSION_SECRET}

AUTH_PORT=4000
GAME_PORT=3000

AUTH_URL=http://localhost:4000
GAME_URL=http://localhost:3000
```

If you setup your MySQL server (or the respective apps) on a different port, please ensure you change the information appropriately. **THERE SHOULD BE NO BRACES (`{}`) WHEN YOU'RE DONE**

An example of JWT: `JWT=6b9d56e33e9428a65a669bde925193d588b2657c`.

An example of SESSION_SECRET: `SESSION_SECRET=SOSECRET`.

To intitialize the database, navigate to `red-green-light/database` and run the following command:

```bash
npm i && npm start
```

This will create all the necessary tables and databases.

---

## Starting the server

Now all that's left to do is run the server. Make sure you're in the root folder `red-green-light` and run the bash script: `run.sh`. 

```bash
./run.sh
```

If you don't have a bash terminal, please run the following commands in separate terminals:

```bash
cd auth/ && npm i && npm start
```

```bash
cd resource/ && npm i && npm start
```

The server will now be running on http://localhost:3000 (Game) and http://localhost/4000 (Auth)

## Authors

Kayden Kara  

Jesse Van Der Merwe  

Jared Swanzen  

