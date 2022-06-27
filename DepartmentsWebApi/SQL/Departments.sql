CREATE TABLE Departments(
	Id INT IDENTITY(1,1),
	Name NVARCHAR(100)
)

	SELECT * FROM Departments


INSERT INTO Departments VALUES('Support')

DECLARE @depName NVARCHAR(100)
SET @depName = 'Media'

INSERT INTO Departments VALUES (@depName)

DELETE FROM Departments WHERE Id = 6