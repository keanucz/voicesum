import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { QrCode, MessageCircle, Check, ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

const messagingApps = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect via QR code or phone number',
    icon: MessageCircle,
    color: '#25D366',
    method: 'QR Code',
  },
  {
    id: 'signal',
    name: 'Signal',
    description: 'Link your Signal account securely',
    icon: MessageCircle,
    color: '#3A76F0',
    method: 'QR Code',
  },
];

export default function ConnectAccounts() {
  const [connectedApps, setConnectedApps] = useState<string[]>([]);

  const handleConnectApp = (appId: string) => {
    if (Platform.OS === 'web') {
      Alert.alert('Demo Mode', 'QR code scanning requires a mobile device. For now, we\'ll simulate the connection.');
      setConnectedApps(prev => [...prev, appId]);
    } else {
      // In a real implementation, this would open the camera for QR code scanning
      router.push('/camera-scanner');
    }
  };

  const canContinue = connectedApps.length > 0;

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Connect Your</Text>
          <Text style={styles.titleAccent}>Messaging Apps</Text>
          <Text style={styles.description}>
            Link your favorite messaging platforms to start receiving voice summaries
          </Text>
        </View>
        
        <View style={styles.appsContainer}>
          {messagingApps.map((app) => {
            const isConnected = connectedApps.includes(app.id);
            
            return (
              <TouchableOpacity
                key={app.id}
                style={[
                  styles.appCard,
                  isConnected && styles.connectedCard
                ]}
                onPress={() => handleConnectApp(app.id)}
                activeOpacity={0.8}
              >
                <View style={styles.appCardContent}>
                  <View style={[styles.appIcon, { backgroundColor: `${app.color}20` }]}>
                    <app.icon size={28} color={app.color} strokeWidth={2} />
                  </View>
                  
                  <View style={styles.appInfo}>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={styles.appDescription}>{app.description}</Text>
                    <View style={styles.methodContainer}>
                      <QrCode size={16} color="#6B7280" strokeWidth={2} />
                      <Text style={styles.methodText}>{app.method}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionContainer}>
                    {isConnected ? (
                      <View style={styles.connectedIndicator}>
                        <Check size={20} color="#10B981" strokeWidth={2} />
                      </View>
                    ) : (
                      <ArrowRight size={20} color="#6B7280" strokeWidth={2} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Your Privacy Matters</Text>
          <Text style={styles.infoText}>
            We only process message metadata and summaries. Your actual messages remain encrypted and private.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.continueButton, !canContinue && styles.disabledButton]}
            onPress={() => canContinue && router.push('/onboarding/voice-setup')}
            activeOpacity={canContinue ? 0.8 : 1}
            disabled={!canContinue}
          >
            <LinearGradient
              colors={canContinue ? ['#00D4FF', '#0EA5E9'] : ['#374151', '#374151']}
              style={styles.buttonGradient}
            >
              <Text style={[styles.buttonText, !canContinue && styles.disabledButtonText]}>
                Continue ({connectedApps.length} connected)
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => router.push('/onboarding/voice-setup')}
            activeOpacity={0.7}
          >
            <Text style={styles.skipText}>I'll connect later</Text>
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
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  titleAccent: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  appsContainer: {
    marginBottom: 32,
  },
  appCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  connectedCard: {
    borderColor: '#10B981',
    backgroundColor: '#10B98110',
  },
  appCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  appIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appInfo: {
    flex: 1,
    marginLeft: 16,
  },
  appName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  actionContainer: {
    marginLeft: 16,
  },
  connectedIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoText: {
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
  disabledButton: {
    opacity: 0.6,
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
  disabledButtonText: {
    color: '#9CA3AF',
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