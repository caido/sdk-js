# Base Example

A simple example demonstrating how to connect to a Caido instance and fetch user information using the SDK.

## What it does

This example:

1. Creates a Caido client with Personal Access Token (PAT) authentication
2. Connects to the Caido instance
3. Fetches and displays the current viewer's information

## Prerequisites

- Node.js installed
- A Caido instance running (default: `http://localhost:8082`)
- A Personal Access Token (PAT) from your Caido instance

## Setup

1. Set the `CAIDO_INSTANCE_URL` environment variable (optional, defaults to `http://localhost:8082`):

   ```bash
   export CAIDO_INSTANCE_URL=http://localhost:8082
   ```

2. Set the `CAIDO_PAT` environment variable with your Personal Access Token:

   ```bash
   export CAIDO_PAT=caido_xxxxx
   ```

## Running

```bash
pnpm start
```
