--Create database
Create database Jobson;
use exam;

--Drop database
drop database Jobson;

--Use database
use Jobson;

--Drop table
drop table Users;
drop table Vacancys;
drop table Company;
drop table RespondVacancies;
delete from Users;
drop table UserInfoMore;
drop table SocialNetwork;
drop table History;

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

--Create Vacancys table-------------------
Create table Vacancys(
    Id_company int not null,
	Id int IDENTITY(1,1) primary key,
	Job_title nvarchar(50) not null,
	Description nvarchar(max) not null,
	Salary nvarchar(30) not null,
	Location nvarchar(50) not null
)

--Create UsersInfo table-------------------
Create table Company(
	Id_company int not null primary key,
	NameCompany nvarchar(50) not null,
	Location nvarchar(50) not null,
	Description nvarchar(max)
)

--Create AppleVacancies table-------------------
Create table RespondVacancies(
	Id int IDENTITY(1,1) primary key,
	Id_vacancies int not null,
	Id_company int not null,
	Id_user int not null,
	Mail varchar(50) not null,
	Phone varchar(50) not null,
	FirstName nvarchar(50) not null,
	LastName nvarchar(50) not null,
	git_hub nvarchar(max),
	linked_in nvarchar(max),
	Specialization nvarchar(max),
	Expirience nvarchar(max)
)

--Create InformationUser table------------------
Create table SocialNetwork(
	Id_user int primary key,
	git_hub nvarchar(max),
	linked_in nvarchar(max),
	Specialization nvarchar(max),
	Expirience nvarchar(max)
)

Create table UserInfoMore(
	Id_user int primary key,
	Specialization nvarchar(max),
	Expirience nvarchar(max)
)

Create table History(
	Id int IDENTITY(1,1) primary key,
	Id_vacancies int not null,
	Id_user int not null,
	Job_title nvarchar(50) not null,
	Mail varchar(50) not null,
	Phone varchar(50) not null,
	FirstName nvarchar(50) not null,
	LastName nvarchar(50) not null,
	git_hub nvarchar(max),
	linked_in nvarchar(max),
	Specialization nvarchar(max),
	Expirience nvarchar(max)
)