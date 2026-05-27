
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { login } from '@/store/authStore';
import { FontFamily } from '@/theme/fonts';

export default function LoginScreen() {
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState('com.shahare@gmail.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await login(email.trim(), password);
      if (!success)
        setError('Invalid credentials. Try com.shahare@gmail.com / password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      
      <View style={styles.hero}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
          style={styles.heroImg}
        />
        <View style={[styles.heroOverlay, { backgroundColor: colors.primary }]} />
        <View style={styles.heroContent}>
          <Text style={styles.heroEmoji}>🍛</Text>
          <Text style={styles.heroTitle}>Delulu Food</Text>
          <Text style={styles.heroSub}>Ghar jaisa khana, delivered fast</Text>
        </View>
      </View>

      
      <ScrollView
        style={[styles.sheet, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.sheetContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.sheetTitle, { color: colors.text }]}>Welcome back 👋</Text>
        <Text style={[styles.sheetSub, { color: colors.textSecondary }]}>
          Sign in to continue
        </Text>

        
        <View style={styles.fieldWrap}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.text,
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        
        <View style={styles.fieldWrap}>
          <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.text,
              },
            ]}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: isDark ? '#2a0a0c' : '#FFF0F1' }]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            styles.loginBtn,
            { backgroundColor: colors.primary },
            loading && styles.loginBtnDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginBtnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    height: 350,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  heroImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.35,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: { alignItems: 'center', paddingBottom: 15 },
  heroEmoji: { fontSize: 44, marginBottom: 6, fontFamily: FontFamily.bold },
  heroTitle: {
    fontSize: 30,
    fontFamily: FontFamily.black,
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.88)',
    marginTop: 3,
    fontFamily: FontFamily.semiBold,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: -22,
  },
  sheetContent: { padding: 24, paddingTop: 28 },
  sheetTitle: { fontSize: 24, fontFamily: FontFamily.extraBold, marginBottom: 4 },
  sheetSub: { fontSize: 14, marginBottom: 24, fontFamily: FontFamily.regular },
  fieldWrap: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: FontFamily.medium,
  },
  errorBox: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E23744',
  },
  errorText: { color: '#E23744', fontSize: 13, fontFamily: FontFamily.medium },
  loginBtn: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#105d08',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginBtnDisabled: { opacity: 0.7 },
  loginBtnText: { color: '#fff', fontSize: 16, fontFamily: FontFamily.bold },
  forgotBtn: { alignItems: 'center', marginTop: 18, padding: 8 },
  forgotText: { fontSize: 14, fontFamily: FontFamily.semiBold },
});
