import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SalgadosItem } from './horizontal';

export interface SalgadosProps{
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}


export function Salgados() {

  const [salgados, setSalgados] = useState<SalgadosProps[]>([])

  useEffect(() => {
    async function getFoods() {
      const response = await fetch("http://10.0.3.106:3000/salgados")
      const data = await response.json()
      setSalgados(data);
  }

  getFoods();
  }, [])
  
 return (
   <FlatList
      data={salgados}
      renderItem={({ item }) => <SalgadosItem item={item} /> }
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16}}
      showsHorizontalScrollIndicator={false}
      />
  );
}