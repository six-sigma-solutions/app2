import React from 'react';
import { View, Text } from 'react-native';
export default function Members() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Members</Text>
      <Text style={{ marginTop: 12 }}>This is the Members page.</Text>
    </View>
  );
}
