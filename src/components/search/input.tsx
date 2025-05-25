import { Feather } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

export function Search() {
 return (
   <View className='w-full flex-row border border-slate-500 h-12 rounded-full items-center gap-2 px-3 bg-transparent mt-5'>
    <Feather name='search' size={24} color="#64748b"/>

    <TextInput
        placeholder='Procure seu café da manhã...'
        className='w-full h-full flex-1 bg-transparent'
    />
   </View>
  );
}