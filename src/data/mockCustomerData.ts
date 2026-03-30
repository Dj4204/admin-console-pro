export const categories = [
  { id: "all", name: "All" },
  { id: "grocery", name: "Grocery" },
  { id: "medicine", name: "Medicine" },
  { id: "food", name: "Food" },
  { id: "fruits", name: "Fruits" },
  { id: "jewellery", name: "Jewellery" },
  { id: "electronics", name: "Electronics" },
  { id: "garage", name: "Garage" },
  { id: "cosmetics", name: "Cosmetics" },
  { id: "bakery", name: "Bakery" },
  { id: "clothes", name: "Clothes" },
];

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  deliveryCharge: number;
  isOpen: boolean;
  image: string;
}

export const shops: Shop[] = [
  { id: "1", name: "Shivam General Store", category: "grocery", rating: 4.3, deliveryTime: "20–30 min", distance: "1.2 km", deliveryCharge: 20, isOpen: true, image: "" },
  { id: "2", name: "Rani Medical Hall", category: "medicine", rating: 4.5, deliveryTime: "15–25 min", distance: "0.8 km", deliveryCharge: 15, isOpen: true, image: "" },
  { id: "3", name: "Bhojwala Restaurant", category: "food", rating: 4.1, deliveryTime: "25–35 min", distance: "2.1 km", deliveryCharge: 30, isOpen: true, image: "" },
  { id: "4", name: "Fresh Fruit Corner", category: "fruits", rating: 4.4, deliveryTime: "20–30 min", distance: "1.5 km", deliveryCharge: 20, isOpen: true, image: "" },
  { id: "5", name: "Maa Jewellers", category: "jewellery", rating: 4.8, deliveryTime: "30–45 min", distance: "3.0 km", deliveryCharge: 0, isOpen: false, image: "" },
  { id: "6", name: "Kumar Electronics", category: "electronics", rating: 4.2, deliveryTime: "30–40 min", distance: "2.5 km", deliveryCharge: 25, isOpen: true, image: "" },
  { id: "7", name: "Raju Auto Garage", category: "garage", rating: 4.0, deliveryTime: "40–60 min", distance: "3.2 km", deliveryCharge: 40, isOpen: true, image: "" },
  { id: "8", name: "Beauty Plus Cosmetics", category: "cosmetics", rating: 4.6, deliveryTime: "20–30 min", distance: "1.0 km", deliveryCharge: 15, isOpen: true, image: "" },
  { id: "9", name: "Sharma Provision Store", category: "grocery", rating: 4.1, deliveryTime: "15–25 min", distance: "0.5 km", deliveryCharge: 10, isOpen: true, image: "" },
  { id: "10", name: "Gupta Medical Store", category: "medicine", rating: 4.3, deliveryTime: "20–30 min", distance: "1.8 km", deliveryCharge: 20, isOpen: false, image: "" },
  { id: "11", name: "Royal Bakery", category: "bakery", rating: 4.7, deliveryTime: "15–20 min", distance: "0.6 km", deliveryCharge: 10, isOpen: true, image: "" },
  { id: "12", name: "Fashion Hub", category: "clothes", rating: 4.0, deliveryTime: "30–45 min", distance: "2.8 km", deliveryCharge: 30, isOpen: true, image: "" },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const shopProducts: Record<string, Product[]> = {
  "1": [
    { id: "p1", name: "Tata Salt 1kg", price: 28, image: "", category: "Essentials" },
    { id: "p2", name: "Fortune Oil 1L", price: 180, image: "", category: "Essentials" },
    { id: "p3", name: "Aashirvaad Atta 5kg", price: 275, image: "", category: "Essentials" },
    { id: "p4", name: "Amul Butter 100g", price: 56, image: "", category: "Dairy" },
    { id: "p5", name: "Parle-G Biscuit", price: 10, image: "", category: "Snacks" },
    { id: "p6", name: "Maggi Noodles", price: 14, image: "", category: "Snacks" },
    { id: "p7", name: "Sugar 1kg", price: 48, image: "", category: "Essentials" },
    { id: "p8", name: "Red Label Tea 250g", price: 115, image: "", category: "Beverages" },
  ],
  "3": [
    { id: "p9", name: "Veg Thali", price: 120, image: "", category: "Meals" },
    { id: "p10", name: "Chicken Biryani", price: 180, image: "", category: "Meals" },
    { id: "p11", name: "Paneer Butter Masala", price: 160, image: "", category: "Main Course" },
    { id: "p12", name: "Butter Naan (2pc)", price: 40, image: "", category: "Breads" },
    { id: "p13", name: "Cold Drink 500ml", price: 40, image: "", category: "Beverages" },
    { id: "p14", name: "Gulab Jamun (4pc)", price: 60, image: "", category: "Desserts" },
    { id: "p15", name: "Veg Momos (8pc)", price: 80, image: "", category: "Starters" },
    { id: "p16", name: "Lassi", price: 35, image: "", category: "Beverages" },
  ],
};

// Default products for any shop without specific products
export const defaultProducts: Product[] = [
  { id: "dp1", name: "Product 1", price: 99, image: "", category: "General" },
  { id: "dp2", name: "Product 2", price: 149, image: "", category: "General" },
  { id: "dp3", name: "Product 3", price: 199, image: "", category: "General" },
  { id: "dp4", name: "Product 4", price: 249, image: "", category: "General" },
  { id: "dp5", name: "Product 5", price: 79, image: "", category: "General" },
  { id: "dp6", name: "Product 6", price: 129, image: "", category: "General" },
  { id: "dp7", name: "Product 7", price: 299, image: "", category: "General" },
  { id: "dp8", name: "Product 8", price: 59, image: "", category: "General" },
];

export const shopCategoryMap: Record<string, { title: string; image: string }> = {
  grocery: { title: "Grocery Stores", image: "" },
  medicine: { title: "Medical Stores", image: "" },
  food: { title: "Restaurants", image: "" },
  fruits: { title: "Fruit Shops", image: "" },
  jewellery: { title: "Jewellery Shops", image: "" },
  garage: { title: "Garage Services", image: "" },
  cosmetics: { title: "Cosmetics", image: "" },
  electronics: { title: "Electronics", image: "" },
  bakery: { title: "Bakery", image: "" },
  clothes: { title: "Clothes", image: "" },
};
