import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { bebidasProps } from '..';

export function BebidasItem({ item }: { item: bebidasProps}) {
 return (
     <Pressable className='flex flex-col rounded-xl relative'>
    <Image
        source={{ uri: item.image }}
        className='w-44 h-36 rounded-xl'
    />
    <View className='flex flex-row bg-neutral-900/90 w-fit gap-1 rounded-full absolute top-2 right-3 px-2 py-1
    items-center justify-center'>
        <Ionicons name='star' size={14} color="#ca8a04"/>
        <Text className='text-white text-sm'>{item.rating}</Text>
    </View>

    <Text className='text-green-700 font-medium text-lg'>R$ {item.price}</Text>
    <Text className='text-black'>{item.name}</Text>
    <Text className='text-natural-600 text-sm'></Text>
   </Pressable>

  );
}