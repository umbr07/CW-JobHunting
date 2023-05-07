BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Company] (
    [Id_company] INT NOT NULL,
    [NameCompany] NVARCHAR(50) NOT NULL,
    [Location] NVARCHAR(50) NOT NULL,
    CONSTRAINT [PK__Company__465FEAEA900221FC] PRIMARY KEY CLUSTERED ([Id_company])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B617EED7C88] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[Tokens] (
    [Id_users] INT NOT NULL,
    [refreshToken] NVARCHAR(max),
    CONSTRAINT [PK__Tokens__98157C6D35BB440A] PRIMARY KEY CLUSTERED ([Id_users])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Mail] VARCHAR(50) NOT NULL,
    [Password] VARCHAR(max) NOT NULL,
    [Phone] VARCHAR(50) NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL,
    [LastName] NVARCHAR(50) NOT NULL,
    [Role] INT NOT NULL CONSTRAINT [DF__Users__Role__49C3F6B7] DEFAULT 0,
    CONSTRAINT [PK__Users__3214EC07B40E8DA8] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[Vacancys] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Id_company] INT NOT NULL,
    [Job_title] NVARCHAR(50) NOT NULL,
    [Description] NVARCHAR(50) NOT NULL,
    [Salary] NVARCHAR(30) NOT NULL,
    [Location] NVARCHAR(50) NOT NULL,
    CONSTRAINT [PK__Vacancys__3214EC0773B6A8F2] PRIMARY KEY CLUSTERED ([Id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Company] ADD CONSTRAINT [FK_Company_Users] FOREIGN KEY ([Id_company]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Tokens] ADD CONSTRAINT [FK_Tokens_Users] FOREIGN KEY ([Id_users]) REFERENCES [dbo].[Users]([Id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Vacancys] ADD CONSTRAINT [FK_Vacancys_Company] FOREIGN KEY ([Id_company]) REFERENCES [dbo].[Company]([Id_company]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
