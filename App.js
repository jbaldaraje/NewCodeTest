import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const convertDate = (timestamp) => {
  const milliseconds = parseInt(timestamp, 10) * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString();
};

const getUsers = async () => {
  return [
    {
      id: 1,
      name: 'User 1',
      login: 'user_1',
      lastLoggedIn: '1590742926',
      icon:
        'https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/User_No-Frame.png',
    },
    {
      id: 2,
      name: 'User 2',
      login: 'user_2',
      lastLoggedIn: '1590741926',
      icon:
        'https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/User_No-Frame.png',
    },
    {
      id: 3,
      name: 'User 3',
      login: 'user_3',
      lastLoggedIn: '1590742226',
      icon:
        'https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/User_No-Frame.png',
    },
  ];
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await getUsers();
      setUsers(response);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size={'large'} color={'#1121c3'} />}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={users}
        renderItem={({item, index, separator}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.icon}} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text>{item.name}</Text>
              <Text>{item.login}</Text>
              <Text>{convertDate(item.lastLoggedIn)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>No users</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 20,
  },
  detailsContainer: {
    justifyContent: 'center',
  },
});

export default Users;