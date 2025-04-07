import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

let dbPromise = null;

const getDatabaseConnection = async () => {
  if (!dbPromise) {
    console.log("Opening database...");
    dbPromise = SQLite.openDatabaseAsync("places.db");
  }
  return dbPromise;
};

export const init = () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const db = await getDatabaseConnection();
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );
      `);
      
      resolve();
    } catch (error) {
      console.log("Database initialization failed: ", error);
      reject(error);
    }
  });

  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const db = await getDatabaseConnection();
      
      const result = await db.runAsync(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
      );
      
      console.log("Insert result:", result);
      resolve(result);
    } catch (error) {
      console.log("Error inserting place: ", error);
      reject(error);
    }
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const db = await getDatabaseConnection();
      
      const result = await db.getAllAsync(`SELECT * FROM places`);
      
      const places = [];
  
      for (const row of result) {
        const location = {
          address: row.address,
          lat: row.lat,
          lng: row.lng,
        };

        const place = new Place(row.title, row.imageUri, location, row.id);
        places.push(place);
      }

      resolve(places);
    } catch (error) {
      console.log("Error fetching places: ", error);
      reject(error);
    }
  });

  return promise;
};

export const fetchPlaceDetails = (id) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const db = await getDatabaseConnection();
      
      const result = await db.getFirstAsync(
        `SELECT * FROM places WHERE id = ?`, 
        [id]
      );
      
      if (!result) {
        throw new Error(`Place with id ${id} not found`);
      }

      const location = {
        address: result.address,
        lat: result.lat,
        lng: result.lng,
      };

      const place = new Place(result.title, result.imageUri, location, result.id);
      resolve(place);
    } catch (error) {
      console.log("Error fetching place details: ", error);
      reject(error);
    }
  });

  return promise;
};