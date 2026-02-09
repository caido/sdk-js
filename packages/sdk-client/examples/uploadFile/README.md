# Upload File Example

A simple example demonstrating how to connect to a Caido instance and upload a file using the SDK.

## What it does

This example:

1. Creates a Caido client with Personal Access Token (PAT) authentication
2. Connects to the Caido instance
3. Reads a file from the filesystem
4. Uploads the file to the Caido instance
5. Displays information about the uploaded file

## Prerequisites

- Node.js installed
- A Caido instance running (default: `http://localhost:8080`)
- A Personal Access Token (PAT) from your Caido instance

## Setup

1. Set the `CAIDO_INSTANCE_URL` environment variable (optional, defaults to `http://localhost:8080`):

   ```bash
   export CAIDO_INSTANCE_URL=http://localhost:8080
   ```

2. Set the `CAIDO_PAT` environment variable with your Personal Access Token:

   ```bash
   export CAIDO_PAT=caido_xxxxx
   ```

## Running

Upload a file by providing the file path as an argument:

```bash
pnpm start path/to/file.txt
```

You can also optionally specify a custom name for the uploaded file:

```bash
pnpm start path/to/file.txt custom-name.txt
```

If no file path is provided, it will default to `test.txt`.
