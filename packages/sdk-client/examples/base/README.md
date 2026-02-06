# PAT Authentication Example

This example demonstrates how to authenticate with a Caido instance using a Personal Access Token (PAT).

## Usage

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set the required environment variables:

   ```bash
   export CAIDO_PAT=caido_xxxxx
   export CAIDO_INSTANCE_URL=http://localhost:8080  # optional, defaults to localhost:8080
   ```

3. Run the example:

   ```bash
   pnpm start
   ```

## Environment Variables

- `CAIDO_PAT` - Your Personal Access Token (required)
- `CAIDO_INSTANCE_URL` - The URL of your Caido instance (default: `http://localhost:8080`)

## Getting a PAT

Follow [our guide](https://docs.caido.io/dashboard/guides/create_pat.html) to learn how to create a Personal Access Token.
