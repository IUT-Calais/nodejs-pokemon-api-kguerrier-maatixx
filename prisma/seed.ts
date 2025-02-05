import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  await prisma.pokemonCard.deleteMany();
    await prisma.pokemonCard.createMany({
        data : [
          { name: 'Pikachu', pokedexId: 25, typeId: 5, lifePoints: 35, weight: 6, size: 0.4, imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' },
          { name: 'Bulbizarre', pokedexId: 1, typeId: 4, lifePoints: 45, weight: 6.9, size: 0.7,  imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png' },
          { name: 'Salamèche', pokedexId: 4, typeId: 2, lifePoints: 39, weight: 8.5, size: 0.6, imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png' },
          { name: 'Carapuche', pokedexId: 7, typeId: 3, lifePoints: 44, weight: 9, size: 0.5, imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png' },
          { name: 'Rondoudou', pokedexId: 39, typeId: 1, lifePoints: 115, weight: 5.5, size: 0.5, imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png' },
          { name: 'Miaouss', pokedexId: 52, typeId: 1, lifePoints: 40, weight: 4.2, size: 0.4, imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png' },
        ]
    });

   console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
