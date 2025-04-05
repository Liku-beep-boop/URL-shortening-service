```markdown
# 🔗 URL Shortening Service

A simple and lightweight URL shortening API built with **Node.js**, **Express**, and **SQLite**. The API is documented using **Swagger**.

## 🚀 Features

- Shorten long URLs into short codes
- Redirect short codes to the original URL
- Track the number of clicks
- API documentation with Swagger (OpenAPI 3)

## 📦 Tech Stack

- Node.js
- Express
- SQLite (via Sequelize ORM)
- Swagger UI for API docs
- shortid for generating unique codes

## 📚 API Documentation

The API is fully documented and available at:

```
http://localhost:3000/api-docs
```

Powered by [Swagger UI](https://swagger.io/tools/swagger-ui/).

## 🔧 Installation

1. Clone the repo:

```bash
git clone https://github.com/Liku-beep-boop/URL-shortening-service.git
cd URL-shortening-service
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm start
```

By default, the server runs at `http://localhost:3000`.

## 📬 API Endpoints

### `POST /shorten`

Shortens a given URL.

**Request body:**

```json
{
  "original_url": "https://example.com"
}
```

**Response:**

```json
{
  "short_code": "abc123",
  "short_url": "http://localhost:3000/abc123"
}
```

---

### `GET /:short_code`

Redirects to the original URL.

- Returns `302 Found` if the URL exists
- Returns `404 Not Found` if the short code is invalid

---

## 📁 Project Structure

```
.
├── app.js           # Main application file
├── database.sqlite  # SQLite database (created after first run)
├── package.json
└── ...
```

## 🧪 Example cURL Usage

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"original_url":"https://example.com"}'
```

## 📄 License

MIT

---

Built with ❤️ by [Liku-beep-boop](https://github.com/Liku-beep-boop)
```
