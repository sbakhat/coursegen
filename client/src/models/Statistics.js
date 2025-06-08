import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0,
  },
  activeCourses: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  pendingTasks: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

export default Statistics; 