// js/import.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCohDKOlNxyD9ckIZdTM0GE8RjS9_Bw_tI",
  authDomain: "ashley-timber.firebaseapp.com",
  projectId: "ashley-timber",
  storageBucket: "ashley-timber.firebasestorage.app",
  messagingSenderId: "140036393619",
  appId: "1:140036393619:web:d3c39435e5f31f533d9b66",
  measurementId: "G-H9KXBKDNNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Transcribed product data from your video with the new nested structure
const productsData = [
  // Standalone Categories
  { name: 'Acoustic Wall Panels Product', price: 76.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Acoustic Wall Panels'] },
  { name: 'Birch Plywood Product', price: 89.99, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Birch Plywood'] },
  { name: 'Collated Nails Product', price: 15.50, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Collated Nails'] },
  { name: 'Concrete Screws Product', price: 12.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Concrete Screws'] },
  
  // Building Products
  { name: 'fakro Ladders Model X', price: 120.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'fakro LADDERS'] },
  { name: 'Roofing Felt 10m Roll', price: 45.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'Felt & Roofing'] },
  { name: 'Insulation Board 50mm', price: 35.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'Insulation'] },
  { name: 'Taper Edge Plasterboard', price: 14.50, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'Plaster & P/Boards'] },
  { name: 'Sharp Sand Bulk Bag', price: 65.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'Sand/Cement/Gravel'] },
  { name: 'Laminate Worktop 3m', price: 95.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Building Products', 'Worktops'] },

  // Decking
  { name: 'Grey Composite Decking Board', price: 35.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Decking', 'Composite Decking'] },
  { name: 'Decking Stain 2.5L', price: 28.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Decking', 'Decking Product'] },
  
  // Doors & Accessories
  { name: 'Chrome Door Handle Pair', price: 22.50, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Doors', 'Door Hardware', 'Door Handles'] },
  { name: '3" Steel Door Hinge', price: 5.50, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Doors', 'Door Hardware', 'Door Hinges'] },
  { name: 'Mortice Lock 5-Lever', price: 18.99, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Doors', 'Door Hardware', 'Door Latches & Locks'] },
  { name: 'Oak Door Casing Set', price: 42.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Doors', 'Door Casings'] },
  { name: 'Solid Oak Internal Door', price: 210.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Doors', 'Oak Doors'] },

  // Fencing
  { name: '6ft Fence Panel', price: 55.00, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Fencing', 'Fencing Panels'] },
  { name: 'Heavy Duty Metpost', price: 12.75, imageSrc: 'assets/product-placeholder.png', categoryPath: ['Fencing', 'Metposts'] },
  
  // And so on for all ~1400 products...
];

// The function to run from the console
async function uploadProductsToFirestore() {
  const productsCollection = collection(db, 'products');
  console.log(`Starting upload of ${productsData.length} products...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const product of productsData) {
    try {
      await addDoc(productsCollection, product);
      successCount++;
      console.log(`SUCCESS: Uploaded "${product.name}"`);
    } catch (error) {
      errorCount++;
      console.error(`ERROR uploading "${product.name}":`, error);
    }
  }

  console.log('------------------------------------');
  console.log(`UPLOAD COMPLETE: ${successCount} successful, ${errorCount} errors.`);
  console.log('------------------------------------');
}

// Make the function available globally in the browser console
window.uploadProducts = uploadProductsToFirestore;
console.log("Product upload script loaded. Run `uploadProducts()` in the console to start.");
