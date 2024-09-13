<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Payments Microservice (payments-ms)

This microservice is designed to handle payments and is built with [NestJS](https://nestjs.com/). It is currently integrated with [Stripe](https://stripe.com/), but it can easily be configured to work with other payment service providers.

## Main Features

- **Payment processing**: Secure and efficient payment processing.
- **Stripe integration**: Initial implementation with Stripe's API for payment management.
- **Extensible**: Can be configured to work with other payment service providers easily.
- **Microservice architecture**: Ideal for distributed, scalable, and maintainable applications.

## Requirements

- Node.js
- NestJS
- Stripe API (optional, for current configuration)

## Environment Variables

Below are the main environment variables you need to configure in your `.env` file:

```env
PORT=3003
NODE_ENV=development

# https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=
PAYMENT_PROVIDER=stripe
```

- `PORT`: The port on which the microservice will run.
- `NODE_ENV`: The environment (development, production, etc.).
- `STRIPE_SECRET_KEY`: The secret key from Stripe for payment integration.
- `PAYMENT_PROVIDER`: The payment provider being used (default: `stripe`).

## Installation

1. Clone the repository:

   ```bash
   git clone [REPO_URL]
   ```

2. Install dependencies:

   ```bash
   cd payments-ms
   npm install
   ```

3. Configure the environment variables in your `.env` file as described above.

## Usage

Start the microservice:

```bash
npm run start:dev
```

You can then use the available routes to manage payments through the API.

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue for any suggestions or improvements.
