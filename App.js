

/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const renderItem = ({ item }) => {
  return (
    <View style={styles.itemWrapperStyle}>
        <Text style={styles.textNameStyle}>{item.event_name}</Text>
        <Text style={{fontSize:20}}>{item.isRequested ? 'Joined' : 'Not Joined'}</Text>
    </View>
  );
};


function App() {
  const [data, setData] = useState([]);
  const [page, setPage]= useState("-1");
  const [curData, setCurData] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDAwOWNhMzkxYjk1ZjY2OWY0OWVmMGUiLCJpYXQiOjE2Nzg3MDQ0MjAsImV4cCI6MTY4MDg2NDQyMH0.n2v7AX0b8DvIw6giyxhX3Iavo78FPeyPR30rNfK_EuI';
  getData = () => {
    if(page===undefined){
      page=-1;
    }
    axios
      .get(
        `http://13.233.95.158:5000/api_get_events_near_me/${page}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(result => {
        setData([...data, ...result.data.data]);
        setCurData(result.data.data);
      });
  };
  const loadmore = ()=>{
    if(curData.length>0){
      setPage(data[data.length-1]._id)
    }
  }
  const renderLoader = () => {
    if (curData.length>0) {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      );
    }
  };

  useEffect(() => {
    getData();
  }, [page]);
  return (
    <FlatList
      style={{ marginTop:50}}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      ListFooterComponent={renderLoader}
      onEndReached={loadmore}
      onEndReachedThreshold={0}
    />
  );
}
const styles = StyleSheet.create({
  itemWrapperStyle: {
    height:100,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  contentWrapperStyle: {
    
  },
  textNameStyle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
  loaderStyle: {
    marginVertical: 18,
    alignItems: 'center',
  },
});
export default App;
