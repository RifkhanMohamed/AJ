import React, { Component, useRef, useState } from "react";
import { Animated, Dimensions, FlatList,  TouchableOpacity } from "react-native";

import { PanGestureHandler } from "react-native-gesture-handler";
import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
// import {
//   diffClamp,
//   onScrollEvent,
//   usePanGestureHandler,
//   withDecay,
// } from "react-native-redash";
import { CARD_HEIGHT, Cards } from "./Card";
import WalletCard from "./WalletCard";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = <T extends object>(initializer: () => T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
const { height } = Dimensions.get("window");
const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const cards = [
  {
    index: 1,
    type: Cards.Card1,
  },
  {
    index: 2,
    type: Cards.Card2,
  },
  {
    index: 3,
    type: Cards.Card3,
  },
  {
    index: 4,
    type: Cards.Card4,
  },
  {
    index: 5,
    type: Cards.Card5,
  },
  {
    index: 6,
    type: Cards.Card6,
  },
];

const Wallet = (Params) => {

  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      {...{ onScroll }}
      data={cards}
      renderItem={({ index, item: { type } }) => (
<TouchableOpacity onPress={()=>Params.navigation.navigate('Services',{paramKey:cards[index].index})
}>
<WalletCard {...{ index, y, type }} />
</TouchableOpacity>
        
      )}
      keyExtractor={(item) => `${item.index}`}
    />
  );
};



export default Wallet;