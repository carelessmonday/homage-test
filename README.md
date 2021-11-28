# Homage Test Exercise

### TODO:

- Authentication middleware
- Validation middleware

### Requirements

```
node >= 12.14.1
npm >= 7.15.1
```

### Setup

### Environment File
Create `.env` file in root folder

```
SESSION_SECRET=randomsecrethere
PORT=3000
```

#### Install dependencies

```bash
npm install
```

#### Run database migrations

Database used is SQLite3. Will be generated at `./data/database.db3`

```bash
npx knex migrate:latest
```

#### Run database seeder

Will generate data for clinics, nurses, users, and random data for schedule and bookings

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
GET /api/clinics [defaults to current date]
```

```http
GET /api/clinics?date=yyyy-mm-dd
```

Query

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `date`            | `string`         | **Optional** `YYYY-MM-DD`         |

Returns

```json
[
  {
    "clinic_id": 5,
    "clinic_name": "Clemente",
    "slots": 10
  },
  {
    "clinic_id": 8,
    "clinic_name": "Bishan",
    "slots": 10
  }
]
```

### Retrieve clinics by ID for date

```http
GET /api/clinics/:id [defaults to current date]
```

```http
GET /api/clinics/:id?date=yyyy-mm-dd
```

Query

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `date`            | `string`         | **Optional** `YYYY-MM-DD`         |

Returns

```json
{
  "clinic_id": 8,
  "clinic_name": "Bishan",
  "slots": 10
}
```

### Retrieve bookings by user ID

```http
GET /api/bookings/:userId
```

Returns

```json
{
  "id": 4,
  "name": "Mara Sov",
  "bookings": [
    {
      "id": 2,
      "usersId": 4,
      "clinicsId": 3,
      "dose": 1,
      "bookingDate": "2021-12-16 12:00:00",
      "createdAt": "2021-11-28 02:19:59"
    }
  ]
}
```

### Store booking by user ID

```http
POST /api/bookings/:userId
```

Form Payload

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `clinicId`        | `integer`        | **Required**                      |
| `dose`            | `integer`        | **Required**                      |
| `bookingDate`     | `string`, `date` | **Required** `Y-MM-DD hh:mm:ss`   |

Returns

```json
{
  "id": 4,
  "usersId": 2,
  "clinicsId": "2",
  "dose": "1",
  "bookingDate": "2021-12-15 05:00:00",
  "createdAt": "2021-11-28 05:39:31"
}
```

### Update booking

```http
POST /api/bookings/update/:userId/:bookingId
```

Form Payload

| Parameter         | Type             | Description                       |
| :--------         | :-------         | :-------------------------------- |
| `clinicId`        | `integer`        | **Required**                      |
| `dose`            | `integer`        | **Required**                      |
| `bookingDate`     | `string`, `date` | **Required** `Y-MM-DD hh:mm:ss`   |

Returns

```json
{
  "id": 4,
  "usersId": 2,
  "clinicsId": "2",
  "dose": "1",
  "bookingDate": "2021-12-15 05:00:00",
  "createdAt": "2021-11-28 05:39:31"
}
```

### Delete booking

```http
DELETE /api/bookings/:userId/:bookingId
```
