import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Use environment variables for admin credentials if available (App Platform),
  // otherwise use defaults for local development
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

  console.log(`Using admin email: ${adminEmail}`);

  const hashedAdminPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedAdminPassword },
    create: {
      email: adminEmail,
      password: hashedAdminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created/updated');

  // Create regular test user for local development only
  if (!process.env.ADMIN_EMAIL) {
    const userPassword = await bcrypt.hash('user123', 12);

    const user = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: userPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
      },
    });

    console.log('✅ Test user created');
    console.log();
    console.log('Test credentials:');
    console.log(`Admin: ${adminEmail} / ${adminPassword}`);
    console.log('User:  user@example.com / user123');
  }

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });