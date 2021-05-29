// import React from 'react';
import * as React from 'react';
import { View } from 'react-native';
//import FeedbackScreen from './Feedback';
import ServiceScreen from './Services';
import PostScreen from './Post';
import HomeScreen from './Home';
import Categories from './Categories';
import AccountScreen from './Account';
import SettingsScreen from './Settings';
import AdminScreen from './Admin';
import MyProfile from './MyProfile';
import MyPost from './MyPost';
import UserDetails from './UserDetails';
import Details from './Details';
import BannerAdvertising from './Banner';
import About from './About';
import Search from './Search';
import Notification from './Notification';
import EditProfile from './EditProfile';
import EditEmail from './EditEmail';
import ChangePassword from './ChangePassword';
import ChatHome from './ChatHome';
import Chat from './Chat';
import PersonalChat from './PersonalChat';
import postDetails from './PostDetails';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import PendingPost from './PendingPost';
import PendingPostDetails from './PendigPostDetails';
import imageGallery from './imageGallery';
import mainCategories from './mainCategories';
import AdminList from './AdminList';
import Wallet from './Wallet';
import Gezzet from './Gezzet';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";


const MyTab = AnimatedTabBarNavigator();
const MyTabs = () => (
  
  <NavigationContainer>
    <MyTab.Navigator
        tabBarOptions={{
          activeTintColor: "red",
          inactiveTintColor: "#222222",
          activeBackgroundColor:"black",
        }}
        appearence={{
          tabBarBackground:"gray",
          floating: true,
          shadow: true,
        }}
      RefreshControl
      initialRouteName="Home"
      activeColor="gray"
      style={{backgroundColor: 'tomato'}}
      barStyle={{backgroundColor: '#fff'}}>
      <MyTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({tintColor}) => (
            <Icon name={'home'} color={'#FFFFFF'} size={26} />
          ),
        }}
      />
      <MyTab.Screen
        name="Categories"
        component={CategoryStackScreen}
        options={{
          tabBarLabel: 'Category',
          tabBarColor: '#fff',
          tabBarIcon: ({tintColor}) => (
            <Icon name="apps" color={'#FFFFFF'} size={26} />
          ),
        }}
      />
      <MyTab.Screen
        name="Post"
        component={PostStackScreen}
        options={{
          tabBarLabel: 'Post',
          tabBarColor: '#fff',
          tabBarIcon: ({tintColor}) => (
            <Icon3 name="add-circle" color={'#FFFFFF'} size={26} />
          ),
        }}
      />
      <MyTab.Screen
        name="Wallet"
        component={ServiceStackScreen}
        options={{
          tabBarLabel: 'Services',
          tabBarColor: '#fff',
          tabBarIcon: ({tintColor}) => (
            <Icon name="face-agent" color={'#FFFFFF'} size={26} />
          ),
        }}
      />
      <MyTab.Screen
        name="Account"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({tintColor}) => (
            <Icon name="account" color={'#FFFFFF'} size={26} />
          ),
        }}
      />
    </MyTab.Navigator>
  </NavigationContainer>
);

export default MyTabs;

const ProfileStack = createStackNavigator();
const ServiceStack = createStackNavigator();
const PostStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={AccountScreen}
      options={{
        title: 'Profile',
        headerRight: () => (
          <Icon3.Button
            name="settings"
            size={25}
            color={'#000'}
            backgroundColor="#fff"
            onPress={() => navigation.navigate('Settings')}
          />
        ),
      }}
    />
    <ProfileStack.Screen
      name="Admin"
      component={AdminScreen}
      options={{
        title: 'Admin',
      }}
    />
    <ProfileStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Settings',
      }}
    />
    <ProfileStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{
        title: 'My Profile',
      }}
    />
    <ProfileStack.Screen
      name="MyPost"
      component={MyPost}
      options={{
        title: 'My Post',
      }}
    />
    <ProfileStack.Screen
      name="UserDetails"
      component={UserDetails}
      options={{
        title: 'User Details',
      }}
    />
        <ProfileStack.Screen
      name="AdminList"
      component={AdminList}
      options={{
        title: 'Admin Details',
      }}
    />
    <ProfileStack.Screen
      name="Details"
      component={Details}
      // options={{
      //   title: 'Details',
      // }}
    />
    <ProfileStack.Screen
      name="BannerAdvertising"
      component={BannerAdvertising}
      options={{
        title: 'Banner Advertising',
      }}
    />
    <ProfileStack.Screen
      name="About"
      component={About}
      options={{
        title: 'About',
      }}
    />
    <ProfileStack.Screen
      name="PendingPost"
      component={PendingPost}
      options={{
        title: 'Pending Post',
      }}
    />
    <ProfileStack.Screen
      name="PendingPostDetails"
      component={PendingPostDetails}
      options={{
        title: 'Details',
      }}
    />

