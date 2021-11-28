# Homage Test Exercise

### TODO:

- Auth middleware
- Validation middleware

### Requirements

```
node >= 12.14.1
npm >= 7.15.1
```

### Setup

#### Install dependencies

```bash
npm install
```

#### Run database migrations

```bash
npx knex migrate:latest
```

#### Run database seeder

```bash
npx knex seed:run
```

#### Start node server

```bash
npm run dev
```

# API Reference

### Retrieve available clinics for date

```http
GET /api/clinics
```

```http
GET /api/clinics?date=yyyy-mm-dd
```

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `date`            | `string`         | **Optional**                      |

Returns


```json
[
  {
    "clinic_id":5,
    "clinic_name":"Clemente",
    "slots":10
  },
  {
    "clinic_id":8,
    "clinic_name":"Bishan",
    "slots":10
  }
]
```

### Retrieve clinics by ID for date

```http
GET /api/clinics/:id
```

```http
GET /api/clinics/:id?date=yyyy-mm-dd
```

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `date`            | `string`         | **Optional**                      |

Returns


```json
  {
    "clinic_id":8,
    "clinic_name":"Bishan",
    "slots":10
  }
```
