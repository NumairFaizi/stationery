import { openDB } from "idb";

const DB_NAME = "inventoryDB";
const STORE_NAME = "products";

export const initDB = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        console.log("✅ Object store 'products' created.");
      }
    },
  });
};

// Add a product to IndexedDB
export const addProduct = async (product) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.objectStore(STORE_NAME).add(product);
  await tx.done;
};

// Get all products
export const getAllProducts = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
