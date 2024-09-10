
---

# Recruitment Portal

A full-stack recruitment portal designed for managing recruitment in an efficient way, with a multi-step application form for applicants and an admin dashboard for club members to review responses.

## Features

- **Multi-step Application Form**: Applicants fill out their details and answer domain-specific questions in a dynamic multi-step form.
- **Admin Dashboard**: Club members can access a dashboard that provides:
  - A summary of domain-wise responses.
  - A searchable table to quickly find specific applications.
- **Database Backups**: Automated backups to AWS S3 are set up using GitHub Actions.
- **Animations**: Used Framer Motion to add smooth animations.
- **Authentication**: Implemented using Clerk for the admin portal.

## Screenshots




## Tech Stack

- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma**
- **shadcn/ui**
- **Framer Motion**
- **Clerk**
- **React Hook Form**
- **Zod**

## Configuration

### Automated Database Backups
Database backups are automated with GitHub Actions to ensure data is regularly stored in AWS S3. Follow the guide [here](https://joshstrange.com/2024/04/26/nightly-postgres-backups-via-github-actions/).

### Portal Configuration

##### WIP: Automating fetching the domains, qs instead of storing static data

From src/app/data
- **domains**: Domain and subdomain options for applicants to choose from.
- **techQs**: A list of technical questions for each domain. (Similarly create for)

From src/app/utils
- **generateQs**: Returns the questions for each domain, pass the qs to this function



## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Swebi/Recruitment.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables in your `.env` file (refer env example):
   ```
    DATABASE_URL=
    NEXT_PUBLIC_RECRUITMENT_CLOSED=
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

5. Prisma setup:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

---
