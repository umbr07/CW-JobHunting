--Create database
Create database Jobson;
use exam;

--Drop database
drop database Jobson;

--Use database
use Jobson;

--Create table
--Create Users table-------------------
Create table Users(
	Id int IDENTITY(1,1) primary key,
	Mail varchar(50) not null,
	Password varchar(max) not null,
	Phone varchar(50) not null,
	FirstName nvarchar(50) not null,
	LastName nvarchar(50) not null,
	Role int not null default 0,
)

drop table Users;
--Create Vacancys table-------------------
Create table Vacancys(
	Id int IDENTITY(1,1) primary key,
	Id_company int not null,
	Job_title nvarchar(50) not null,
	Description nvarchar(50) not null,
	Salary nvarchar(30) not null,
	Location nvarchar(50) not null
)

drop table Vacancys;

--Create UsersInfo table-------------------
Create table Company(
	Id_company int IDENTITY(1,1) primary key,
	NameCompany nvarchar(50) not null,
	Location nvarchar(50) not null,
)

drop table Company;

--Create AppleVacancies table-------------------
Create table RespondVacancies(
	Id_vacancies int not null primary key,
	Id_user int not null,
)

drop table RespondVacancies;

--Create Token table----------------------------
Create table Tokens(
	Id_users int not null primary key,
	refreshToken nvarchar(max) 
)
drop table Tokens;