import { Text, View, Button, TouchableOpacity } from "react-native";
import { useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router";
import { globalStyles } from "../../styles/global";

export default function PreferencesScreen() {
    const router = useRouter();
    const { name } = useLocalSearchParams<{ name: string }>();
    const [unit, setUnit] = useState("kg");
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Hi, {name}! Please Select Your Unit Preferences</Text>
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    unit === "kg" && globalStyles.activeButton
                ]}
                onPress={() => setUnit("kg")}
                >
                    <Text style={[
                        globalStyles.buttonText,
                        unit === "kg" && globalStyles.activeButtonText
                    ]}>Kilograms (kg)</Text>
                </TouchableOpacity>
            <TouchableOpacity
                style={[
                    globalStyles.button,
                    unit === "lbs" && globalStyles.activeButton
                ]}
                onPress={() => setUnit("lbs")}
                >
                    <Text style={[
                        globalStyles.buttonText,
                        unit === "lbs" && globalStyles.activeButtonText
                    ]}>Pounds (lbs)</Text>
                </TouchableOpacity>
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: '#34C759', marginTop: 30 }]}
                onPress={() => router.replace("/(app)")}
            >
                <Text style={globalStyles.activeButtonText}>Finish</Text>
            </TouchableOpacity>
        </View>
    )
}