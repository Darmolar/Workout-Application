import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function MyTopTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return ( 
            <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ 
                                flex: 1, 
                                backgroundColor: '#fff', 
                                padding: 10, 
                                borderBottomWidth:  isFocused ? 2 : 0.6, 
                                borderColor: isFocused ? 'black' : 'grey', 
                                justifyContent: 'center',
                                alignItems: 'center'  
                            }}
                    >
                <Animated.Text style={{ color: isFocused ? 'black' : 'grey', fontFamily: isFocused ? 'Raleway-Bold' : 'Raleway-Light', fontSize: 16 }}>
                    {label}
                </Animated.Text>
            </TouchableOpacity> 
        );
      })}
    </View>
  );
}