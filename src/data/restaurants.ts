export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  coverImage: string;
  badge?: string;
  menu: MenuItem[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Biryani House',
    cuisine: 'North Indian · Biryani',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 0,
    minOrder: 150,
    image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Popular',
    menu: [
      { id: 'm1', name: 'Hyderabadi Chicken Biryani', description: 'Aromatic basmati rice with tender chicken, saffron & spices', price: 249, image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Biryani' },
      { id: 'm2', name: 'Mutton Biryani', description: 'Slow-cooked mutton with fragrant rice & dum style', price: 329, image: 'https://images.pexels.com/photos/11401287/pexels-photo-11401287.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Biryani' },
      { id: 'm3', name: 'Raita', description: 'Cooling yogurt with cucumber, onion & spices', price: 49, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Sides' },
      { id: 'm4', name: 'Gulab Jamun (2pc)', description: 'Soft milk dumplings in rose-cardamom syrup', price: 59, image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Desserts' },
      { id: 'm5', name: 'Masala Chaas', description: 'Spiced buttermilk with cumin & coriander', price: 39, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Drinks' },
    ],
  },
  {
    id: '2',
    name: 'Dosa Corner',
    cuisine: 'South Indian · Dosa',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 100,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Top Rated',
    menu: [
      { id: 'm6', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', price: 89, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Dosa' },
      { id: 'm7', name: 'Mysore Masala Dosa', description: 'Spicy red chutney dosa with potato masala', price: 99, image: 'https://images.pexels.com/photos/14477883/pexels-photo-14477883.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Dosa' },
      { id: 'm8', name: 'Idli Sambar (3pc)', description: 'Steamed rice cakes with lentil curry', price: 69, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Breakfast' },
      { id: 'm9', name: 'Filter Coffee', description: 'Traditional South Indian filter coffee', price: 35, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Drinks' },
    ],
  },
  {
    id: '3',
    name: 'Punjabi Dhaba',
    cuisine: 'Punjabi · North Indian',
    rating: 4.6,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
    minOrder: 200,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Free Delivery',
    menu: [
      { id: 'm10', name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken', price: 279, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Curries' },
      { id: 'm11', name: 'Dal Makhani', description: 'Black lentils slow-cooked with butter & cream', price: 189, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Curries' },
      { id: 'm12', name: 'Garlic Naan', description: 'Tandoor-baked flatbread with garlic & butter', price: 49, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Breads' },
      { id: 'm13', name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: 229, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Starters' },
    ],
  },
  {
    id: '4',
    name: 'Chaat Bazaar',
    cuisine: 'Street Food · Chaat',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 20,
    minOrder: 80,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
    menu: [
      { id: 'm14', name: 'Pani Puri', description: 'Crispy puris with spicy tangy water (6pc)', price: 49, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Chaat' },
      { id: 'm15', name: 'Bhel Puri', description: 'Puffed rice with chutneys, onions & sev', price: 59, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Chaat' },
      { id: 'm16', name: 'Samosa (2pc)', description: 'Crispy pastry with spiced potato filling', price: 39, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Snacks' },
      { id: 'm17', name: 'Masala Chai', description: 'Spiced Indian tea with milk', price: 25, image: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Drinks' },
    ],
  },
  {
    id: '5',
    name: 'Tandoor Express',
    cuisine: 'Mughlai · Tandoor',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: 30,
    minOrder: 180,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    menu: [
      { id: 'm18', name: 'Chicken Tikka', description: 'Marinated chicken grilled in tandoor', price: 249, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Tandoor' },
      { id: 'm19', name: 'Seekh Kebab', description: 'Minced lamb skewers with spices', price: 279, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Tandoor' },
      { id: 'm20', name: 'Tandoori Roti', description: 'Whole wheat flatbread from tandoor', price: 29, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Breads' },
    ],
  },
  {
    id: '6',
    name: 'Thali Junction',
    cuisine: 'Multi-Cuisine · Thali',
    rating: 4.4,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
    minOrder: 250,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    coverImage: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    menu: [
      { id: 'm21', name: 'Rajasthani Thali', description: 'Dal baati churma, gatte ki sabzi, roti, rice', price: 299, image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Thali' },
      { id: 'm22', name: 'Gujarati Thali', description: 'Dhokla, kadhi, sabzi, roti, rice, sweets', price: 279, image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Thali' },
      { id: 'm23', name: 'Papad Roasted', description: 'Crispy lentil wafers (2pc)', price: 29, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=200', category: 'Sides' },
    ],
  },
];

export const CATEGORIES = [
  { label: 'All', emoji: '🍽️' },
  { label: 'Biryani', emoji: '🍛' },
  { label: 'Dosa', emoji: '🥞' },
  { label: 'North Indian', emoji: '🍲' },
  { label: 'Chaat', emoji: '🥘' },
  { label: 'Tandoor', emoji: '🍢' },
  { label: 'Thali', emoji: '🍱' },
];

export const MOCK_ORDERS = [
  {
    id: 'ord1',
    restaurantName: 'Biryani House',
    date: '2026-05-20',
    total: 547,
    status: 'Delivered',
    items: ['Hyderabadi Chicken Biryani x2', 'Raita x1', 'Gulab Jamun x1'],
  },
  {
    id: 'ord2',
    restaurantName: 'Dosa Corner',
    date: '2026-05-18',
    total: 312,
    status: 'Delivered',
    items: ['Masala Dosa x2', 'Idli Sambar x1', 'Filter Coffee x2'],
  },
  {
    id: 'ord3',
    restaurantName: 'Punjabi Dhaba',
    date: '2026-05-15',
    total: 517,
    status: 'Delivered',
    items: ['Butter Chicken x1', 'Dal Makhani x1', 'Garlic Naan x2'],
  },
];
