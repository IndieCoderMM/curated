const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function seedCategories() {
  try {
    await database.category.createMany({
      data: [
        { name: "Web Development" },
        { name: "Mobile Development" },
        { name: "Game Development" },
        { name: "Dynamic Programming" },
        { name: "Project-Based Learning" },
        { name: "Algorithms" },
        { name: "System Design" },
        { name: "Large Language Models" },
        { name: "Data Structures" },
      ],
    });
    console.log("Categories seeded successfully.");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await database.$disconnect();
  }
}

seedCategories();
