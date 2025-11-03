import React from 'react';
import { View, Text } from 'react-native';
export default function Overview() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Overview</Text>
      <Text style={{ marginTop: 12 }}>This is the Overview page.</Text>
    </View>
  );
}
