import { Experience, Slot, PromoCode, sequelize } from '../models';

export const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Seed Experiences
    const experiences = await Experience.bulkCreate([
      {
        title: 'Hot Air Balloon Ride over Cappadocia',
        description: 'Experience breathtaking views of Cappadocia\'s fairy chimneys and unique rock formations from a hot air balloon at sunrise. This once-in-a-lifetime adventure offers stunning panoramic views of the UNESCO World Heritage site.',
        location: 'Cappadocia, Turkey',
        price: 180.00,
        image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800',
        category: 'Adventure',
        duration: '3 hours',
        rating: 4.9,
      },
      {
        title: 'Northern Lights Tour in Iceland',
        description: 'Chase the magical Aurora Borealis across Iceland\'s pristine landscapes. Our expert guides will take you to the best viewing spots away from light pollution for an unforgettable natural light show.',
        location: 'Reykjavik, Iceland',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
        category: 'Nature',
        duration: '4 hours',
        rating: 4.8,
      },
      {
        title: 'Safari Adventure in Serengeti',
        description: 'Witness the great migration and spot the Big Five in Tanzania\'s Serengeti National Park. This guided safari includes game drives and expert wildlife commentary.',
        location: 'Serengeti, Tanzania',
        price: 250.00,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
        category: 'Wildlife',
        duration: '8 hours',
        rating: 5.0,
      },
      {
        title: 'Scuba Diving in Great Barrier Reef',
        description: 'Explore the world\'s largest coral reef system with certified instructors. Discover vibrant marine life and stunning underwater landscapes in crystal-clear waters.',
        location: 'Queensland, Australia',
        price: 200.00,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        category: 'Water Sports',
        duration: '5 hours',
        rating: 4.9,
      },
      {
        title: 'Cooking Class in Tuscany',
        description: 'Learn authentic Italian cooking from a local chef in the heart of Tuscany. Make fresh pasta, traditional sauces, and enjoy your creations with local wine.',
        location: 'Florence, Italy',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
        category: 'Culinary',
        duration: '4 hours',
        rating: 4.7,
      },
      {
        title: 'Machu Picchu Guided Trek',
        description: 'Hike the legendary Inca Trail to the ancient citadel of Machu Picchu. Experience breathtaking mountain scenery and learn about Incan history from expert guides.',
        location: 'Cusco, Peru',
        price: 180.00,
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
        category: 'Hiking',
        duration: '12 hours',
        rating: 5.0,
      },
    ]);

    console.log('Experiences seeded');

    // Seed Slots for each experience (next 7 days)
    const today = new Date();
    const slots = [];

    for (const experience of experiences) {
      for (let i = 0; i < 7; i++) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + i);

        // Morning slot
        slots.push({
          experienceId: experience.id,
          date: slotDate,
          startTime: '09:00:00',
          endTime: '12:00:00',
          availableSpots: 10,
          totalSpots: 10,
        });

        // Afternoon slot
        slots.push({
          experienceId: experience.id,
          date: slotDate,
          startTime: '14:00:00',
          endTime: '17:00:00',
          availableSpots: 10,
          totalSpots: 10,
        });
      }
    }

    await Slot.bulkCreate(slots);
    console.log('Slots seeded');

    // Seed Promo Codes
    await PromoCode.bulkCreate([
      {
        code: 'SAVE10',
        discountType: 'percentage',
        discountValue: 10,
        isActive: true,
      },
      {
        code: 'FLAT100',
        discountType: 'fixed',
        discountValue: 100,
        isActive: true,
      },
      {
        code: 'WELCOME20',
        discountType: 'percentage',
        discountValue: 20,
        isActive: true,
      },
    ]);

    console.log('Promo codes seeded');
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};