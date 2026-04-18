import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from 'react-native-responsive-screen';

const OPTIONS = [
  { label: 'Individual', value: 'Individual' },
  { label: 'Community Group', value: 'Community Group' },
  { label: 'Organisation', value: 'Organisation' },
];

const RoleSelection = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('Individual');

  const handleNavigation = () => {
    const screen = selectedOption === 'Individual' ? 'Signup' : 'CompanyAdmin';

    navigation.navigate('AuthStack', { screen });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Splashbackground.jpg')}
          style={styles.backgroundImage}
        />

        <View style={styles.content}>
          <View style={styles.topCard}>
            <View style={styles.headingWrapper}>
              <Text style={styles.heading}>How are you using</Text>
              <Text style={styles.heading}>Planet Care?</Text>
            </View>

            <View style={styles.optionsWrapper}>
              {OPTIONS.map(option => {
                const isSelected = selectedOption === option.value;

                return (
                  <TouchableOpacity
                    key={option.value}
                    activeOpacity={0.8}
                    onPress={() => setSelectedOption(option.value)}
                    style={styles.optionRow}
                  >
                    <View
                      style={[
                        styles.radioOuter,
                        isSelected && styles.radioOuterSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>

                    <Text style={styles.optionText}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              style={{
                alignSelf: 'center',
                marginTop: H('2%'),
              }}
            >
              <TouchableOpacity
                onPress={handleNavigation}
                activeOpacity={0.8}
                style={styles.nextButton}
              >
                <Image
                  source={require('../../assets/images/yellow.png')}
                  style={styles.nextButtonImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Image
              source={require('../../assets/images/greenplante.png')}
              style={styles.plantImage}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: W('100%'),
    height: H('100%'),
    resizeMode: 'cover',
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topCard: {
    width: '100%',
    minHeight: H('42%'),
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: H('6%'),
    paddingHorizontal: W('8%'),
    paddingBottom: H('4%'),
  },

  headingWrapper: {
    marginBottom: H('3%'),
  },

  heading: {
    fontSize: W('8%'),
    fontWeight: '800',
    color: '#111111',
    lineHeight: W('10%'),
  },

  optionsWrapper: {
    marginTop: H('1%'),
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: H('2.2%'),
  },

  radioOuter: {
    width: W('5.5%'),
    height: W('5.5%'),
    borderRadius: W('2.75%'),
    borderWidth: 1.5,
    borderColor: '#999999',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: W('4%'),
  },

  radioOuterSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#FFF8D6',
  },

  radioInner: {
    width: W('2.8%'),
    height: W('2.8%'),
    borderRadius: W('1.4%'),
    backgroundColor: '#FFD700',
  },

  optionText: {
    fontSize: W('4.3%'),
    color: '#222222',
    flexShrink: 1,
  },

  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: H('2%'),
  },

  nextButton: {
    marginBottom: H('1%'),
    zIndex: 2,
  },

  nextButtonImage: {
    width: W('22%'),
    height: H('7%'),
    resizeMode: 'contain',
  },

  plantImage: {
    width: W('72%'),
    height: H('40%'),
    resizeMode: 'contain',
  },
});
