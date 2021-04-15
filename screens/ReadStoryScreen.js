import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import db from '../config';

export default class Read extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      last: null,
    };
  }
  fetchdata = async () => {
    const query = await db
      .collection('storyTime')
      .startAfter(this.state.last)
      .limit(4)
      .get();
    query.docs.map((doc) => {
      this.setState({ data: [...this.state.data, doc.data()] });
    });
  };
  componentDidMount = async () => {
    const query = await db.collection('storyTime').limit(4).get();
    query.docs.map((doc) => {
      this.setState({ data: [...this.state.data, doc.data()], last: doc });
    });
  };
  render() {

    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => (
          <View>
            <Text style={{backgroundColor:'yellow', borderColor: 'black', borderWidth: 5, fontFamily: 'italics', padding: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              {'Title  : ' + item.title}
            </Text>
            <Text style={{backgroundColor:'lightgreen', borderColor: 'black', borderWidth: 5, color: 'red', padding: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              {'Author : ' + item.author}
            </Text>
            <Text style={{backgroundColor:'lightblue', borderColor: 'black', borderWidth: 5, color: 'blue', padding: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              {'Story : ' + item.storyText}
            </Text>
          </View>
        )}
      />
    );
  }
}