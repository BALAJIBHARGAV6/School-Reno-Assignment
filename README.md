
# School-Reno-Assignment

## �️ Elite School Management System

A modern, responsive school management application built with cutting-edge technologies and featuring a beautiful clean white theme.

## ✨ Features

### Core Features
- ✅ **Add School Form** - Modern card-style form with comprehensive validation
- ✅ **View Schools Grid** - Responsive grid layout with search and filtering
- ✅ **Image Upload** - Preview images before submission, stored in `/public/schoolImages`
- ✅ **Database Integration** - MySQL with auto-creation of database and tables
- ✅ **API Routes** - RESTful endpoints for adding and retrieving schools

### Form Validation
- ✅ School Name (required, min length 3)
- ✅ Address (textarea, required)
- ✅ City (dropdown with option for custom input)
- ✅ State (dropdown selection)
- ✅ Contact (10-digit validation)
- ✅ Email (valid email format)
- ✅ Image Upload (required with preview)

### UI/UX Features
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Smooth Animations** - Framer Motion for all interactions
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Modern Design** - Clean, professional interface
- ✅ **Navigation** - Sticky header with route highlighting

### Extra Features (Bonus)
- ✅ **Modal Popup** - Detailed school information view
- ✅ **Search & Filter** - Real-time search and city/state filtering
- ✅ **Hover Effects** - Card animations with scale and shadow
- ✅ **Accessibility** - ARIA labels and keyboard navigation
- ✅ **Error Handling** - Graceful error management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS with custom theme (primary: blue-600, secondary: indigo-500)
- **Animations**: Framer Motion
- **Forms**: react-hook-form with validation
- **Notifications**: react-hot-toast
- **Database**: MySQL with mysql2 driver
- **Fonts**: Inter (Google Fonts)
- **Icons**: Emoji-based icon system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL server (XAMPP recommended for local development)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reno-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=school_db
   ```

4. **Start MySQL server**
   - If using XAMPP: Start Apache and MySQL services
   - Default MySQL runs on port 3306

5. **Initialize database**
   ```bash
   npm run dev
   ```
   Then visit: `http://localhost:3000/api/init-db` to create database and tables

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
reno-assignment/
├── public/
│   ├── schoolImages/          # Uploaded school images
│   └── placeholder-school.svg # Default school image
├── src/
│   ├── app/
│   │   ├── addSchool/         # Add school form page
│   │   ├── showSchools/       # View schools grid page
│   │   ├── api/
│   │   │   ├── addSchool/     # POST endpoint for adding schools
│   │   │   ├── getSchools/    # GET endpoint for fetching schools
│   │   │   └── init-db/       # Database initialization endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── Navigation.tsx     # Navigation header
│   │   └── SchoolModal.tsx    # School details modal
│   └── lib/
│       └── db.ts              # Database connection and utilities
├── .env.local                 # Environment variables (not in git)
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json
```

## 🎯 API Endpoints

### POST `/api/addSchool`
Add a new school to the database.

**Body (FormData):**
- `name`: string (required)
- `address`: string (required)
- `city`: string (required)
- `state`: string (required)
- `contact`: string (10 digits)
- `emailId`: string (valid email)
- `image`: File (image file)

**Response:**
```json
{
  "message": "School added successfully",
  "data": {
    "name": "School Name",
    "city": "City",
    "state": "State",
    "image": "/schoolImages/filename.jpg"
  }
}
```

### GET `/api/getSchools`
Retrieve schools with optional filtering.

**Query Parameters:**
- `search`: string (search in school names)
- `city`: string (filter by city)
- `state`: string (filter by state)

**Response:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "School Name",
      "address": "Full Address",
      "city": "City",
      "state": "State",
      "contact": "1234567890",
      "email_id": "school@email.com",
      "image": "/schoolImages/image.jpg"
    }
  ]
}
```

### GET `/api/init-db`
Initialize database and create tables.

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Used for main actions and highlights
- **Secondary**: Indigo (#6366f1) - Used for secondary actions
- **Background**: Light gray (#f9fafb) - Page background
- **Cards**: White with subtle shadows

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Regular weight, readable sizes

### Spacing
- Consistent spacing scale (4, 8, 16, 24, 32px)
- Generous padding and margins for breathing room

## 📱 Responsive Design

- **Mobile**: Single column layout, stacked forms
- **Tablet**: 2-column grid for schools, responsive forms
- **Desktop**: 3-4 column grid, two-column forms
- **Large Desktop**: Up to 4 columns for optimal viewing

## 🎬 Animations

- **Page Transitions**: Fade and slide effects
- **Form Elements**: Focus/blur animations with scale
- **Cards**: Hover lift with shadow enhancement
- **Loading**: Skeleton screens and spinners
- **Modal**: Spring-based enter/exit animations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier configuration included
- Component-based architecture

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
4. Deploy automatically

### Manual Deployment
1. Build the project: `npm run build`
2. Upload build files to your hosting provider
3. Configure environment variables
4. Ensure MySQL database is accessible

## 🔒 Security

- Environment variables for sensitive data
- SQL injection prevention with parameterized queries
- File upload validation and sanitization
- CORS handling for API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling
- React Hook Form for form management

---

**Built with ❤️ using modern web technologies**

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
