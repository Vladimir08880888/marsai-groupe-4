import Video from "../models/Video.js";
import User from "../models/User.js";

// Get Overview Stats
async function getStats(req, res) {
  try {
    const videos = await Video.findAll();
    const users = await User.findAll();

    const stats = {
      totalVideos: videos.length,
      totalUsers: users.length,
      recentVideos: videos.slice(0, 5),
      recentUsers: users.slice(0, 5),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}

export default { getStats };
