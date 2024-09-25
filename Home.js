import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SectionList,
  Pressable,
} from "react-native";
import Constants from "expo-constants";

import { fetchmovie } from "./Api";

import store from "./redux/store";

import Items from "./Row";
import { Provider } from "react-redux";

export default class Home extends React.Component {
  state = {
    movie: [],
    name: "",
    page: 1,
    update: false,
  };

  fetchmore = () => {
    this.setState({ page: this.state.page + 1 });
    this.getlist({ name: this.state.name, page: this.state.page + 1 });
  };

  getlist = async (props) => {
    const movie = await fetchmovie(props);
    this.setState({ movie: [...this.state.movie, ...movie] });
  };

  handletextchange = (props) => {
    this.setState({ name: props, page: 1, movie: [] });
    this.getlist({ name: props });
  };

  submitlist = () => {
    this.setState({ name: this.state.name, page: 1, movie: [] });
    this.getlist({ name: this.state.name });
  };

  componentDidMount() {
    this.getlist();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={this.handletextchange}
            placeholder="Enter Movie Name"
          />
          <Pressable
            onPress={this.submitlist}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              paddingHorizontal: 32,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: "black",
              marginHorizontal: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 21,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "white",
              }}
            >
              Submit
            </Text>
          </Pressable>

          <SectionList
            sections={this.state.movie}
            renderItem={({ item }) => <Items props={{ ...item }} />}
            onEndReached={this.fetchmore}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,

    padding: 8,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 100,
    shadowColor: "black",
  },
});
