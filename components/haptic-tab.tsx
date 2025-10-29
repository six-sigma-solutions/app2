// Avoid importing the BottomTabBarButtonProps type directly since some setups
// may not expose its declaration to TypeScript. Use a permissive any for props
// to keep this small helper robust across editor/tsserver configs.
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform, GestureResponderEvent } from 'react-native';

export function HapticTab(props: any) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev: GestureResponderEvent) => {
        if (Platform.OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev as any);
      }}
    />
  );
}
