import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();
    return (
        <View>
            <Text>Dev Menu</Text>
            <Button title="Name Screen" onPress={() => router.push("/(onboarding)/name") } />
            <Button title="Preference Screen" onPress={() => router.push("/(onboarding)/preferences")}/>
        </View>
    )
}