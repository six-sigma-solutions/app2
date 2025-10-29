import React, { useRef, useEffect } from 'react';
import { ScrollView, ScrollViewProps, Keyboard, TextInput, findNodeHandle, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';

// AutoScrollView: wrapper around ScrollView that scrolls to top when the screen gains focus
// and automatically scrolls the currently focused input into view when the keyboard appears.
const AutoScrollView = React.forwardRef<any, ScrollViewProps>((props, forwardedRef) => {
  const localRef = useRef<ScrollView | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const id = setTimeout(() => {
        try {
          const target = (forwardedRef && (forwardedRef as any).current) || localRef.current;
          target?.scrollTo?.({ y: 0, animated: true });
        } catch (e) {
          // ignore
        }
      }, 60);

      return () => clearTimeout(id);
    }, [forwardedRef])
  );

  useEffect(() => {
    const onKeyboardShow = () => {
      // Short timeout to allow layout to update after keyboard opens
      setTimeout(() => {
        try {
          // Get the currently focused input (works across RN versions)
          const currentlyFocusedField = (TextInput as any).State?.currentlyFocusedInput
            ? (TextInput as any).State.currentlyFocusedInput()
            : (TextInput as any).State?.currentlyFocusedField && (TextInput as any).State.currentlyFocusedField();

          if (!currentlyFocusedField) return;

          const node = findNodeHandle(currentlyFocusedField);
          if (!node) return;

          const sv = (forwardedRef && (forwardedRef as any).current) || localRef.current;
          if (!sv || typeof sv.scrollResponderScrollNativeHandleToKeyboard !== 'function') return;

          const offset = (props as any).keyboardVerticalOffset ?? (Platform.OS === 'ios' ? 100 : 120);
          sv.scrollResponderScrollNativeHandleToKeyboard(node, offset, true);
        } catch (e) {
          // ignore
        }
      }, 50);
    };

    const showSub = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [forwardedRef, props]);

  const setRef = (node: ScrollView | null) => {
    localRef.current = node;
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else (forwardedRef as any).current = node;
  };

  // Ensure ScrollView itself fills available space and uses the same background color
  // as the content to avoid white gaps above the keyboard on some devices.
  const incomingStyle = (props as any).style || {};
  const incomingContentStyle = (props as any).contentContainerStyle || {};
  // Default to the app's blue so gaps above the keyboard match the screen color;
  // allow explicit overrides via contentContainerStyle or style.
  const bg = incomingContentStyle.backgroundColor || incomingStyle.backgroundColor || '#2a74c6';

  return (
    <ScrollView
      ref={setRef as any}
      keyboardShouldPersistTaps="handled"
      style={[{ flex: 1, backgroundColor: bg }, incomingStyle]}
      contentContainerStyle={[{ flexGrow: 1, minHeight: '100%' }, incomingContentStyle]}
      {...props}
    />
  );
});

// Add displayName for clearer React DevTools and to satisfy eslint (react/display-name)
(AutoScrollView as any).displayName = 'AutoScrollView';

export default AutoScrollView;
