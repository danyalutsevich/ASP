CREATE TABLE Employee (
	Id INT IDENTITY(1,1),
	Name NVARCHAR(100),
	DepartmentName NVARCHAR(100),
	DateOfJoin DATE,
	PhotoFileName NVARCHAR(300)
)



INSERT INTO Employee VALUES(
	'Ann',
	'Designers',
	'2022-03-03',
	'spic.png'
)

SELECT * FROM Employee




