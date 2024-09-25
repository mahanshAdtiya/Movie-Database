import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SectionList,
  Image,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import { createNavigationContainerRef } from '@react-navigation/native';

import { connect } from 'react-redux';


import store from './redux/store';


import Items from './Row';
import { Provider } from 'react-redux';
const BASE_URL = 'https://www.omdbapi.com/?apikey=d0afcd37';
const mapStateToProps = (state) => {
  
  return {
    fav: state.fav,
  };
};

export class Favs extends React.Component {
  state = {
    movie: [],
  };

  fetchFavMovie = async (props) => {
    let url = `${BASE_URL}&i=${props}`;
  

    const response = await fetch(url);
    const result = await response.json();
    const final = [
      {
        data: [
          {
            title: result['Title'],
            type: result['Type'],
            poster: result['Poster'],
            key: result['imdbID'],
            keys: result['imdbID'],
          },
        ],
      },
    ];

    return final;
  };

  favlist = store.getState().fav;

  fetchmore = () => {
  
    this.setState({ page: this.state.page + 1 });
    this.getlist({ name: this.state.name, page: this.state.page });
  };

  getlist = async (props) => {

    const movie = await this.fetchFavMovie(props);

    this.setState({ movie: [...this.state.movie, ...movie] });

   
  };

  clearState = () => {
    this.setState({ movie: [] });
  };
  componentDidMount() {
    let favlist = store.getState().fav;
   
    favlist.map((key) => this.getlist(key));

  }

  render() {
    console.log(JSON.stringify(this.favlist));

    if (JSON.stringify(this.favlist) === JSON.stringify([])) {
      console.log('hello');
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingTop: Constants.statusBarHeight,
            backgroundColor: '#ecf0f1',
            padding: 8,
          }}>
          <Text
            style={{
              margin: 24,
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Long Press To Any Movie To Add To Favourites
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Provider store={store}>
          <View>
            <SectionList
              sections={this.state.movie}
              renderItem={({ item }) => <Items props={{ ...item }} />}
            />
          </View>
        </Provider>
      </View>
    );
  }
}


export default connect(mapStateToProps)(Favs);
