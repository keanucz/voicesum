import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings as SettingsIcon, Bell, Volume2, Shield, CircleHelp as HelpCircle, User, Smartphone, ChevronRight, MessageCircle, Palette, Clock } from 'lucide-react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceOnLockScreen, setVoiceOnLockScreen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const SettingRow = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showChevron = true,
    rightComponent 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      disabled={!onPress}
    >
      <View style={styles.settingRowLeft}>
        <View style={styles.settingIcon}>
          <Icon size={20} color="#00D4FF" strokeWidth={2} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <View style={styles.settingRowRight}>
        {rightComponent || (showChevron && (
          <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <SettingsIcon size={32} color="#00D4FF" strokeWidth={2} />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your VoiceFlow experience</Text>
        </View>

        {/* Account */}
        <SettingSection title="Account">
          <SettingRow
            icon={User}
            title="Profile"
            subtitle="Manage your account details"
            onPress={() => console.log('Profile pressed')}
          />
          <SettingRow
            icon={MessageCircle}
            title="Connected Accounts"
            subtitle="WhatsApp, Signal - 2 connected"
            onPress={() => console.log('Connected accounts pressed')}
          />
        </SettingSection>

        {/* Voice & Audio */}
        <SettingSection title="Voice & Audio">
          <SettingRow
            icon={Volume2}
            title="Voice Personality"
            subtitle="Casual Casey"
            onPress={() => console.log('Voice personality pressed')}
          />
          <SettingRow
            icon={Clock}
            title="Summary Length"
            subtitle="Detailed (1-2 minutes)"
            onPress={() => console.log('Summary length pressed')}
          />
          <SettingRow
            icon={Volume2}
            title="Auto-play Summaries"
            subtitle="Automatically play new summaries"
            showChevron={false}
            rightComponent={
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: '#374151', true: '#00D4FF40' }}
                thumbColor={autoPlay ? '#00D4FF' : '#9CA3AF'}
              />
            }
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications">
          <SettingRow
            icon={Bell}
            title="Push Notifications"
            subtitle="Get notified about new summaries"
            showChevron={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#374151', true: '#00D4FF40' }}
                thumbColor={notificationsEnabled ? '#00D4FF' : '#9CA3AF'}
              />
            }
          />
          <SettingRow
            icon={Smartphone}
            title="Lock Screen Playback"
            subtitle="Play summaries from lock screen"
            showChevron={false}
            rightComponent={
              <Switch
                value={voiceOnLockScreen}
                onValueChange={setVoiceOnLockScreen}
                trackColor={{ false: '#374151', true: '#00D4FF40' }}
                thumbColor={voiceOnLockScreen ? '#00D4FF' : '#9CA3AF'}
              />
            }
          />
          <SettingRow
            icon={Bell}
            title="Notification Schedule"
            subtitle="Quiet hours: 10 PM - 7 AM"
            onPress={() => console.log('Notification schedule pressed')}
          />
        </SettingSection>

        {/* Appearance */}
        <SettingSection title="Appearance">
          <SettingRow
            icon={Palette}
            title="Theme"
            subtitle="Dark mode"
            onPress={() => console.log('Theme pressed')}
          />
          <SettingRow
            icon={Smartphone}
            title="Haptic Feedback"
            subtitle="Vibrate on interactions"
            showChevron={false}
            rightComponent={
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#374151', true: '#00D4FF40' }}
                thumbColor={hapticFeedback ? '#00D4FF' : '#9CA3AF'}
              />
            }
          />
        </SettingSection>

        {/* Privacy & Security */}
        <SettingSection title="Privacy & Security">
          <SettingRow
            icon={Shield}
            title="Privacy Settings"
            subtitle="Control your data and privacy"
            onPress={() => console.log('Privacy pressed')}
          />
          <SettingRow
            icon={Shield}
            title="Data & Storage"
            subtitle="Manage local data and cache"
            onPress={() => console.log('Data storage pressed')}
          />
        </SettingSection>

        {/* Support */}
        <SettingSection title="Support">
          <SettingRow
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            onPress={() => console.log('Help pressed')}
          />
          <SettingRow
            icon={MessageCircle}
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => console.log('Contact support pressed')}
          />
        </SettingSection>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>VoiceFlow Messenger v1.0.0</Text>
          <Text style={styles.appBuild}>Build 2024.1.15</Text>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 16,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2B',
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D4FF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  settingRowRight: {
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appVersion: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  appBuild: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});