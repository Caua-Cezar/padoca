import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";
import '../styles/global.css';

export default function RootLayout() {
  return ( 
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
     <Slot/>
    </SQLiteProvider>
  )
}
