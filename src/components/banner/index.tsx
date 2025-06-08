import { Image, Pressable, View } from 'react-native';
import PagerView from "react-native-pager-view";

export function Banner() {
    return (
        <View className="w-full h-36 md:h-60 px-4 mt-5 mb-4">
            <PagerView
                style={{ height: 150 }} // altura do banner
                initialPage={0}
                pageMargin={10}
            >

                <Pressable
                    className="rounded-2xl md:h-60 overflow-hidden"
                    key="2"
                    onPress={() => console.log("CLICOU NO BANNER 2")}
                >
                    <Image
                        source={require("../../assets/paes.jpg")}
                        className="w-full h-full md:h-60 rounded-t-full"
                        resizeMode="contain"
                    />
                </Pressable>
            </PagerView>
        </View>
    );
}
