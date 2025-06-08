import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { BolosItem } from './horizontal_3';

export interface bolosProps{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}


export function Bolos() {

  const [bolos, setbolos] = useState<bolosProps[]>([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://10.0.3.106:3000/bolos")
      const data = await response.json()
      setbolos(data);
  }

  getFoods();
  }, [])
  
 return (
   <FlatList
      data={bolos}
      renderItem={({ item }) => <BolosItem item={item} /> }
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
      showsHorizontalScrollIndicator={false}
      />
  );
}