import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Bell, Volume2, MessageCircle, TrendingUp, Award, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const statsData = [
  { label: 'Summaries Heard', value: '247', icon: Volume2, color: '#00D4FF' },
  { label: 'Messages Processed', value: '1.2K', icon: MessageCircle, color: '#8B5CF6' },
  { label: 'Time Saved', value: '12h', icon: TrendingUp, color: '#10B981' },
  { label: 'Streak Days', value: '28', icon: Award, color: '#F59E0B' },
];

const recentActivity = [
  { action: 'Listened to Family Group summary', time: '2 hours ago' },
  { action: 'Connected Signal account', time: '1 day ago' },
  { action: 'Updated voice preferences', time: '3 days ago' },
  { action: 'Completed onboarding', time: '1 week ago' },
];

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#0A0A0B', '#1A1A1B']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['#00D4FF', '#8B5CF6']}
            style={styles.avatarGradient}
          >
            <User size={48} color="#FFFFFF" strokeWidth={2} />
          </LinearGradient>
          
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@email.com</Text>
          
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>✨ Premium Member</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your VoiceFlow Stats</Text>
          <View style={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <stat.icon size={20} color={stat.color} strokeWidth={2} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Voice Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Preferences</Text>
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceLabel}>Voice Personality</Text>
                <Text style={styles.preferenceValue}>Casual Casey</Text>
              </View>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                <Text style={styles.editButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.preferenceRow}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceLabel}>Summary Length</Text>
                <Text style={styles.preferenceValue}>Detailed (1-2 min)</Text>
              </View>
              <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                <Text style={styles.editButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Connected Accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          <View style={styles.accountsContainer}>
            <View style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <View style={[styles.accountIcon, { backgroundColor: '#25D36620' }]}>
                  <MessageCircle size={20} color="#25D366" strokeWidth={2} />
                </View>
                <View>
                  <Text style={styles.accountName}>WhatsApp</Text>
                  <Text style={styles.accountStatus}>Connected</Text>
                </View>
              </View>
              <View style={styles.connectedIndicator} />
            </View>
            
            <View style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <View style={[styles.accountIcon, { backgroundColor: '#3A76F020' }]}>
                  <MessageCircle size={20} color="#3A76F0" strokeWidth={2} />
                </View>
                <View>
                  <Text style={styles.accountName}>Signal</Text>
                  <Text style={styles.accountStatus}>Connected</Text>
                </View>
              </View>
              <View style={styles.connectedIndicator} />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Bell size={20} color="#00D4FF" strokeWidth={2} />
              <Text style={styles.actionText}>Notification Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Volume2 size={20} color="#8B5CF6" strokeWidth={2} />
              <Text style={styles.actionText}>Voice Samples</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <MessageCircle size={20} color="#10B981" strokeWidth={2} />
              <Text style={styles.actionText}>Add New Account</Text>
            </TouchableOpacity>
          </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  membershipBadge: {
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  membershipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#F59E0B',
  },
  statsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  preferenceCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  preferenceValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  editButton: {
    backgroundColor: '#00D4FF20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#00D4FF',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2B',
    marginVertical: 12,
  },
  accountsContainer: {
    gap: 12,
  },
  accountCard: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  accountStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#10B981',
  },
  connectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  activityContainer: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4FF',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#1F1F20',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2B',
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
});