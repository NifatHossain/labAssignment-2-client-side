# User Managenent System

This is a basic webapp where at first user need to register. After registration users will be redirected to login page. After login with valid user email and password, users will be redirected to a page where they can watch all of his personal information, those he provided while registration.

In the user details page there are three buttons. Update info, Log out and delete user button. These buttons allow users to do these specific tasks.



## project setup

In order to use this web App first we need to need to create a new database in mysql using xammp, database name must be 'nifatassignment2'

## sql query:
```
create database nifatassignment2;

create table users(id int primary key auto increment, fName varchar(20), lName varchar(20), gender varchar(10), birthDate varchar(20), email varchar(30), password varchar(20), image varchar(200));

create table currentuser(email varchar(30));
```
## Client & server site 
For client site you don't need to set up or open the client site code just open the live site link provided in this repository which is,

live site: https://nifathossain.github.io/labAssignment-2-client-side/

for server site you should open the 'server-site' folder in your vs code . Then in command prompt of this directory run "npm i" which will install all required packages those are necessary to run the server site.

then in command prompt run "nodemon index.js" this will make the server run in your port:3000. 

After than you can use the web app properly from the live site in your local PC.
