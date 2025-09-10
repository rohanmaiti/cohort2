# LIfe cycle of SQL data base 
1. Bring up your DB [` a) either localy b) buy db `]
2. define schemas 
3. put datas
4. update schema


## how to connect to a DB in your system through docker 

step-1: pull postgressql image if not exists [` docker pull postgres@latest `]

step-2: start a container in the background [` docker run --name my-postgres -e POSTGRES_PASSWORD=admin123 -d -p 5432:5432 postgres `]
        # the above command will pull a image postgres if not present and will start a postgres server in the background
        what if you alreay have psql image and container in your system ? 
        [` docker start <container id> `]

step-3  get connect with the server using 1. your terminal (need to install psql in your system ) then 
        run [` psql -h localhost -p 5432 -U postgres `]
        or got inside the server ( no need to install psql in your system as the server already have psql installed )
        run [` docker exec -it <container id> bash`]

## now you can query in the server/database ;
1. to see all tables --> `\dt`
2. to exit `\dq`
3. to see table schema `\d table_name`

# DDL (CREATE, ALTER, DROP, TRUCATE, RENAME);
## CREATE

`CREATE TABLE IF NOT EXISTS table_name (
    patient_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 0 and age <=28),
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    admitted_on DATE DEFAULT CURRENT_DATE
);`
## ALTER (Used to modify the structure of an  existing table)
### Add a Column
`ALTER TABLE table_name ADD COLUMN column_name VARCHAR(15) NOT NULL ;`

### Modify column 
`ALTER TABLE users ADD COLUMN dept VARCHAR(10) DEFAULT '101'; `

`ALTER TABLE table_name ALTER COLUMN target_column SET NOT NULL`

`ALTER TABLE table_name ALTER COLUMN target_column  SET DEFAULT 'p';`

`ALTER TABLE patients ADD CONSTRAINT target_col_name CHECK (age >= 0 AND age <= 120);`


### Drop column 
`ALTER TABLE table_name DROP COLUMN target_column_name;`

## DROP  and TRUNCATE (Used to delete a table or database permanently)
### Drop a Table
`DROP TABLE table_name;`

### Trancate
`TRUNCATE TABLE table_name;`

## RENAME (Used to Rename Table or Column)
`ALTER TABLE table_name to new_table_name;`

`ALTER TABLE table_name RENAME target_col_name TO new_target_col_name;`




 