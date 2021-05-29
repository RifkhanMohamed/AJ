import React from "react";
import { Dimensions, Image, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius:20
  },
});

export enum Cards {
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
}

interface CardProps {
  type: Cards;
}

export default ({ type }: CardProps) => {
  let source: number;
  switch (type) {
    case Cards.Card1:
      source = require("./Cards/medical1.jpg");
      break;
    case Cards.Card2:
      source = require("./Cards/education1.jpg");
      break;
    case Cards.Card3:
      source = require("./Cards/news.jpg");
      break;
    case Cards.Card4:
      source = require("./Cards/contacts.jpg");
      break;
    case Cards.Card5:
      source = require("./Cards/jobs1.jpg");
      break;
    case Cards.Card6:
      source = require("./Cards/lanka1.jpeg");
      break;
    default:
      throw Error("Invalid card style");
  }
  return <Image style={styles.card} {...{ source }} />;
};