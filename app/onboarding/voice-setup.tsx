import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Play, Pause, Volume2 } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const voiceOptions = [
  {
    id: 'casual',
    name: 'Casual Casey',
    description: 'Friendly and relaxed, like chatting with a close friend',
    personality: 'casual',
    sample: 'Hey! You have 3 new messages from your group chat...',
  },
  {
    id: 'professional',
    name: 'Professional Pat',
    description: 'Clear and concise, perfect for work-related summaries',
    personality: 'professional',
    sample: 'You have received 3 new messages requiring your attention...',
  },
  {
    id: 'witty',
    name: 'Witty Wilson',
    description: 'Clever and entertaining, adds humor to your updates',
    personality: 'witty',
    sample: 'Your phone just became the most popular kid in school with 3 new messages...',
  },
];

const summaryLengths = [
  { id: 'quick', name: 'Quick', description: '30 seconds or less', time: '< 30s' },
  { id: 'detailed', name: 'Detailed', description: '1-2 minutes comprehensive', time: '1-2m' },
  { id: 'full', name: 'Full', description: 'Complete context and details', time: '2-5m' },
];

export default function VoiceSetup() {
  const [selectedVoice, setSelectedVoice] = useState('casual');
  const [selectedLength, setSelectedLength] = useState('detailed');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handlePlaySample = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate playing for 3 seconds
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Volume2 size={48} color="#00D4FF" strokeWidth={2} />
          <Text style={styles.title}>Customize Your</Text>
          <Text style={styles.titleAccent}>Voice Experience</Text>
          <Text style={styles.description}>
            Choose how you want to hear your message summaries
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Personality</Text>
          <View style={styles.optionsContainer}>
            {voiceOptions.map((voice) => (
              <TouchableOpacity
                key={voice.id}
                style={[
                  styles.voiceCard,
                  selectedVoice === voice.id && styles.selectedCard
                ]}
                onPress={() => setSelectedVoice(voice.id)}
                activeOpacity={0.8}
              >
                <View style={styles.voiceHeader}>
                  <View style={styles.voiceInfo}>
                    <Text style={styles.voiceName}>{voice.name}</Text>
                    <Text style={styles.voiceDescription}>{voice.description}</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => handlePlaySample(voice.id)}
                    activeOpacity={0.7}
                  >
                    {playingVoice === voice.id ? (
                      <Pause size={16} color="#00D4FF" strokeWidth={2} />
                    ) : (
                      <Play size={16} color="#00D4FF" strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
                
                <View style={styles.sampleContainer}>
                  <Text style={styles.sampleText}>"{voice.sample}"</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary Length</Text>
          <View style={styles.lengthContainer}>
            {summaryLengths.map((length) => (
              <TouchableOpacity
                key={length.id}
                style={[
                  styles.lengthCard,
                  selectedLength === length.id && styles.selectedLengthCard
                ]}
                onPress={() => setSelectedLength(length.id)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.lengthName,
                  selectedLength === length.id && styles.selectedLengthText
                ]}>
                  {length.name}
                </Text>
                <Text style={styles.lengthTime}>{length.time}</Text>
                <Text style={styles.lengthDescription}>{length.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/onboarding/permissions')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#00D4FF', '#0EA5E9']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Save Preferences</Text>
            </LinearGradient>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  voiceCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  selectedCard: {
    borderColor: '#00D4FF',
    backgroundColor: '#00D4FF10',
  },
  voiceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  voiceInfo: {
    flex: 1,
  },
  voiceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  voiceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00D4FF20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sampleContainer: {
    backgroundColor: '#0A0A0B',
    borderRadius: 8,
    padding: 12,
  },
  sampleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D1D5DB',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  lengthContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  lengthCard: {
    flex: 1,
    backgroundColor: '#1F1F20',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  selectedLengthCard: {
    borderColor: '#00D4FF',
    backgroundColor: '#00D4FF10',
  },
  lengthName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  selectedLengthText: {
    color: '#00D4FF',
  },
  lengthTime: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#00D4FF',
    marginBottom: 8,
  },
  lengthDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  continueButton: {
    width: width - 48,
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
});