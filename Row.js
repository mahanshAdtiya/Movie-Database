import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { navigate } from "./App";

import { connect } from "react-redux";

import Constants from "expo-constants";

import store from "./redux/store";
import { addFav } from "./redux/action";

const mapStateToProps = (state) => {
  return {
    fav: state.fav,
  };
};
export class Items extends React.Component {
  render() {
    let x = "";
    if (store.getState().fav.includes(this.props.props.key)) {
      x = false;
    } else {
      x = true;
    }
    let ids = [this.props.props.key];

    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            {
              borderRadius: 8,
              padding: 6,
            },
          ]}
          onPress={() => navigate("Details", { key: this.props.props.keys })}
          onLongPress={() => store.dispatch(addFav({ [ids]: x }))}
        >
          <View
            style={[
              styles.container,
              store.getState().fav.includes(this.props.props.key)
                ? { backgroundColor: "#FFDF00" }
                : {},
            ]}
          >
            <View style={{ paddingRight: 10 }}>
              <Image
                style={styles.tinyLogo}
                source={{ uri: this.props.props.poster }}
              />
            </View>
            <View>
              <Text style={[styles.title, { fontWeight: "bold" }]}>
                {this.props.props.title}
              </Text>
              <Text style={[styles.title, { fontStyle: "italic" }]}>
                {this.props.props.type}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window")
const SCREEN_WIDTH = width < height ? width : height
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    marginLeft: 5,
    marginTop: 10,
    width: 0.9 * SCREEN_WIDTH,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  paragraph: {
    borderColor: "red",
    width: Constants.width,
    height: 10,
    borderWidth: 1,
  },
  rowitem: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    width: "70%",
    padding: 1,
  },
  tinyLogo: {
    width: 50,
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
    margin: 2,
  },
});

export default connect(mapStateToProps)(Items);