<ProfileStack.Screen
      name="Post"
      component={postDetails}
      options={{
        title: 'AJ Marketing & Services',
      }}
    />
    <ProfileStack.Screen
      name="Gallery"
      component={imageGallery}
      options={{
        title: 'Gallery',
      }}
    />
    <ProfileStack.Screen
      name="PersonalChat"
      component={PersonalChat}
      options={{
        title: 'Chat',
      }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edit Profile',
      }}
    />
    <ProfileStack.Screen
      name="EditEmail"
      component={EditEmail}
      options={{
        title: 'Edit Email',
      }}
    />
    <ProfileStack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        title: 'Change Password',
      }}
    />
  </ProfileStack.Navigator>
);

const ServiceStackScreen = ({navigation}) => (
  <ServiceStack.Navigator
    initialRouteName="Wallet"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ServiceStack.Screen
      name="Services"
      component={ServiceScreen}
      options={{
        title: 'Services',
      }}
    />
        <ServiceStack.Screen
      name="Wallet"
      component={Wallet}
      options={{
        title: 'Services',
      }}
    />
            <ServiceStack.Screen
      name="Gezzet"
      component={Gezzet}
      options={{
        title: 'Gezzets',
      }}
    />
  </ServiceStack.Navigator>
);

const PostStackScreen = ({navigation}) => (
  <PostStack.Navigator
    initialRouteName="Post"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <PostStack.Screen
      name="Post"
      component={PostScreen}
      options={{
        title: 'Post your Ad',
      }}
    />
  </PostStack.Navigator>
);

const CategoryStackScreen = ({navigation}) => (
  <CategoryStack.Navigator
    initialRouteName="Category"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CategoryStack.Screen
      name="Category"
      component={Categories}
      options={{
        title: 'Category',
      }}
    />
        <CategoryStack.Screen
      name="MainCategories"
      component={mainCategories}
      options={{
        title: 'AJ Marketing & Services',
      }}
    />

<CategoryStack.Screen
      name="Post"
      component={postDetails}
      options={{
        title: 'AJ Marketing & Services',
      }}
    />

<CategoryStack.Screen
      name="Gallery"
      component={imageGallery}
      options={{
        title: 'Gallery',
      }}
    />
  </CategoryStack.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'AJ Marketing & Services',
        headerRight: () => (
          // <Icon3.Button
          //   name="ios-search"
          //   size={25}
          //   color={'#000'}
          //   backgroundColor="#fff"
          //   onPress={() => navigation.navigate('Settings')}
          // />
          <HeaderButtons>
            <Item
              IconComponent={Icon3}
              iconSize={25}
              color={'black'}
              title={'Search'}
              iconName={'search'}
              onPress={() => navigation.navigate('Search')}
            />
            <Item
              IconComponent={Icon3}
              iconSize={25}
              color={'black'}
              title={'Notification'}
              iconName={'notifications'}
              onPress={() => navigation.navigate('Notification')}
            />
          </HeaderButtons>
        ),
      }}
    />
    <HomeStack.Screen
      name="About"
      component={About}
      options={{
        title: 'About',
      }}
    />
    <HomeStack.Screen
      name="Search"
      component={Search}
      options={{
        title: 'Search',
      }}
    />
    <HomeStack.Screen
      name="Notification"
      component={Notification}
      options={{
        title: 'Notification',
      }}
    />
    <HomeStack.Screen
      name="Post"
      component={postDetails}
      options={{
        title: 'AJ Marketing & Services',
      }}
    />
    <HomeStack.Screen
      name="ChatHome"
      component={ChatHome}
      options={{
        title: 'ChatHome',
      }}
    />
    <HomeStack.Screen
      name="Chat"
      component={Chat}
      options={{
        title: 'Chat',
      }}
    />
        <HomeStack.Screen
      name="Gallery"
      component={imageGallery}
      options={{
        title: 'Gallery',
      }}
    />
  </HomeStack.Navigator>
);
