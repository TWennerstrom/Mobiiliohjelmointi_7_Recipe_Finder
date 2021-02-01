import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ingredient;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipes(responseJson);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  }; 

  return (
    <View style={styles.container}>
      <FlatList 
        data={recipes.results} 
        style={{marginLeft : 5, marginTop: 20}}
        keyExtractor={item => item.href}
        ItemSeparatorComponent={listSeparator}
        renderItem={({item}) => 
          <View>
            <Text>{item.title}</Text>
            <Image source={{uri: item.thumbnail}} style={{height:50, width:50}}/>
          </View>
        }
      />
         
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={ingredient} 
        placeholder="Ingredient"
        onChangeText={(text) => setIngredient(text)} 
      />
     <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});