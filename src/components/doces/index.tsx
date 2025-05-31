import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { DocesItem } from './horizontal_4';

export interface docesProps{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export function Doces() {

  const [doces, setdoces] = useState<docesProps[]>([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.0.219:3000/doces")
      const data = await response.json()
      setdoces(data);
  }

  getFoods();
  }, [])
  
 return (
   <FlatList
      data={doces}
      renderItem={({ item }) => <DocesItem item={item} /> }
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
      showsHorizontalScrollIndicator={false}
      />
  );
}