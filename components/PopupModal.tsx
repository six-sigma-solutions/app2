import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  // allow message to be either string or React node so callers can style it
  message?: string | React.ReactNode;
  buttonText?: string;
};

export default function PopupModal({ visible, onClose, title = 'Notice', message = '', buttonText = 'OK' }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 8, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, opacity, translateY]);

  const { width: screenWidth } = Dimensions.get('window');
  const containerWidthStyle = screenWidth <= 1200 ? { backgroundColor: 'rgba(0,0,0,0.3)' } : {};
  const webBackdrop = Platform.select({ web: { backdropFilter: 'blur(6px)' } as any, default: {} });

  return (
    <Modal visible={visible} transparent onRequestClose={onClose} animationType={Platform.OS === 'ios' ? 'slide' : 'none'}>
  <View style={[styles.overlay, webBackdrop as any]}>
        <Animated.View style={[styles.box, containerWidthStyle, { opacity, transform: [{ translateY }] }]}>
          <Text style={styles.title}>{title}</Text>
          {/* message may be a string or a React node (Text) */}
          {typeof message === 'string' ? (
            <Text style={styles.message}>{message}</Text>
          ) : (
            // if caller passes a Text node, render it directly but ensure container styling
            <View style={{ alignSelf: 'stretch', marginBottom: 22 }}>{message}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: Platform.OS === 'web' ? 'rgba(245,245,245,0.9)' : 'rgba(240,240,240,0.95)',
    color: '#111',
    paddingVertical: 28,
    paddingHorizontal: 32,
    borderRadius: 18,
    width: '84%',
    maxWidth: 760,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#b71c1c',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    marginBottom: 22,
    fontSize: 22,
    fontWeight: '600',
    color: '#0b3bff',
    textAlign: 'center',
    alignSelf: 'stretch',
    lineHeight: 34,
    fontFamily: Platform.select({ ios: 'Segoe UI', android: 'sans-serif', default: 'System' }),
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#b71c1c',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 26,
    alignItems: 'center',
    minWidth: 140,
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
