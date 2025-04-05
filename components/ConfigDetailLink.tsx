import { StyleSheet, TouchableOpacity } from "react-native";

export default function ConfigDetailLink() {
    return (
        <TouchableOpacity style={styles.container}>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: "100%",
        backgroundColor: "orange",
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },
});