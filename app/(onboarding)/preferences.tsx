import { Text, View, Button, TouchableOpacity, Alert } from "react-native";
import { useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router";
import { globalStyles } from "../../styles/global";
import { supabase } from "../../lib/supabase";

export default function PreferencesScreen() {
    const router = useRouter();
    const { name } = useLocalSearchParams<{ name: string }>();
    const [unit, setUnit] = useState("kg");
    const [loading, setLoading] = useState(false);

    const handleFinish = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                Alert.alert("Error", "No user found. Please sign up again.");
                return;
            }

            const { error } = await supabase
                .from('profiles')
                .upsert({ 
                    id: user.id, 
                    name: name, 
                    unit_preference: unit 
                });

            if (error) throw error;

            router.replace("/(app)");
        } catch (error: any) {
            Alert.alert("Error saving preferences", error.message);
        } finally {
            setLoading(false);
        }
    }

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
                onPress={handleFinish}
                disabled={loading}
            >
                <Text style={globalStyles.activeButtonText}>
                    {loading ? "Saving..." : "Finish"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}