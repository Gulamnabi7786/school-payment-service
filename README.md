<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h2 align="center">School Payment Service – Backend</h2>

<p align="center">
  A NestJS-based backend service for handling <b>school payments, orders, transactions, authentication, and webhooks</b>.
</p>

---

## 📖 Description

This backend is built using the [NestJS](https://nestjs.com) framework with **TypeScript** and **MongoDB (Mongoose)**.  
It implements:

- 🔐 JWT Authentication (login/register, protected APIs)  
- 💳 Payment integration with Edviron (create payment & check status)  
- 📦 Orders & Order Status management  
- 🔔 Webhooks for real-time payment updates  
- 📊 Transactions API for reporting  

---

## 🚀 Project Setup

Clone the repository and install dependencies:

```bash
$ npm install
```

Create a `.env` file in the root folder with the following:

```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PG_KEY=your_pg_key
API_KEY=your_api_key
SCHOOL_ID=your_school_id
```

---

## ⚙️ Running the Server

```bash
# development
$ npm start

# watch mode (auto-restart on changes)
$ npm run start:dev

# production mode
$ npm run start:prod
```

The server will start at 👉 **http://localhost:3000**

---

## 🛠 Build

```bash
# compile TypeScript to JavaScript
$ npm run build
```

---

## ✅ Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## 🔗 API Overview

- **Auth**
  - `POST /auth/register` → register new user
  - `POST /auth/login` → login & get JWT

- **Orders**
  - `POST /orders` → create new order
  - `GET /orders` → list all orders

- **Payments**
  - `POST /payment/create` → create collect request
  - `GET /payment/status/:id` → check payment status

- **Order Status**
  - `POST /order-status` → update order transaction status

- **Webhooks**
  - `POST /webhooks` → receive payment gateway updates

---

## 📚 Resources

- [NestJS Docs](https://docs.nestjs.com)  
- [Mongoose Docs](https://mongoosejs.com)  
- [Edviron Payment Docs](https://dev-vanilla.edviron.com)  

---

## 👨‍💻 Author

**© 2025 Gulamnabi**  
School Payment Service Backend  

---

## 📜 License

This project is licensed under the **MIT License**.
