USE [master]
GO
/****** Object:  Database [Jobson]    Script Date: 06.04.2023 9:43:35 ******/
CREATE DATABASE [Jobson]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Jobson', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.RDCB\MSSQL\DATA\Jobson.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Jobson_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.RDCB\MSSQL\DATA\Jobson_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Jobson] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Jobson].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Jobson] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Jobson] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Jobson] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Jobson] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Jobson] SET ARITHABORT OFF 
GO
ALTER DATABASE [Jobson] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Jobson] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Jobson] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Jobson] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Jobson] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Jobson] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Jobson] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Jobson] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Jobson] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Jobson] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Jobson] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Jobson] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Jobson] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Jobson] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Jobson] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Jobson] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Jobson] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Jobson] SET RECOVERY FULL 
GO
ALTER DATABASE [Jobson] SET  MULTI_USER 
GO
ALTER DATABASE [Jobson] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Jobson] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Jobson] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Jobson] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Jobson] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Jobson] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Jobson', N'ON'
GO
ALTER DATABASE [Jobson] SET QUERY_STORE = OFF
GO
USE [Jobson]
GO
/****** Object:  Table [dbo].[Company]    Script Date: 06.04.2023 9:43:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Company](
	[Id_company] [int] IDENTITY(1,1) NOT NULL,
	[NameCompany] [nvarchar](50) NOT NULL,
	[Location] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_company] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RespondVacancies]    Script Date: 06.04.2023 9:43:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RespondVacancies](
	[Id_vacancies] [int] NOT NULL,
	[Id_user] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_vacancies] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tokens]    Script Date: 06.04.2023 9:43:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tokens](
	[Id_users] [int] NOT NULL,
	[refreshToken] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_users] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 06.04.2023 9:43:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Mail] [varchar](50) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Phone] [varchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Role] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vacancys]    Script Date: 06.04.2023 9:43:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vacancys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Id_company] [int] NOT NULL,
	[Job_title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[Salary] [nvarchar](30) NOT NULL,
	[Location] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [Role]
GO
ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_Users] FOREIGN KEY([Id_company])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_Users]
GO
ALTER TABLE [dbo].[RespondVacancies]  WITH CHECK ADD  CONSTRAINT [FK_RespondVacancies_Users] FOREIGN KEY([Id_user])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[RespondVacancies] CHECK CONSTRAINT [FK_RespondVacancies_Users]
GO
ALTER TABLE [dbo].[RespondVacancies]  WITH CHECK ADD  CONSTRAINT [FK_RespondVacancies_Vacancys] FOREIGN KEY([Id_vacancies])
REFERENCES [dbo].[Vacancys] ([Id])
GO
ALTER TABLE [dbo].[RespondVacancies] CHECK CONSTRAINT [FK_RespondVacancies_Vacancys]
GO
ALTER TABLE [dbo].[Tokens]  WITH CHECK ADD  CONSTRAINT [FK_Tokens_Users] FOREIGN KEY([Id_users])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Tokens] CHECK CONSTRAINT [FK_Tokens_Users]
GO
ALTER TABLE [dbo].[Vacancys]  WITH CHECK ADD  CONSTRAINT [FK_Vacancys_Company] FOREIGN KEY([Id_company])
REFERENCES [dbo].[Company] ([Id_company])
GO
ALTER TABLE [dbo].[Vacancys] CHECK CONSTRAINT [FK_Vacancys_Company]
GO
USE [master]
GO
ALTER DATABASE [Jobson] SET  READ_WRITE 
GO
