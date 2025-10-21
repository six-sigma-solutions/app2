import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function AuthHeader({ title = 'DailyMoney', subtitle = 'Manage your money easily' }: Props) {
  return (
    <View style={styles.container} accessible accessibilityRole="header">
      {/* prefer local asset if available */}
      {/* eslint-disable-next-line global-require, import/no-dynamic-require */}
      <Image
        source={
          (() => {
            try {
              return require('../assets/logo.png');
            } catch (e) {
              return { uri: 'https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png' };
            }
          })()
        }
        style={styles.logo}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        accessibilityLabel="DailyMoney logo"
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
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F2330',
  },
  subtitle: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
});
