import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "João Silva",
      email: "joao@example.com",
      passwordHash: "hashed_password_joao",
      role: "CUSTOMER",
      addresses: {
        create: [
          {
            street: "Rua A",
            number: "123",
            city: "São Paulo",
            state: "SP",
            zipCode: "01000-000",
          }
        ]
      }
    }
  });

  const admin = await prisma.user.create({
    data: {
      name: "Maria Admin",
      email: "maria@example.com",
      passwordHash: "hashed_password_maria",
      role: "ADMIN"
    }
  });

  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Pizza Delícia",
      description: "As melhores pizzas da cidade",
      logoUrl: "https://placehold.co/100x100",
      coverUrl: "https://placehold.co/600x200",
      rating: 4.5,
      deliveryFee: 500,
      items: {
        create: [
          {
            name: "Pizza Margherita",
            description: "Mussarela, tomate e manjericão",
            price: 3500,
            category: "Pizza",
            imageUrl: "https://placehold.co/150x150"
          },
          {
            name: "Pizza Calabresa",
            description: "Mussarela, calabresa e cebola",
            price: 4000,
            category: "Pizza",
            imageUrl: "https://placehold.co/150x150"
          }
        ]
      }
    }
  });

  const order = await prisma.order.create({
    data: {
      userId: user1.id,
      restaurantId: restaurant.id,
      status: "RECEIVED",
      subtotal: 7500,
      deliveryFee: restaurant.deliveryFee,
      total: 8000,
      paymentMethod: "PIX",
      address: {
        street: "Rua A",
        number: "123",
        city: "São Paulo",
        state: "SP",
        zipCode: "01000-000",
      },
      items: {
        create: [
          { },
        ]
      }
    }
  });

  console.log("✅ Seed rodado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
