# Web Endpoint Example

Example usage of PrivMX Endpoint methods in JavaScript/TypeScript.

## Getting Started

1. Clone Bridge CLI:
   ```shell
   git clone https://github.com/simplito/privmx-bridge-docker
   ```
2. Run setup script:
   ```shell
   ./setup.sh
   ```
   This will fetch the necessary Docker images, create Access Keys and your first Context. After a successful setup, CLI
   will
   display all the API keys necessary for connection. <br/>

3. Generate keys.
   In your terminal, generate private-public key pair for your user. The keys must be in WIF format:
   ```shell
   ./genKeyPair.sh
   ``` 
4. Register user.

   With the keys ready, register `userId` - public key pair in your Context.
   Remember to replace placeholder values with the ones created earlier:
   ```shell
   ./cli.sh context/addUserToContext '{"contextId": "CONTEXT_ID", "userId":"USER_ID", "userPubKey":"USER_PUBLIC_KEY" }'
   ``` 

### Setup app

1. Copy or rename `.env.example` to `.env` and fill with variables created during the Bridge setup.
2. Run
   ```sh
   npm install 
   npm run dev
   ```
3. Open app on a path displayed in your console. 

## Usage

This is an example app. To see the **result of functions open web browser console.**
Code snippets are located inside `./src/threads.ts` and `./src/stores.ts` files.

## Documentation

Full overview of this package's functions, types and example usage can be
found in our [documentation](https://docs.privmx.dev/js/server-configuration).

## License

MIT [LICENSE](./LICENSE)
