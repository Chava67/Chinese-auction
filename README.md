
# Chinese Auction Management - Online Donation System

An advanced online donation and sales management system designed to provide a smooth and secure user experience. The system includes various features for managing the purchase process efficiently, from login and registration pages to ticket purchases for raffles and email notifications for winners.

## System Features

- **User Pages**: Easy-to-use login and registration pages.
- **Product Filtering**: Filter products by categories, including descriptions and prices.
- **Shopping Cart**: Full shopping cart functionality for managing ticket purchases.
- **Client Management**: Update client details with ease.
- **Raffle Execution**: System for organizing raffles and automatically sending emails to winners.
- **Maximum Security**: JWT (JSON Web Tokens) for user authentication and secure communication.

## Technologies Used

- **Backend**: 
  - Developed Web API using .NET Core following REST principles.
  - SQL Server for database management, with Entity Framework.
  - Object mapping with AutoMapper.
  - API documentation with Swagger.
  - Asynchronous function support with Dependency Injection.

- **Frontend**: 
  - React with the PrimeReact library for the user interface.
  - Axios for HTTP requests between client and server.

## Installation and Execution

### System Requirements
- Visual Studio 2022
- .NET Core SDK
- SQL Server

### Backend Installation

1. Open the backend project files in Visual Studio.
2. Configure the database connection in the `appsettings.json` file.
3. Run the following commands to migrate the database:
   ```bash
   dotnet ef database update
   ```
4. Start the project with:
   ```bash
   dotnet run
   ```

### Frontend Installation

1. Navigate to the client directory.
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm start
   ```

## Security

The system uses JWT (JSON Web Tokens) for user authentication and secure communication. All API requests are protected and require a valid token.

## Contributions

Contributions and collaborations are welcome! Submit a Pull Request with your changes or open an issue for discussion.

## License

This system is licensed under the MIT License.
