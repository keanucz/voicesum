import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, MessageCircle, Clock, Users } from 'lucide-react-native';
import { useState } from 'react';

const conversationData = [
  {
    id: '1',
    name: 'Family Group',
    lastMessage: 'Mom: Don\'t forget dinner at 7!',
    timestamp: '2m ago',
    unreadCount: 3,
    participants: 4,
    platform: 'WhatsApp',
    avatar: '👨‍👩‍👧‍👦',
  },
  {
    id: '2',
    name: 'Work Team',
    lastMessage: 'Alex: Project update ready for review',
    timestamp: '15m ago',
    unreadCount: 7,
    participants: 8,
    platform: 'Signal',
    avatar: '💼',
  },
  {
    id: '3',
    name: 'Emma Richardson',
    lastMessage: 'You: See you tomorrow!',
    timestamp: '1h ago',
    unreadCount: 0,
    participants: 2,
    platform: 'WhatsApp',
    avatar: '👩',
  },
  {
    id: '4',
    name: 'Weekend Squad',
    lastMessage: 'Mike: Beach volleyball at 3?',
    timestamp: '3h ago',
    unreadCount: 2,
    participants: 6,
    platform: 'WhatsApp',
    avatar: '🏐',
  },
];

const platformColors = {
  WhatsApp: '#25D366',
  Signal: '#3A76F0',
  Telegram: '#0088CC',
};

export default function ConversationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredConversations = conversationData.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Conversations</Text>
        <Text style={styles.headerSubtitle}>All your chats in one place</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <Filter size={20} color="#00D4FF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {['all', 'unread', 'family', 'work', 'friends'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.activeFilterChip
            ]}
            onPress={() => setSelectedFilter(filter)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.filterChipText,
              selectedFilter === filter && styles.activeFilterChipText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conversations List */}
      <ScrollView 
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationCard}
            activeOpacity={0.8}
          >
            <View style={styles.conversationContent}>
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{conversation.avatar}</Text>
                <View style={[
                  styles.platformIndicator,
                  { backgroundColor: platformColors[conversation.platform as keyof typeof platformColors] }
                ]} />
              </View>

              {/* Conversation Info */}
              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>
                
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {conversation.lastMessage}
                </Text>
                
                <View style={styles.conversationMeta}>
                  <View style={styles.participantsInfo}>
                    <Users size={12} color="#6B7280" strokeWidth={2} />
                    <Text style={styles.participantsCount}>
                      {conversation.participants} {conversation.participants === 2 ? 'person' : 'people'}
                    </Text>
                  </View>
                  
                  {conversation.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats Footer */}
      <View style={styles.statsFooter}>
        <View style={styles.statItem}>
          <MessageCircle size={16} color="#00D4FF" strokeWidth={2} />
          <Text style={styles.statText}>{conversationData.length} Chats</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#F59E0B" strokeWidth={2} />
          <Text style={styles.statText}>
            {conversationData.reduce((sum, conv) => sum + conv.unreadCount, 0)} Unread
          </Text>
        </View>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1F1F20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#1F1F20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  activeFilterChip: {
    backgroundColor: '#00D4FF20',
    borderColor: '#00D4FF',
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#9CA3AF',
  },
  activeFilterChipText: {
    color: '#00D4FF',
  },
  conversationsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  conversationCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  conversationContent: {
    flexDirection: 'row',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A2A2B',
    textAlign: 'center',
    lineHeight: 48,
    fontSize: 20,
  },
  platformIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1F1F20',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  lastMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  conversationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  statsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#1F1F20',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2B',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
  },
});