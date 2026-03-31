-- SQL Server
CREATE TABLE Employees (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50)
);

INSERT INTO Employees (FirstName, LastName)
VALUES ('John', 'Doe'), ('Jane', 'Doe');

SELECT TOP(1) FirstName + ' ' + LastName AS FullName
FROM Employees
ORDER BY ID;

CREATE PROCEDURE GetFullName @ID INT AS
BEGIN
    SELECT FirstName + ' ' + LastName AS FullName
    FROM Employees
    WHERE ID = @ID;
END;

EXEC GetFullName 1;