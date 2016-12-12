/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
} from 'react-native';

var BASE_URL = "https://api.github.com/search/repositories?q=";

export default class GithubFinder extends Component {

  constructor(props) {
    super(props);
      var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource,
      };
  }

  render() {
    return(
      <View style = {styles.container}>
      <TextInput
              autoCapitalize = "none"
              autoCorrect = {false}
              placeholder = "Search for a project"
              style = {styles.searchBarInput}
              onEndEditing = {this.onSearchChange}
        />

        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}
        />

      </View>
    );
  }

  onSearchChange = (event:Object) => {
    var searchTerm = event.nativeEvent.text.toLowerCase();
    var queryURL = BASE_URL+encodeURIComponent(searchTerm);
    console.log(searchTerm);
    fetch(queryURL)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.items) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.items)
          });
      }
    })
    .done();
  }

  renderRow = (repo:Object) => {
    return (
      <View>
          <View style = {styles.row}>
              <Image
                source = {{uri:repo.owner.avatar_url}}
                style = {styles.profpic}/>
              <View style = {styles.textcontainer}>
                <Text style = {styles.title}>
                  {repo.name}</Text>
                <Text style = {styles.subtitle}>
                  {repo.owner.login}</Text>
              </View>
          </View>
          <View style = {styles.cellBorder} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  searchBarInput:{
    marginTop:30,
    padding:5,
    fontSize:15,
    height:30,
    backgroundColor:'#EAEAEA'
  },
  row:{
    alignItems:'center',
    backgroundColor:'white',
    flexDirection:'row',
    padding:5
  },
  cellBorder:{
    backgroundColor:'rgba(0,0,0,0.1)',
    height:1,
    marginLeft:4,
  },
  profpic:{
    width:50,
    height:50,
  },
  title:{
    fontSize:20,
    marginBottom:8,
  },
  subtitle:{
    fontSize:16,
    marginBottom:8,
  },
  textcontainer:{
    paddingLeft:10,
  }
});

AppRegistry.registerComponent('GithubFinder', () => GithubFinder);
