HawkbitGUI - modern GUI for the Hawkbit Server
==============================================

This is a GUI for Eclipse Hawkbit [hawkBit](https://github.com/eclipse-hawkbit/hawkbit), an open-source
backend platform for managing and deploying software and firmware updates to various connected devices.
This project wants to solve the issue of missing GUI as reported in [#1376](https://github.com/eclipse-hawkbit/hawkbit/issues/1376).
It is goal to resolve the strong dependencies, and HawkbitGUI does not need at all to be linked with
Hawkbit's code. It uses the REST API provided by Hawkbit, and it can be installed on any server.

Focus of this project is:
HawkbitGUI claims  to solve some issues in Hawkbit:

- remove dependencies from the Hawkbit Server.
  It is a separate project, built outside Hawkbit's Java environment,
  and it just uses the REST API provided by Hawkbit.
- GUI and server do not need to run on the same server. GUI can be configured with which server must be connected
  design easier to change, even if it currently resembles the previous GUI.
- better UX

## License

This Software is licensed under GPLv3.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

You have to set in `.env` the URL for the Hawkbit Server by setting the `HAWKBIT_API_URL` variable.

