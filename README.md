# AFSD-hotel

## Environment variables

### .env file frontend 

```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

## Seeding

(seeding is based on existing uid's from firebase, if you start with a new firebase authentication you will have to replace the created users)

### Step 1: go to backend

```
cd hotel/packages/api
```

### Step 2: seed database

```
npx nestjs-command seed:database
```

