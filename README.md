# Inventory Management System
## Introduction
This is a simple inventory management system that allows users to add, delete and filter through inventories. The inventory is stored in a database and can be accessed by multiple users at the same time. The system also allows users to search for items in the inventory by name, category, or price.

## Technologies
Front-end: HTML, CSS, JavaScript, Bootstrap, React, Typescript
Back-end: C#, ASP.NET Core, Entity Framework Core
Database: PostgreSQL

## Installation
1. Clone the repository
2. Navigate to client folder and run `npm install`
3. Navigate to server folder and run `dotnet restore`
4. Create a database in PostgreSQL
5. Update the connection string in `appsettings.json` in server folder
6. Run `dotnet ef database update` in server folder
7. Run `dotnet run` in server folder
8. Run `npm run dev` in client folder
9. Open http://localhost:5173 in browser

