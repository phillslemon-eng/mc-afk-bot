const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'VortexLifestealSMP.enderman.cloud',  // Your server IP ✅
  port: 29897,                               // Your port ✅
  username: 'AFKBot24',                      // Unique bot name
  version: false                             // Auto-detect version (works for FreeMCServer)
});

bot.once('spawn', () => {
  console.log('✅ Bot joined VortexLifestealSMP! Server 24/7 alive!');
  bot.chat('AFK Bot online - server stays up!');
  
  // Light AFK activity every 5 mins (prevents kicks)
  setInterval(() => {
    const actions = ['forward', 'jump', 'back'];
    const action = actions[Math.floor(Math.random() * actions.length)];
    bot.setControlState(action, true);
    setTimeout(() => bot.setControlState(action, false), 1000);
    console.log('🔄 AFK action:', action);
  }, 300000);
});

bot.on('kicked', (reason) => console.log('🚫 Kicked:', reason));
bot.on('error', (err) => console.log('❌ Error:', err.message));
bot.on('end', () => {
  console.log('🔌 Disconnected. Reconnecting in 5s...');
  setTimeout(() => bot.connect(), 5000);
});￼Enter
