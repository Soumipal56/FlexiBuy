# FlexiBuy

FlexiBuy is a modern, premium e-commerce platform that allows users to purchase high-end smartphones with flexible, mutual-fund-backed EMI plans. It consists of a React frontend and an Express.js backend with MongoDB.

## Tech Stack Used

### Frontend
- **React 19** (Vite)
- **Tailwind CSS v4** (for premium, responsive UI design)
- **React Router v7** (for client-side routing)
- **Axios** (for API requests)
- **Lucide React** (for iconography)

### Backend
- **Node.js & Express.js**
- **MongoDB** (with Mongoose ODM)
- **Morgan** (for HTTP logging)
- **dotenv** (for environment configuration)

## Database Schema and Seed Data

### Schema Used (Mongoose)

The application revolves around the `Product` schema, which includes a robust sub-schema for `variants` and `emiPlans`.

```javascript
// EMI Plan Schema
{
  months: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  cashback: { type: Number, default: 0 }
}

// Variant Schema
{
  label: { type: String, required: true },
  color: { type: String, required: true },
  storage: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  images: [{ type: String }],
  emiPlans: [emiPlanSchema]
}

// Product Schema
{
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  variants: [variantSchema]
}
```

### Seed Data
The database is initially populated using the `seed.js` script. It inserts flagship smartphones like:
- **iPhone 17 Pro** (Silver, Titanium, Gold)
- **Samsung Galaxy S24 Ultra** (Black, Grey)
- **Google Pixel 9 Pro** (White, Black)

Each phone variant contains high-quality images and dynamically calculated EMI plans (3, 6, 12, 24, and 36 months).

## Setup and Run Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Backend Setup
1. Navigate to the backend directory: `cd Backend`
2. Install dependencies: `npm install`
3. Ensure your `.env` file has the correct configurations:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Seed the database with initial products:
   ```bash
   node seed.js
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173` to view the app!

## API Endpoints and Example Responses

### `GET /api/products`
Retrieves a list of all products.
**Response:**
```json
[
  {
    "_id": "64a2b...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "category": "Smartphones",
    "variants": [
      {
        "label": "256GB - Titanium",
        "price": 127400,
        "images": ["https://..."]
      }
    ]
  }
]
```

### `GET /api/products/:slug`
Retrieves detailed information for a single product.
**Response:**
```json
{
  "_id": "64a2b...",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "category": "Smartphones",
  "variants": [
    {
      "label": "256GB - Titanium",
      "color": "#5c5b57",
      "storage": "256GB",
      "mrp": 134900,
      "price": 127400,
      "images": ["https://..."],
      "emiPlans": [
        {
          "months": 12,
          "interestRate": 0,
          "monthlyAmount": 10617,
          "cashback": 7500
        }
      ]
    }
  ]
}
```

### `POST /api/products`
Creates a new product (requires full schema payload).
**Example Payload:**
```json
{
  "name": "OnePlus 12",
  "slug": "oneplus-12",
  "brand": "OnePlus",
  "category": "Smartphones",
  "variants": [ ... ]
}
```
