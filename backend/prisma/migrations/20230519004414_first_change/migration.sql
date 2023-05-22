/*
  Warnings:

  - You are about to drop the `Tokens` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Tokens] DROP CONSTRAINT [FK_Tokens_Users];

-- DropForeignKey
ALTER TABLE [dbo].[Vacancys] DROP CONSTRAINT [FK_Vacancys_Company];

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Company__465FEAEA900221FC', N'PK__Company__465FEAEA39ED3FD7';
ALTER TABLE [dbo].[Company] ADD [Description] NVARCHAR(max);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Vacancys__3214EC0773B6A8F2', N'PK__Vacancys__3214EC0726CC33B0';
ALTER TABLE [dbo].[Vacancys] ALTER COLUMN [Description] NVARCHAR(max) NOT NULL;

-- DropTable
DROP TABLE [dbo].[Tokens];

-- CreateTable
CREATE TABLE [dbo].[RespondVacancies] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Id_vacancies] INT NOT NULL,
    [Id_company] INT NOT NULL,
    [Id_user] INT NOT NULL,
    [Mail] VARCHAR(50) NOT NULL,
    [Phone] VARCHAR(50) NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [git_hub] NVARCHAR(max),
    [linked_in] NVARCHAR(max),
    [Specialization] NVARCHAR(max),
    [Expirience] NVARCHAR(max),
    CONSTRAINT [PK__RespondV__3214EC07ABF777DB] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[SocialNetwork] (
    [Id_user] INT NOT NULL,
    [git_hub] NVARCHAR(max),
    [linked_in] NVARCHAR(max),
    [Specialization] NVARCHAR(max),
    [Expirience] NVARCHAR(max),
    CONSTRAINT [PK__SocialNe__B607F2482AE6AECC] PRIMARY KEY CLUSTERED ([Id_user])
);

-- AddForeignKey
ALTER TABLE [dbo].[Vacancys] ADD CONSTRAINT [FK_Vacancys_Company] FOREIGN KEY ([Id_company]) REFERENCES [dbo].[Company]([Id_company]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RespondVacancies] ADD CONSTRAINT [FK_RespondVacancies_Vacancys] FOREIGN KEY ([Id_vacancies]) REFERENCES [dbo].[Vacancys]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SocialNetwork] ADD CONSTRAINT [FK_SocialNetwork_Users] FOREIGN KEY ([Id_user]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
