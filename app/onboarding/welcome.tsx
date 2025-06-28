import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MessageSquare, Volume2, Zap, Shield } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const features = [
  {
    icon: MessageSquare,
    title: 'Smart Summaries',
    description: 'AI-powered conversation summaries that capture what matters most',
  },
  {
    icon: Volume2,
    title: 'Voice First',
    description: 'Listen to your messages while commuting, working out, or multitasking',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get up to speed instantly with quick, digestible voice updates',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your conversations stay private with end-to-end encryption',
  },
];

export default function Welcome() {
  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to the Future</Text>
          <Text style={styles.subtitle}>of Messaging</Text>
        </View>
        
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <feature.icon size={28} color="#00D4FF" strokeWidth={2} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/onboarding/connect-accounts')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#00D4FF', '#0EA5E9']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#8B5CF6',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 48,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00D4FF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  continueButton: {
    width: width - 48,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 16,
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
  skipButton: {
    paddingVertical: 12,
  },
  skipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
});