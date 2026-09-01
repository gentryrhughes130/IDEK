import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

const stats = [
  { label: 'Projects', value: '24', accent: '#7C3AED' },
  { label: 'Followers', value: '8.4K', accent: '#0EA5E9' },
  { label: 'Rating', value: '4.9', accent: '#F59E0B' },
];

const quickActions = [
  { label: 'Edit', icon: '✎', color: '#7C3AED' },
  { label: 'Share', icon: '↗', color: '#0EA5E9' },
  { label: 'Insights', icon: '◎', color: '#10B981' },
];

const activities = [
  { title: 'New campaign launched', detail: 'Social strategy • 2h ago', chip: 'Growth' },
  { title: 'Team checkpoint complete', detail: 'Goals synced • Yesterday', chip: 'Done' },
  { title: 'Design review received', detail: 'Feedback shared • 3 days ago', chip: 'Review' },
];

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrap}>
          <View style={styles.headerRow}>
            <Text style={styles.eyebrow}>Profile</Text>
            <Pressable style={styles.iconButton} accessibilityLabel="Notifications">
              <Text style={styles.iconButtonText}>🔔</Text>
            </Pressable>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatarRing}>
              <Text style={styles.avatarText}>AJ</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>Ariana James</Text>
              <Text style={styles.role}>Product Designer</Text>
              <Text style={styles.location}>San Francisco, CA</Text>
            </View>

            <Pressable style={styles.followButton} accessibilityLabel="Follow Ariana James">
              <Text style={styles.followButtonText}>Following</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <View style={[styles.statDot, { backgroundColor: item.accent }]} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}> 
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>

        <View style={styles.actionsRow}>
          {quickActions.map((action) => (
            <Pressable key={action.label} style={[styles.actionButton, { backgroundColor: action.color }]}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <Text style={styles.caption}>This month</Text>
          </View>

          <View style={styles.chartWrap}>
            <View style={styles.chartColumnGroup}>
              <View style={[styles.chartColumn, { height: '42%' }]} />
              <View style={[styles.chartColumn, { height: '64%' }]} />
              <View style={[styles.chartColumn, { height: '58%' }]} />
              <View style={[styles.chartColumn, { height: '80%' }]} />
              <View style={[styles.chartColumn, { height: '68%' }]} />
              <View style={[styles.chartColumn, { height: '92%' }]} />
            </View>
            <View style={styles.chartLabels}>
              <Text style={styles.chartLabel}>Jan</Text>
              <Text style={styles.chartLabel}>Feb</Text>
              <Text style={styles.chartLabel}>Mar</Text>
              <Text style={styles.chartLabel}>Apr</Text>
              <Text style={styles.chartLabel}>May</Text>
              <Text style={styles.chartLabel}>Jun</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.sectionTitle}>Recent activity</Text>
            <Text style={styles.sectionLink}>All</Text>
          </View>

          {activities.map((activity) => (
            <View key={activity.title} style={styles.activityRow}>
              <View style={styles.activityBadge} />
              <View style={styles.activityTextWrap}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDetail}>{activity.detail}</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{activity.chip}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 36,
  },
  headerWrap: {
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  eyebrow: {
    color: '#cbd5e1',
    fontSize: 15,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(148, 163, 184, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  iconButtonText: {
    fontSize: 18,
  },
  profileCard: {
    backgroundColor: '#111827',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    shadowColor: '#000',
    shadowOpacity: 0.24,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#7C3AED',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  profileInfo: {
    marginBottom: 18,
  },
  name: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  role: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '600',
  },
  location: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 8,
  },
  followButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 14,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#7dd3fc',
    fontSize: 13,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#020617',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  actionLabel: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  panel: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  caption: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  chartWrap: {
    paddingTop: 8,
  },
  chartColumnGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  chartColumn: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#7C3AED',
    opacity: 0.96,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  chartLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.12)',
  },
  activityBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0EA5E9',
    marginRight: 12,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  activityDetail: {
    color: '#94a3b8',
    fontSize: 12,
  },
  chip: {
    backgroundColor: 'rgba(59, 130, 246, 0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 10,
  },
  chipText: {
    color: '#bfdbfe',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
