import Statistics from '../models/Statistics';

export const getStatistics = async () => {
  try {
    const stats = await Statistics.findOne().sort({ lastUpdated: -1 });
    return stats || {
      totalUsers: 0,
      activeCourses: 0,
      totalRevenue: 0,
      pendingTasks: 0,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

export const updateStatistics = async (updates) => {
  try {
    const stats = await Statistics.findOne().sort({ lastUpdated: -1 });
    if (stats) {
      Object.assign(stats, updates);
      stats.lastUpdated = new Date();
      await stats.save();
    } else {
      await Statistics.create({
        ...updates,
        lastUpdated: new Date(),
      });
    }
    return await getStatistics();
  } catch (error) {
    console.error('Error updating statistics:', error);
    throw new Error('Failed to update statistics');
  }
};

export const incrementStatistics = async (field, amount = 1) => {
  try {
    const stats = await Statistics.findOne().sort({ lastUpdated: -1 });
    if (stats) {
      stats[field] += amount;
      stats.lastUpdated = new Date();
      await stats.save();
    } else {
      await Statistics.create({
        [field]: amount,
        lastUpdated: new Date(),
      });
    }
    return await getStatistics();
  } catch (error) {
    console.error('Error incrementing statistics:', error);
    throw new Error('Failed to increment statistics');
  }
}; 