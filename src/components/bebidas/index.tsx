import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { BebidasItem } from './horizontal_5';

export interface bebidasProps{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}


export function Bebidas() {

  const [bebidas, setbebidas] = useState<bebidasProps[]>([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.104.34:3000/bebida")
      const data = await response.json()
      setbebidas(data);
  }

  getFoods();
  }, [])
  
 return (
   <FlatList
      data={bebidas}
      renderItem={({ item }) => <BebidasItem item={item} /> }
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
      showsHorizontalScrollIndicator={false}
      />
  );
}