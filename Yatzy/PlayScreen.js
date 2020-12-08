import React, { useState, useEffect } from'react';
import { View, StyleSheet, Image, Alert, BackHandler } from'react-native';
import { Button, Overlay, Text, Input, Icon, registerCustomIconType } from 'react-native-elements';
import * as Haptics from 'expo-haptics';
import RNExitApp from 'react-native-exit-app';

export default function PlayScreen(props) {
    const [ones, setOnes] = useState('');
    const [twos, setTwos] = useState('');
    const [threes, setThrees] = useState('');
    const [fours, setFours] = useState('');
    const [fives, setFives] = useState('');
    const [sixes, setSixes] = useState('');
    const [pair, setPair] = useState('');
    const [twoPairs, setTwoPairs] = useState('');
    const [threeSame, setThreeSame] = useState('');
    const [fourSame, setFourSame] = useState('');
    const [straighS, setStraightS] = useState('');
    const [straighB, setStraightB] = useState('');
    const [fullH, setFullH] = useState('');
    const [chance, setChance] = useState('');
    const [yatzy, setYatzy] = useState('');
    //const [results, setResults]=useState(['','','','','','','','','','','','','','','','']);
    const [total, setTotal]=useState(0);
    const [bonus, setBonus]=useState(0);
    const [rounds, setRounds]=useState(0);

    useEffect(() => {
        if (rounds==15) {
            Alert.alert(
                "You are the champion with " + total + " points!",
                "If you want to save your result, press SAVE",
                [
                    {
                        text: "Cancel and exit app",
                        onPress:() => BackHandler.exitApp(),
                        style:"negative"
                    },
                    {
                        text: "SAVE",
                        onPress: () => saveResult(),
                        style:"positive"
                    }
                ]
            );
        }
    });

    const saveResult = () => {
        console.log("save to firebase");
    }
    
    const registerYatzy = () => {
        //console.log(yatzy);
        var y = parseInt(yatzy);
        console.log(y);
        if (y==50 || y==0) {
            setTotal(total+y);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setYatzy(0);
        }
    };

    const registerChance = () => {
        var c = parseInt(chance);
        if (c>30 || c<5) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setChance(0); 
        } else {
            setTotal(total+c);
            setRounds(rounds+1);
        }
    }

    const registerBig = () => {
        var b = parseInt(straighB);
        if (b==20 || b==0) {
            setTotal(total+b);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setStraightB(0);
        }
    }

    const registerSmall = () => {
        var s = parseInt(straighS);
        if (s==15 || s==0) {
            setTotal(total+s);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setStraightS(0);
        }
    }

    const registerFull = () => {
        var fh = parseInt(fullH);
        if (fh==30 || fh==5 || fh==0 || (fh<=28 && fh>=7 )) {
            setTotal(total+fh);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setFullH(0);
        }
    }

    const registerFS = () => {
        var fs = parseInt(fourSame);
        if (fs<=24 && fs>=0 && fs%4==0) {
            setTotal(total+fs);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setFourSame(0);
        }
    }

    const registerTS = () => {
        var ts = parseInt(threeSame);
        if (ts<=18 && ts>=0 && ts%3==0) {
            setTotal(total+ts);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setThreeSame(0);
        }
    }

    const registerTP = () => {
        var tp = parseInt(twoPairs);
        if (tp<=24 && (tp>=4 || tp==0) && tp%2==0) {
            setTotal(total+tp);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setTwoPairs(0);
        }
    }

    const registerPair = () => {
        var p = parseInt(pair);
        if (p<=12 && p>=0 && p%2==0) {
            setTotal(total+p);
            setRounds(rounds+1);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setPair(0);
        }
    }

    const registerSixes = () => {
        var six = parseInt(sixes);
        if (six<=30 && six>=0 && six%6==0) {
            setTotal(total+six);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setSixes(0);
        }  
    }

    const registerFives = () => {
        var five = parseInt(fives);
        if (five<=25 && five>=0 && five%5==0) {
            setTotal(total+five);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setFives(0);
        }
    }

    const registerFours = () => {
        var four = parseInt(fours);
        if (four<=20 && four>=0 && four%4==0) {
            setTotal(total+four);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setFours(0);
        }
    }

    const registerThrees = () => {
        var three = parseInt(threes);
        if (three<=15 && three>=0 && three%3==0) {
            setTotal(total+three);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setThrees(0);
        }
    }

    const registerTwos = () => {
        var two = parseInt(twos);
        if (two<=10 && two>=0 && two%2==0) {
            setTotal(total+two);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setTwos(0);
        }
    }

    const registerOnes = () => {
        var one = parseInt(ones);
        if (one<=5 && one>=0) {
            setTotal(total+one);
            setRounds(rounds+1);
            countBonus();
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setOnes(0);
        }
    }
    
    const countBonus = () => {
        var one;
        var two;
        var three;
        var four;
        var five;
        var six;
        if (ones===''){
            one = 0;
        } else {one = parseInt(ones);}
        if (twos===''){
            two = 0;
        } else {two=parseInt(twos)}
        if (threes==='') {
            three = 0;
        } else {three = parseInt(threes)}
        if (fours===''){
            four = 0;
        } else {four=parseInt(fours)}
        if (fives===''){
            five = 0;
        } else {five=parseInt(fives)}
        if (sixes===''){
            six=0;
        } else {six=parseInt(sixes)}
        var up = one+two+three+four+five+six;
        if (up>=63 && bonus==0) {
            setBonus(50);
            setTotal(total+50);
        }
    }

    return(
    <View style={styles.container}>
      <View style={{flex:1, justifyContent: 'flex-end'}}>
        <Image style={{height:60, width: 50}}
            source={{ uri: props.photoName }} />
        <Text h4>
            Total points 
        </Text>
        <Text h3>{total}</Text>
      </View>
      <View style={{flex: 1, marginTop: 15}}>
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Ones'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-1',
                onPress:()=>registerOnes()}}
            onChangeText={text=> setOnes(text)}
            value={ones}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Twos'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-2',
                onPress:()=>registerTwos()}}
            onChangeText={text=> setTwos(text)}
            value={twos}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Threes'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-3',
                onPress:()=>registerThrees()}}
            onChangeText={text=> setThrees(text)}
            value={threes}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Fours'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-4',
                onPress:()=>registerFours()}}
            onChangeText={text=> setFours(text)}
            value={fours}
        />
        <Input
            placeholder='Fives'
            keyboardType='numeric'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-5',
                onPress:()=>registerFives()}}
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            onChangeText={text=> setFives(text)}
            value={fives}
        />
        <Input
            placeholder='Sixes'
            keyboardType='numeric'
            leftIcon={{ size: 15, type: 'material-community', name: 'dice-6',
                onPress:()=>registerSixes()}}
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            onChangeText={text=> setSixes(text)}
            value={sixes}
        />
        <View style={{flexDirection:'row'}}>
        <Icon style={{ paddingBottom: 20, marginLeft:10}} size={15} type='material-community' name='comment-plus'/>
        <Text style={{ alignContent:'flex-start', height: 20, marginLeft: 2, marginBottom: 10, textDecorationLine: 'underline'}}>Bonus {bonus}</Text>
        </View>
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Pair'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerPair()}}
            onChangeText={text=> setPair(parseInt(text))}
            value={pair}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Two pairs'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerTP()}}
            onChangeText={text=> setTwoPairs(text)}
            value={twoPairs}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Three same'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerTS()}}   
            onChangeText={text=> setThreeSame(text)}
            value={threeSame}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Four same'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerFS()}}
            onChangeText={text=> setFourSame(text)}
            value={fourSame}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Full house'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerFull()}}
            onChangeText={text=> setFullH(text)}
            value={fullH}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Small straight'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerSmall()}}
            onChangeText={text=> setStraightS(text)}
            value={straighS}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Big straight'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerBig()}}
            onChangeText={text=> setStraightB(text)}
            value={straighB}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='Chance'
            leftIcon={{ size:15, type:'material-community', name:'dice-6',
                onPress:()=>registerChance()}}
            onChangeText={text=>setChance(text)}
            value={chance}
        />
        <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.text}
            keyboardType='numeric'
            placeholder='YATZY'
            leftIcon={{ size:15, type:'material-community', name:'dice-6', 
                onPress:()=>registerYatzy()}}
            onChangeText={text=>setYatzy(text)}
            value={yatzy}  
        />
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 80,
      height: 11,
      paddingBottom: 6,
    },
    text:{
      fontSize: 10,
    },
  });