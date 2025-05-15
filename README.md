# Hostel Management System

A comprehensive web application designed to streamline hostel operations, student management, and administrative tasks. The system provides a modern, user-friendly interface with role-based access control for different stakeholders.

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **shadcn/ui**: UI component library based on Radix UI
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **React Query**: Data fetching and caching
- **Recharts**: Data visualization
- **Sonner**: Toast notifications

### Backend
- **Next.js API Routes**: Backend API endpoints
- **Prisma ORM**: Database ORM
- **PostgreSQL**: Relational database
- **NextAuth.js**: Authentication
- **Cloudinary**: Media storage and management
- **bcrypt**: Password hashing

## Features

- **Multi-role system**: Super Admin, Admin, Student, and User roles
- **Hostel management**: Room allocation, student management
- **Announcement system**: For hostel-wide communications
- **Meal planning**: Meal schedules and menu management
- **Complaint management**: Students can submit and track complaints
- **Event management**: Hostel events planning and tracking
- **Payments**: Track and manage hostel fee payments
- **Guest management**: Temporary guest registrations
- **Reports and analytics**: Data visualization and reporting

## Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher
- PostgreSQL 14.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manojtsx/Hostel-Management-System.git
cd ./Hostel-Management-System
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hostel_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_FOLDER="hostel"
```

4. Initialize the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudinary Setup

1. Create a [Cloudinary account](https://cloudinary.com/users/register/free)
2. Navigate to Dashboard and get your Cloud Name, API Key, and API Secret
3. Add these values to your `.env` file as shown above
4. Create an upload preset in your Cloudinary settings and set it as CLOUDINARY_FOLDER in your `.env` file

## PostgreSQL Setup

1. Install PostgreSQL from [official website](https://www.postgresql.org/download/)
2. Create a new database named `hostel_db`
3. Set your PostgreSQL connection URL in the `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/hostel_db"
   ```
   Replace `username` and `password` with your PostgreSQL credentials

## User Roles

1. **Super Admin**: Full system access, manage hostels and admins
2. **Admin**: Manage specific hostel, handle room allocations, student management
3. **Student**: View personal information, room details, announcements
4. **User**: Basic access for guests or prospective students

## Development

### File Structure
- `/src/app`: Next.js app router pages and layouts
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and libraries
- `/src/utils`: Helper functions
- `/prisma`: Database schema and migrations

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

## Deployment

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

[MIT License](LICENSE)
