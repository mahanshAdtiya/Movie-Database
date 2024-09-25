import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, Pressable } from 'react-native';
import Constants from 'expo-constants';

const BASE_URL = 'https://www.omdbapi.com/?apikey=d0afcd37';


export default class DetailScreen extends React.Component {
  state = { movie: {} };

  fetchmovie = async (props) => {
    let url = `${BASE_URL}&i=${props}`;
  
    const response = await fetch(url);
    const result = await response.json();
    const final = result;
    this.setState({ movie: final });
  };
  componentDidMount() {
    this.fetchmovie(this.props.route.params.key)

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.state.movie['Poster'] }}
        />
        <Text
          style={{
            paddingTop: '5%',
            paddingHorizontal: '2%',
            fontSize: 24,
          }}>
          {this.state.movie['Title']}
        </Text>
        <Text style={styles.text}>{this.state.movie['Plot']}</Text>
        <Text style={styles.textb}>Director: {this.state.movie['Director']}</Text>
        <Text style={styles.textb}>Rating {this.state.movie['imdbRating']}/10</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: '50%',
    width: '100%',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  text: {
    paddingTop: '5%',
    paddingHorizontal: '2%',
    fontSize: 15,
  },
  textb: {
    paddingTop: '3%',
    paddingHorizontal: '2%',
    fontSize: 15,
    fontStyle:"italic"
  },
  paragraph: {
    borderColor: 'red',
    width: Constants.width,
    height: 10,
    borderWidth: 1,
  },
});
``;
