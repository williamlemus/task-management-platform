# Task Management Platform
## Setup and running the app
To start it up locally
- rename `.env.local.sample` to `.env` in the root directory and `apps/server/`
- Add postgresql docker container in the root directory(I use `podman`):
```
docker compose # podman-compose
```

- In the root directory, also run pnpm install
```
pnpm install
```

This should install both the frontend and backend.
Before starting the application, you should run the seed to generate the users and a couple of tasks
```
cd apps/server
pnpm migrate
npx prisma db seed
```

Start up the apps:
```
pnpm dev
```


## Assumptions
- I started from the assumption that it would be best to have the tasks in a way they are easy to be seen. All users can see everyone tasks since it's an internal app. Due to time constraints, there is no real security in the application.

- I've leveraged tRpc running on a Next.js fronend with a NestJS backend. Using tRpc allows the client to know the types from the backend so there is full end-to-end type safety.
  - The existing procedures are `getTasks`, `createTask`, `deleteTasks`, and `getUsers`

- You can add, edit and soft deleted tasks. When you move a task along, it will appear appropiate status section. The accordions can all be opened at once to see 20 upcoming tasks. Pagination is implement however the frontend does not currently support it.

- There is only one real page, that servers renders and gets the user. The other interactions are all client side.

- The grid is responsive on both desktop and mobile

  Demo:

https://github.com/user-attachments/assets/a9c714d4-ca1a-4ba7-99aa-fdf11cf7ec02

