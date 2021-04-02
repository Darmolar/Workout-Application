import 'react-native-gesture-handler';
import * as React from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { Provider as ReduceProvider } from 'react-redux';
// import store from './src/redux/configureStore';

import MyDrawer from './src/navigations/DrawerTab';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
        return Image.prefetch(image);
        } else {
        return Asset.fromModule(image).downloadAsync();
        }
    });
}

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
} 

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default class App extends React.Component  {
  constructor(){
      super();
      this.state = {
          isReady: false,
      } 
  }

  async _loadAssetsAsync() {
      const imageAssets = cacheImages([
          require('./assets/bg1.jpg'),
      ]); 
      const fontAssets = cacheFonts([
        { 'Raleway-Black' : require('./assets/fonts/Raleway/Raleway-Black.ttf') },
        { 'Raleway-Bold' : require('./assets/fonts/Raleway/Raleway-Bold.ttf') },
        { 'Raleway-ExtraBold' : require('./assets/fonts/Raleway/Raleway-ExtraBold.ttf') },
        { 'Raleway-Italic' : require('./assets/fonts/Raleway/Raleway-Italic.ttf') },
        { 'Raleway-Light' : require('./assets/fonts/Raleway/Raleway-Light.ttf') },
        { 'Raleway-Medium' : require('./assets/fonts/Raleway/Raleway-Medium.ttf') },
        { 'Raleway-Regular' : require('./assets/fonts/Raleway/Raleway-Regular.ttf') },
        { 'Raleway-SemiBold' : require('./assets/fonts/Raleway/Raleway-SemiBold.ttf') },
        { 'Raleway-Thin' : require('./assets/fonts/Raleway/Raleway-Thin.ttf') },

      ]);
      await Promise.all([...imageAssets, ...fontAssets]);
  }

    
  render(){
    if (!this.state.isReady) {
        return (
          <AppLoading
            startAsync={this._loadAssetsAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        );
      }
    return (
      // <ReduceProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={DefaultTheme}>
            <MyDrawer />
          </NavigationContainer>
        </PaperProvider>
      // </ReduceProvider>
    );
  }
}