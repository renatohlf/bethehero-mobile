import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import logo from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default Incidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const navigateToDetail = (incident) => {
        navigation.navigate('Detail', { incident });
    };
    
    const loadIncidents = () => {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true);
        api.get('incidents', { params: { page }}).then( res => {
            setTotal(res.data.total);
            setIncidents([...incidents, ...res.data.results]);
            setLoading(false);
            setPage(page + 1);
        });
    };

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Choose one case below and save the day</Text>


            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG: </Text>
                        <Text style={styles.incidentValue}>{incident.ong.name}</Text>
    
                        <Text style={styles.incidentProperty}>CASE: </Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
    
                        <Text style={styles.incidentProperty}>VALUE: </Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('de', { style: 'currency', currency: 'EUR' }).format(incident.value)}</Text>
    
                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>See more</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View> 
                )}
             />
           
        </View>
    );
};