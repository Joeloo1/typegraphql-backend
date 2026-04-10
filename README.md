# TypeGraphQL Backend

A powerful and scalable GraphQL backend built with **TypeGraphQL**, **Apollo Server**, and **Express**, using **TypeORM** for PostgreSQL database management and **Redis** for session management.

## 🚀 Features

- **Robust Authentication**: Complete user lifecycle management including:
  - User Registration with Email Verification
  - Secure Login with Session Handling (Redis)
  - Password Reset & "Forgot Password" flow
  - Identity verification and "Me" queries
- **Type-Safe Development**: Leverages TypeScript and `type-graphql` for end-to-end type safety.
- **ORM Integration**: Uses TypeORM with a PostgreSQL database.
- **Advanced Validation**: Input validation using `class-validator` decorators.
- **Interactive UI**: Altair GraphQL Client integrated for easy testing.
- **Session Management**: Session-based auth backed by Redis for high performance.

## 🛠️ Tech Stack

- **Server**: [Express](https://expressjs.com/) & [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **GraphQL Framework**: [TypeGraphQL](https://typegraphql.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [TypeORM](https://typeorm.io/))
- **Cache**: [Redis](https://redis.io/)
- **Mailing**: [Nodemailer](https://nodemailer.com/)
- **Client UI**: [Altair GraphQL Client](https://altair.sirmuel.design/)

## 📂 Project Structure

```text
src/
├── app.ts            # Apollo & Express configuration
├── index.ts          # Application entry point
├── config/           # Database, Redis, and Environment config
├── entities/         # TypeORM Database Entities
├── resolvers/        # GraphQL Resolvers (Logic)
├── middleware/       # Custom GraphQL & Express middleware
├── types/            # Custom TypeScript types & interfaces
├── utils/            # Helper functions (mailer, error formatting)
└── constants/        # Project-wide constants
```

## ⚙️ Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/download/)

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd type-graphql
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   NODE_ENV=development
   REDIS_HOST=localhost
   CORS_ORIGIN=http://localhost:3000
   SESSION_SECRET=your_very_secret_key
   ```

4. **Database Configuration**:
   The current configuration in `src/config/data-source.ts` defaults to:
   - **Database**: `typegraphql`
   - **User**: `joel`
   - **Password**: `password`
   
   Ensure the database exists or update the configuration accordingly.

## 🏃 Running the Application

Start the development server:
```bash
yarn start
```

The server will be available at:
- **GraphQL API**: [http://localhost:4000/graphql](http://localhost:4000/graphql)
- **Altair UI**: [http://localhost:4000/altair](http://localhost:4000/altair)

## 📡 Usage

You can use the **Altair GraphQL Client** integration to explore the schema and test mutations.

### Example Mutation: Register

```graphql
mutation {
  register(data: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "securepassword123"
  }) {
    id
    firstName
    lastName
    email
  }
}
```

## 📜 License

This project is licensed under the MIT License.
