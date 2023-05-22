BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[RespondVacancies] DROP CONSTRAINT [FK_RespondVacancies_Vacancys];

-- AddForeignKey
ALTER TABLE [dbo].[RespondVacancies] ADD CONSTRAINT [FK_RespondVacancies_Vacancys] FOREIGN KEY ([Id_vacancies]) REFERENCES [dbo].[Vacancys]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
