import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SalgadinhosItem } from './horizontal_2';

export interface SalgadinhoProps{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}


export function Salgadinhos() {

  const [salgadinhos, setSalgadinhos] = useState<SalgadinhoProps[]>([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://192.168.0.219:3000/salgadinhos")
      const data = await response.json()
      setSalgadinhos(data);
  }

  getFoods();
  }, [])
  
 return (
   <FlatList
      data={salgadinhos}
      renderItem={({ item }) => <SalgadinhosItem item={item} /> }
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
      showsHorizontalScrollIndicator={false}
      />
  );
}