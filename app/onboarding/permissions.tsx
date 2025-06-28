import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Camera, Bell, Mic, Shield, Check } from 'lucide-react-native';
import { useState } from 'react';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

const permissions = [
  {
    id: 'camera',
    icon: Camera,
    title: 'Camera Access',
    description: 'Scan QR codes to link messaging accounts',
    required: true,
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Push Notifications',
    description: 'Get alerts for new voice summaries',
    required: false,
  },
  {
    id: 'microphone',
    icon: Mic,
    title: 'Microphone Access',
    description: 'Voice commands and feedback features',
    required: false,
  },
];

export default function Permissions() {
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([]);

  const handleGrantPermission = async (permissionId: string) => {
    if (Platform.OS === 'web') {
      // Simulate permission grant on web
      Alert.alert('Permission Granted', `${permissionId} access has been enabled.`);
      setGrantedPermissions(prev => [...prev, permissionId]);
      return;
    }

    try {
      // In a real app, you would request actual permissions here
      // For now, we'll simulate the process
      setGrantedPermissions(prev => [...prev, permissionId]);
    } catch (error) {
      Alert.alert('Permission Error', 'Failed to grant permission. Please try again.');
    }
  };

  const requiredPermissionsGranted = permissions
    .filter(p => p.required)
    .every(p => grantedPermissions.includes(p.id));

  const handleFinishOnboarding = () => {
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Shield size={48} color="#00D4FF" strokeWidth={2} />
          <Text style={styles.title}>Grant Permissions</Text>
          <Text style={styles.description}>
            We need some permissions to provide you with the best experience
          </Text>
        </View>
        
        <View style={styles.permissionsContainer}>
          {permissions.map((permission) => {
            const isGranted = grantedPermissions.includes(permission.id);
            
            return (
              <View key={permission.id} style={styles.permissionCard}>
                <View style={styles.permissionContent}>
                  <View style={styles.permissionIcon}>
                    <permission.icon size={24} color="#00D4FF" strokeWidth={2} />
                  </View>
                  
                  <View style={styles.permissionInfo}>
                    <View style={styles.permissionHeader}>
                      <Text style={styles.permissionTitle}>{permission.title}</Text>
                      {permission.required && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredText}>Required</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.permissionDescription}>{permission.description}</Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.grantButton,
                    isGranted && styles.grantedButton
                  ]}
                  onPress={() => !isGranted && handleGrantPermission(permission.id)}
                  activeOpacity={isGranted ? 1 : 0.8}
                  disabled={isGranted}
                >
                  {isGranted ? (
                    <Check size={20} color="#10B981" strokeWidth={2} />
                  ) : (
                    <Text style={styles.grantButtonText}>Grant</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🛡️ Privacy First</Text>
          <Text style={styles.infoText}>
            Your data stays on your device. We only process what's necessary to create your voice summaries, 
            and you can revoke permissions anytime in Settings.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.finishButton,
              !requiredPermissionsGranted && styles.disabledButton
            ]}
            onPress={handleFinishOnboarding}
            activeOpacity={requiredPermissionsGranted ? 0.8 : 1}
            disabled={!requiredPermissionsGranted}
          >
            <LinearGradient
              colors={requiredPermissionsGranted ? ['#10B981', '#059669'] : ['#374151', '#374151']}
              style={styles.buttonGradient}
            >
              <Text style={[
                styles.buttonText,
                !requiredPermissionsGranted && styles.disabledButtonText
              ]}>
                Get Started
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleFinishOnboarding}
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
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionsContainer: {
    marginBottom: 32,
  },
  permissionCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  permissionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  permissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00D4FF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  requiredBadge: {
    backgroundColor: '#EF444420',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  requiredText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#EF4444',
  },
  permissionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  grantButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#00D4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  grantedButton: {
    backgroundColor: '#10B98120',
    minWidth: 40,
    paddingHorizontal: 12,
  },
  grantButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
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
  finishButton: {
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