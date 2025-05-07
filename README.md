# volunteer-app

# 🫱 Volunteer Initiatives - Information System

A project developed as part of an assignment from the **Telecommunications High School – Sofia**, with the support of the **Ministry of Education and Science**.

📌 **Description**  
An information system for managing volunteer initiatives, aiming to streamline coordination between **administrators**, **organizers**, and **volunteers**. The system provides features for creating and managing events, assigning tasks, tracking progress, and generating reports.

## 🚀 Technologies

The project is built using the following technologies:

- [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development  
- [Prisma ORM](https://www.prisma.io/) – ORM for database interaction  
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript for safer, more predictable code  
- [shadcn/ui](https://ui.shadcn.com/) – Modern UI component library based on Radix UI  
- [NextAuth.js](https://next-auth.js.org/) – Easy-to-configure authentication library  

## ⚙️ Installation & Setup

### 1. Requirements

- Node.js **v18 or newer**  
- PostgreSQL database  
- Git

### 2. Clone the repository

```bash
git clone https://github.com/your-username/volunteer-system.git
cd volunteer-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment

Create a `.env` file in the root directory and add the following line:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXT_PUBLIC_IMGUR_CLIENT_ID=your_id
```

> Replace `user`, `password`, `localhost`, and `dbname` with your local database credentials.
> Replace `your_id` with your client id from imgur.

### 5. Run migrations and seed the database

```bash
npx prisma migrate dev
npx prisma db seed
```

## 🧩 Core Features

### 👥 User and Role Management

- Registration and login via NextAuth  
- User roles: Administrator, Organizer, Volunteer  
- Each user has a personal profile with information and role  

### 📅 Event Management

- Create and edit events  
- Categorize events (environmental, social, cultural, etc.)  
- Volunteers can register for events  

### ✅ Tasks and Progress

- Create and assign tasks to volunteers  
- Track completion status  
- Generate statistics and visualizations (charts, reports)  

## 🧰 Scripts

```bash
# Start dev server
npm run dev

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

## 🌐 Client-Server Architecture

- **Client**: Responsive web interface  
- **Server**: Next.js API routes using Prisma to access the database  

## 📊 Example Roles and Access

| Role          | Access                                             |
|---------------|----------------------------------------------------|
| Administrator | Full access to all features                        |
| Organizer     | Create events, manage tasks                        |
| Volunteer     | Register for events, view assigned tasks           |


## 📄 Documentation

The project includes:

- Code comments for core functionality  
- Documented API routes and models  
- Seed data for faster project setup  

## 👥 Authors

This project was developed by

**Boris Hubavenski**, **Vladislav Stoqnov**, **Daniel Chernev**, **Velizar georgiev**

from the Telecommunications High School – Sofia, as part of an educational initiative to promote digital skills.
>>>>>>> latest
