import { Image, Pressable, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { FoodProps } from '..';

export function CardHorizontalFood({ food }: { food: FoodProps}) {
 return (
   <Pressable className='flex flex-col rounded-xl relative'>
    <Image
        source={{ uri: food.image }}
        className='w-44 h-36 rounded-xl'
    />
    <View className='flex flex-row bg-neutral-900/90 w-fit gap-1 rounded-full absolute top-2 right-3 px-2 py-1
    items-center justify-center'>
        <Ionicons name='star' size={14} color="#ca8a04"/>
        <Text className='text-white text-sm'>{food.rating}</Text>
    </View>

    <Text className='text-green-700 font-medium text-lg'>R$ {food.price}</Text>
    <Text className='text-black'>{food.name}</Text>
    <Text className='text-natural-600 text-sm'>{food.time}</Text>
   </Pressable>
  );
}