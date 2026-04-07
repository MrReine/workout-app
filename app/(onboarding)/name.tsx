import { Text, TextInput, View, Button } from "react-native";
import { useState } from "react"
import { useRouter } from "expo-router";
import { globalStyles } from "../../styles/global";

export default function NameScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>What is your name?</Text>
            <TextInput placeholder="Enter your name" onChangeText={setName} value={name}/>
            <Button title="Next" onPress={() => router.push({ pathname: "/(onboarding)/preferences", params: { name } }) } />
        </View>
    )
}