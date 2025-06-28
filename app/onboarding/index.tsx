import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Play } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function OnboardingIndex() {
  const pulse = useSharedValue(1);
  
  pulse.value = withRepeat(
    withTiming(1.1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B', '#2A1A3A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, animatedStyle]}>
          <LinearGradient
            colors={['#00D4FF', '#8B5CF6']}
            style={styles.logoGradient}
          >
            <Play size={48} color="#FFFFFF" strokeWidth={2} />
          </LinearGradient>
        </Animated.View>
        
        <Text style={styles.title}>VoiceFlow</Text>
        <Text style={styles.subtitle}>Messenger</Text>
        
        <Text style={styles.description}>
          Transform your message overload into personalized voice summaries.
          Stay connected without the chaos.
        </Text>
        
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => router.push('/onboarding/welcome')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#00D4FF', '#0EA5E9']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your conversations, summarized intelligently
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 42,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    color: '#00D4FF',
    textAlign: 'center',
    marginBottom: 32,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  getStartedButton: {
    width: width - 64,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  footer: {
    paddingBottom: 48,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});