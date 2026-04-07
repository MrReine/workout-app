import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    activeButton: {
        backgroundColor: "#007bff",
    },
    buttonText: {
        fontSize: 16,
        color: "#333",
    },
    activeButtonText: {
        color: "white",
        fontWeight: "bold"
    },
})