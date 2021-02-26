import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';


const SearchBar = ({term, onTermChange, onTermSubmit}) =>{
    return (
        <View style={styles.backgroundStyles}>
            <FontAwesome name="search" style={styles.iconStyle} />
            <TextInput 
            autoCapitalize= 'none'
            autoCorrect={false}
            placeholder="search" 
            style={styles.inputStyle}
            value = {term}
            onChangeText = {(newTerm) => {onTermChange(newTerm)}} 
            onEndEditing = {onTermSubmit}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundStyles:{
        backgroundColor: '#E5E5E5',
        height: 50,
        marginHorizontal:15,
        borderRadius:8,
        marginBottom: 10,
        flexDirection: 'row' 
    },
    inputStyle:{
        fontSize: 20,
        flex: 1
    },
    iconStyle:{
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});


export default SearchBar;