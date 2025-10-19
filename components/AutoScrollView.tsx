import React, { useRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useFocusEffect } from 'expo-router';

// AutoScrollView: wrapper around ScrollView that scrolls to top when the screen gains focus
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

  const setRef = (node: ScrollView | null) => {
    localRef.current = node;
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else (forwardedRef as any).current = node;
  };

  return <ScrollView ref={setRef as any} {...props} />;
});

export default AutoScrollView;
