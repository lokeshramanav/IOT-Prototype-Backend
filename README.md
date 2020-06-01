# IOT-Prototype-Backend

## Technologies Used In Creating The Prototype
- Backend :  NodeJS , Sequelize ORM
- Frontend:  ReactJS
- Database:  MySQL
- Mocha - Javascript Testing Framework and chai assertion library

## My Approach To Solve The Challenge
- Step 1: My Database was designed as per the following ER Diagram
![](images/dbschema.jpg)
- Step 2: For every incoming request the following checks are made before the slots are assigned for the request

        check 1: Check if there is record in the bookingsDetails table for the Mall , start date , start time for the incomin request
        check 2: if no 


