import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function AuthHeader({ title = '', subtitle = 'Manage your healthy, wealthy life!  '}: Props) {
  return (
    <View style={styles.container} accessible accessibilityRole="header">
      {/* prefer local asset if available */}
      { }
      <Image
        source={
          (() => {
            try {
              return require('../assets/DailyMoney.png');
            } catch (e) {
              return { uri: 'https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png' };
            }
          })()
        }
        style={styles.logo}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        accessibilityLabel="DM logo"
      />
      <Text style={styles.title} accessibilityRole="text">
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 18,
  },
  logo: {
    width: 160,
    height: 150,
    
  
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    padding:-1,
  },
  subtitle: {
    marginTop: -50,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 17,
  },
});
