import React, { Component } from 'react';
import { 
        View, 
        StyleSheet,
        Text,
        Animated,
        UIManager,
        PanResponder,
        Dimensions,
        LayoutAnimation,
     } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOULD = 0.25 * width;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component{
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props){
        super(props);

        const position  = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
                onPanResponderMove:(event, gesture) => {
                    position.setValue({
                        x: gesture.dx, y: gesture.dy
                    })
                },
                onPanResponderRelease:(event, gesture)=>{
                    if(gesture.dx > SWIPE_THRESHOULD){
                        this.forceSwipe('right')
                    }else if(gesture.dx < -SWIPE_THRESHOULD){
                        this.forceSwipe("left");
                    }else{
                        this.resetPosition();
                    }
                }
            
        })

        this.state = {
            panResponder,
            position,
            index: 0,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({ index: 0 });
        }
    }

    UNSAFE_componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction){
        const x = direction === 'right' ? width : -width;
        Animated.timing(this.state.position,{
            useNativeDriver: false,
            toValue: {x,y:0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction){
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === "right" ? onSwipeRight(item): onSwipeLeft(item);
        this.setState({ index: this.state.index+1 });
    }


    resetPosition(){
        Animated.spring(this.state.position,{
            useNativeDriver: false,
            toValue: {x:0, y: 0},
        }).start();
    }

    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-width * 1.5, 0, width * 1.5 ],
            outputRange: ["-120deg", "0deg", "120deg"]
        });
        return{
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards(){
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCard();
        }
        return this.props.data
            .map((item, i) => {          
                    if(i < this.state.index){
                        return null;
                    }
                    if(i == this.state.index){ 
                        return (
                            <Animated.View 
                                key={item.id}
                                style={[   
                                        styles.cardStyle , 
                                        { zIndex: 99}
                                    ]}
                                >
                                {this.props.renderCard(item)}
                            </Animated.View>
                        );
                    }
                    return (
                        <Animated.View  
                            key={item.id}
                            style={[ styles.cardStyle ]}
                            >
                            {this.props.renderCard(item)}
                        </Animated.View>
                    )
                }).reverse();
    }

    render(){
        return(
            <View style={{ marginVertical: 20 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                   {this.renderCards()}
                </ScrollView>
            </View>
        ) 
    }
}

const styles = {
    cardStyle:{
        // position: 'absolute',
        // width: width, 
    }
}