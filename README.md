# red-green-light

## Starting your MySQL server
For Red Light Green Light we decided to use MySQL. To set it up locally we tried to make it as easy as possible, so if you haven't already, use the following steps to get MySQL up and running. (But if you already have, refer to [Setting up the database](#setting-up-the-database))

### Intsalling MySQL Workbench
MySQL workbench comes with all the features we need to set up our databases.

Please download MySQL from the following link: https://dev.mysql.com/downloads/workbench/

Be sure that you're downloading **version 8**!

### Already have it installed, but forgot your password?
We all forget our root password sometimes (I know I did), so here's a tutorial just for you: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html

### Setting up the database
Now that we have MySQL primed and ready, create a new database connection. You can leave the options as they are:

![Create Connection](readme_images/create_connection.png)

Test the connection to make sure it works (using the password for your root account) and click OK

---

To intitialize the database, navigate to `red-green-light/database` and run `npm start`. This will create all the necessary tables and databases.
