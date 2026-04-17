import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Dev Menu</Text>
            <Button title="Go to Sign Up" onPress={() => router.push("/(auth)/sign-up") } />
            <Button title="Go to Sign In" onPress={() => router.push("/(auth)/sign-in") } />
            <View style={{ marginVertical: 10 }} />
            <Button title="Name Screen (Onboarding)" onPress={() => router.push("/(onboarding)/name") } />
            <Button title="Preference Screen (Onboarding)" onPress={() => router.push("/(onboarding)/preferences")}/>
        </View>
    )
}