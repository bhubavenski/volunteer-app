import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    username: 'user1',
    email: 'email1@gmail.com',
    password: '1111',
    role: '',
  },
  {
    username: 'user2',
    email: 'email2@gmail.com',
    password: '2222',
    role: '',
  },
  {
    username: 'user3',
    email: 'email3@gmail.com',
    password: '3333',
    role: '',
  },
];

export const categories: Prisma.CategoryCreateInput[] = [
  { name: 'Education' },
  { name: 'Health' },
  { name: 'Politics' },
  { name: 'Old people' },
];

export const initiatives: Prisma.InitiativeCreateInput[] = [
  {
    title: 'Teach Kids to Code',
    description:
      'This initiative aims to teach children from underserved communities how to code and develop digital skills that will help them thrive in the 21st century. Through a series of free coding workshops, we aim to bridge the digital divide and provide young people with the tools they need to succeed. The program includes interactive lessons on web development, programming languages, and problem-solving skills. Volunteers and industry professionals will mentor the children, ensuring that they receive the guidance and encouragement needed to unlock their full potential.',
    location: 'Sofia, Bulgaria',
    actionDate: new Date(),
    excerpt: 'Empowering the next generation with coding skills.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.3169079185163!2d23.320746975848106!3d42.69701007116366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ef31b5283%3A0x6dc52c4a01d5d5b8!2z0KHQvtGE0LjRjyDRhtC10L3RgtGK0YAsIDEwMDAg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1738436349399!5m2!1sbg!2sbg',
  },
  {
    title: 'Clean Our Beaches',
    description:
      'Our oceans and beaches are being polluted at an alarming rate, and it is crucial for communities to come together to clean up the mess. This initiative invites individuals and groups to participate in beach clean-up events across the country. Volunteers will work together to remove trash, plastic, and other pollutants that have accumulated on the shores. The project also includes educational campaigns on waste management and the importance of environmental conservation. Participants will not only contribute to cleaning the beaches but will also learn how to reduce their environmental footprint and encourage others to do the same.',
    location: 'Varna, Bulgaria',
    actionDate: new Date(),
    excerpt: 'Join us in keeping our beaches clean and sustainable.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.255472258887!2d23.324756375848132!3d42.69831107116349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856fae303b0d%3A0xfe3a587a59feb252!2z0JDQv9GC0LXQutCwINCc0LXQtNC10Y8gLSDQlNC-0L3QtNGD0LrQvtCy!5e0!3m2!1sbg!2sbg!4v1738436591034!5m2!1sbg!2sbg',
  },
  {
    title: 'Plant Trees for a Greener Future',
    description:
      'This initiative aims to combat climate change by planting trees in urban and rural areas to reduce carbon emissions and promote biodiversity. Volunteers will plant trees in parks, streets, and nature reserves, helping to restore damaged ecosystems and create a cleaner, greener environment. The initiative is focused on engaging local communities and educating them on the importance of trees and their role in preserving the planet. With each tree planted, we are one step closer to a more sustainable future. This initiative also provides opportunities for schools and youth groups to get involved and take action for the environment.',
    location: 'Plovdiv, Bulgaria',
    actionDate: new Date(),
    excerpt: 'Take action for the environment by planting trees.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.316907918515!2d23.320746975848113!3d42.69701007116369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856ef31b5283%3A0x6dc52c4a01d5d5b8!2z0KHQvtGE0LjRjyDRhtC10L3RgtGK0YAsIDEwMDAg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1738435549919!5m2!1sbg!2sbg',
  },
  {
    title: 'Support Homeless Shelters',
    description:
      'This initiative is focused on supporting homeless shelters by providing food, clothing, and essential services to those in need. We aim to raise awareness about homelessness and encourage people to contribute in any way they can. Volunteers will work with local shelters to deliver donations, serve meals, and assist with daily operations. In addition to material support, the initiative will also offer counseling services to help individuals get back on their feet and find long-term solutions to homelessness. The goal is to create a compassionate society where no one is left behind.',
    location: 'Burgas, Bulgaria',
    actionDate: new Date(),
    excerpt: 'Help support and uplift homeless individuals.',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.316907918517!2d23.343012975848113!3d42.59468907116368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856fae303b0d%3A0xa0f5a3d45a5d11a2!2z0JTQvtC00L7Qu9Cz0L7QstCw!5e0!3m2!1sbg!2sbg!4v1738435481059!5m2!1sbg!2sbg',
  },
];
