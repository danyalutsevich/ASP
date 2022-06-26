CREATE TABLE Employee (
	Id INT IDENTITY(1,1),
	Name NVARCHAR(100),
	DepartmentName NVARCHAR(100),
	DateOfJoin DATE,
	PhotoFileName NVARCHAR(300)
)



INSERT INTO Employee VALUES(
	'Lisa',
	'Sales',
	'2022-06-24',
	'userpic.png'
)

SELECT * FROM Employee


