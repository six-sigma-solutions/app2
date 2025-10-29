import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Platform,
  TextStyle,
  Text,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  containerStyle?: any;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  rightIcon?: React.ReactNode;
};

const FloatingLabelInput = React.forwardRef<any, Props>(
  (
    {
      label,
      value,
      onFocus,
      onBlur,
      containerStyle,
      labelStyle,
      inputStyle,
      ...rest
    },
    ref
  ) => {
    const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
    const [isFocused, setIsFocused] = useState(false);
  const internalRef = useRef<TextInput | null>(null);

    useEffect(() => {
      Animated.timing(animated, {
        toValue: isFocused || !!value ? 1 : 0,
        duration: 160,
        useNativeDriver: false,
      }).start();
    }, [isFocused, value, animated]);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const labelTop = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    });

    const labelFontSize = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    });

    const labelColor = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,0.7)', '#fff'],
    });

    // expose focus() through the forwarded ref
    React.useImperativeHandle(ref, () => ({
      focus: () => {
        (internalRef.current as any)?.focus?.();
      },
      blur: () => {
        (internalRef.current as any)?.blur?.();
      },
      // expose the native node too
      getNative: () => internalRef.current,
    }));

    return (
      <View style={[styles.container, containerStyle]}>
        <Animated.Text
          accessible={false}
          pointerEvents="none"
          style={[
            styles.label,
            labelStyle,
            { top: labelTop, fontSize: labelFontSize, color: labelColor } as any,
          ]}
        >
          {label}
        </Animated.Text>
        <View style={styles.inputBoxWrap}>
          <TextInput
            ref={internalRef as any}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[styles.input, inputStyle, { flex: 1 }]}
            placeholder={isFocused ? '' : undefined}
            placeholderTextColor="rgba(255,255,255,0.7)"
            {...rest}
          />
          {rest.rightIcon ? (
            <View style={styles.iconWrap}>{rest.rightIcon}</View>
          ) : null}
        </View>
      </View>
    );
  }
);

export default FloatingLabelInput;

// Provide a display name for debugging and to satisfy eslint react/display-name
(FloatingLabelInput as any).displayName = 'FloatingLabelInput';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 12,
  },
  label: {
    position: 'absolute',
    left: 14,
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
  },
  inputBoxWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'transparent',
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    paddingTop: Platform.OS === 'ios' ? 18 : 14,
    color: '#fff',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  iconWrap: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
