# Database Migrations

This directory contains database migrations for the Discord Love Bot application.

## How to Run Migrations

To update your database schema, use the following command:

```bash
npm run db:push
```

This will push your current schema to the database without creating migration files.

## Important Notes

1. The application uses Drizzle ORM for database management
2. The schema is defined in `shared/schema.ts`
3. We use the "push" strategy for migrations, which directly applies schema changes
4. Be careful when making changes to the schema that might result in data loss

## Schema Overview

The database includes the following tables:

1. **users** - Application users (not Discord users)
2. **botConfig** - Bot configuration settings
3. **userPreferences** - Discord user preferences
4. **scheduledMessages** - Configured scheduled messages
5. **truthQuestions** - Truth questions for the truth or dare game
6. **dareChallenges** - Dare challenges for the truth or dare game
7. **commandStats** - Usage statistics for bot commands

## Adding New Tables

If you need to add new tables:

1. Define the table schema in `shared/schema.ts`
2. Create appropriate insert/update schemas
3. Define TypeScript types for your new tables
4. Update `server/storage.ts` to include methods for the new tables
5. Run `npm run db:push` to update the database

## Troubleshooting

If you encounter issues with migrations:

1. Check database connection settings in `.env`
2. Verify you have the correct permissions
3. Look for any errors in the Drizzle output