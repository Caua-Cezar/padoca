import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { CardHorizontalFood } from './food';

export interface FoodProps{
  id: string;
  name: string;
  price: number;
  time: number;
  delivery: number;
  rating: number;
  image: string;
  salgadosId: string;
}

export function Trendingfoods() {
  const [foods, setFoods] = useState<FoodProps[]>([])

  useEffect(() =>  {
    async function getFoods() {
      const response = await fetch("http://192.168.0.219:3000/foods")
      const data = await response.json()
      setFoods(data);
    }

    getFoods();
  }, [])

 return (
   <FlatList
   data={foods}
   renderItem={({ item }) => <CardHorizontalFood food={item} /> }
   horizontal={true}
   contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
   showsHorizontalScrollIndicator={false}
   />
  );
}