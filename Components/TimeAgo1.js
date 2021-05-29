// @flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import moment from './moment1';

export default class TimeAgo extends Component {
  // props: {
  //   time,
  //   interval,
  //   hideAgo,
  // };
  // state: {timer: null | number} = {timer: null};

  static defaultProps = {
    hideAgo: false,
    interval: 60000,
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval),
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24);
    moment.relativeTimeThreshold('d', 30);
    moment.relativeTimeThreshold('M', 12);
    const {time, hideAgo} = this.props;
    return (
      <Text style={{color: 'gray'}} {...this.props}>
        {moment(time).fromNow(hideAgo)}
      </Text>
    );
  }
}
