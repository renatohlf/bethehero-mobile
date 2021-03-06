import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import logo from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Hello ${incident.ong.name}, im getting in touch because I would like to help in the case ${incident.title} with the value of ${Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(incident.value)}`;

    const navigateBack = () => {
        navigation.goBack();
    };

    const sendMail = () => {
        MailComposer.composeAsync({
            subject: `Hero from the case: ${incident.title}`,
            recipients: [incident.ong.email],
            body: message
        })
    };

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${incident.ong.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity style={styles.headerButton} onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
    <Text style={styles.incidentValue}>{incident.ong.name} from {incident.ong.city}/{incident.ong.uf}</Text>

                <Text style={styles.incidentProperty}>CASE: </Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALUE: </Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero of this case.</Text>

                <Text style={styles.heroDescription}>Get in touch:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};