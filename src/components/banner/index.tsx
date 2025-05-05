import { Image, Pressable, View } from 'react-native';
import PagerView from "react-native-pager-view";

export function Banner() {
    return (
        <View className="w-full px-4 mt-5 mb-4">
            <PagerView
                style={{ height: 350 }} // altura do banner
                initialPage={0}
                pageMargin={10}
            >
                <Pressable
                    key="1"
                    className="rounded-2xl overflow-hidden"
                    onPress={() => console.log("CLICOU NO BANNER 1")}
                >
                    <Image
                        source={require("../../assets/padoca.jpeg")} // use sua imagem real aqui
                        className="w-full h-full rounded-full border-4"
                        resizeMode="contain"
                    />
                </Pressable>
            </PagerView>
        </View>
    );
}
