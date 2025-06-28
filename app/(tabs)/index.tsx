import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Users, Clock, ChevronRight, Volume2 } from 'lucide-react-native';
import { useState, useCallback } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Mock data for conversation summaries
const mockSummaries = [
  {
    id: '1',
    participants: ['Mom', 'Dad', 'Sarah'],
    title: 'Family Group Chat',
    preview: 'Planning weekend dinner and discussing grocery list...',
    unreadCount: 3,
    urgency: 'medium',
    duration: '2m 15s',
    timestamp: '5 minutes ago',
    avatar: '👨‍👩‍👧',
  },
  {
    id: '2',
    participants: ['Alex', 'Jordan'],
    title: 'Work Project',
    preview: 'Status updates on the quarterly presentation and timeline adjustments...',
    unreadCount: 7,
    urgency: 'high',
    duration: '3m 45s',
    timestamp: '12 minutes ago',
    avatar: '💼',
  },
  {
    id: '3',
    participants: ['Mike', 'Jessica', 'Tom', 'Lisa'],
    title: 'Weekend Plans',
    preview: 'Coordinating Saturday meetup location and time preferences...',
    unreadCount: 2,
    urgency: 'low',
    duration: '1m 30s',
    timestamp: '1 hour ago',
    avatar: '🎉',
  },
  {
    id: '4',
    participants: ['Emma'],
    title: 'Best Friend',
    preview: 'Latest gossip from work and weekend adventure stories...',
    unreadCount: 5,
    urgency: 'medium',
    duration: '4m 12s',
    timestamp: '2 hours ago',
    avatar: '👯‍♀️',
  },
];

const urgencyColors = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [summaries, setSummaries] = useState(mockSummaries);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const SummaryCard = ({ item, index }: { item: any; index: number }) => {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
    }));

    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        translateX.value = event.translationX;
        scale.value = 1 - Math.abs(event.translationX) / width * 0.1;
      })
      .onEnd((event) => {
        const shouldTriggerAction = Math.abs(event.translationX) > width * 0.3;
        
        if (shouldTriggerAction) {
          if (event.translationX > 0) {
            // Swipe right - play voice summary
            runOnJS(() => {
              console.log('Playing voice summary for:', item.title);
            })();
          } else {
            // Swipe left - mark as read
            runOnJS(() => {
              console.log('Marking as read:', item.title);
            })();
          }
        }
        
        translateX.value = withSpring(0);
        scale.value = withSpring(1);
      });

    return (
      <View style={styles.cardContainer}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[animatedStyle]}>
            <LinearGradient
              colors={['#1F1F20', '#2A2A2B']}
              style={styles.summaryCard}
            >
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{item.avatar}</Text>
                </View>
                
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.conversationTitle}>{item.title}</Text>
                  <View style={styles.participantsContainer}>
                    <Users size={12} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.participantsText}>
                      {item.participants.join(', ')}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.urgencyContainer}>
                  <View style={[
                    styles.urgencyIndicator,
                    { backgroundColor: urgencyColors[item.urgency as keyof typeof urgencyColors] }
                  ]} />
                  {item.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
              
              {/* Preview */}
              <Text style={styles.previewText}>{item.preview}</Text>
              
              {/* Footer */}
              <View style={styles.cardFooter}>
                <View style={styles.timeContainer}>
                  <Clock size={12} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.timeText}>{item.timestamp}</Text>
                </View>
                
                <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
                  <Play size={16} color="#00D4FF" strokeWidth={2} />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </TouchableOpacity>
              </View>
              
              {/* Swipe indicators */}
              <View style={styles.swipeIndicators}>
                <View style={styles.leftIndicator}>
                  <Volume2 size={20} color="#00D4FF" strokeWidth={2} />
                  <Text style={styles.indicatorText}>Play</Text>
                </View>
                <View style={styles.rightIndicator}>
                  <Text style={styles.indicatorText}>Mark Read</Text>
                  <ChevronRight size={20} color="#10B981" strokeWidth={2} />
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voice Feed</Text>
        <Text style={styles.headerSubtitle}>Your conversations, summarized</Text>
      </View>
      
      {/* Feed */}
      <ScrollView
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {summaries.map((item, index) => (
          <SummaryCard key={item.id} item={item} index={index} />
        ))}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <LinearGradient
          colors={['#00D4FF', '#0EA5E9']}
          style={styles.fabGradient}
        >
          <Volume2 size={24} color="#FFFFFF" strokeWidth={2} />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
  },
  feed: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cardContainer: {
    marginBottom: 16,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 20,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  conversationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  urgencyContainer: {
    alignItems: 'flex-end',
  },
  urgencyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  previewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00D4FF20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  durationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#00D4FF',
    marginLeft: 6,
  },
  swipeIndicators: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    pointerEvents: 'none',
  },
  leftIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00D4FF20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    opacity: 0.8,
  },
  rightIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98120',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    opacity: 0.8,
  },
  indicatorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginHorizontal: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});