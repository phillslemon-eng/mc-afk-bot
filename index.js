const bedrock = require('bedrock-protocol');

let client = null; // Prevent double connections

function connectBot() {
  if (client) return; // Avoid multiple connections

  console.log('Attempting to connect to Bedrock server...');

  client = bedrock.createClient({
    host: 'VortexLifestealSMP.enderman.cloud',
    port: 29897,
    username: 'AFKBot24',
    version: '1.21.120',
    offline: true,
    skipPing: true // Fix "Ping timed out" faster
  });

  client.on('start_game', () => {
    console.log('Bot JOINED! Server is now 24/7');
    
    // Send chat
    client.write('text', {
      type: 'chat',
      message: 'AFK Bot online - keeping server alive!',
      source_name: 'AFKBot24',
      needs_translation: false,
      xuid: '',
      platform_chat_id: ''
    });

    // AFK Jump every 4 mins
    setInterval(() => {
      if (client && client.runtimeEntityId) {
        client.write('move_player', {
          runtime_entity_id: client.runtimeEntityId,
          position: {
            x: client.position.x,
            y: client.position.y + 0.1,
            z: client.position.z
          },
          pitch: 0,
          yaw: 0,
          head_yaw: 0,
          mode: 'normal',
          on_ground: false,
          ridden_runtime_entity_id: 0,
          teleport: { teleport: false }
        });
        console.log('AFK Jump');
      }
    }, 240000); // 4 minutes
  });

  client.on('error', (err) => {
    console.log('Connection error:', err.message);
    cleanupAndReconnect();
  });

  client.on('close', () => {
    console.log('Connection closed. Reconnecting in 10s...');
    cleanupAndReconnect();
  });
}

function cleanupAndReconnect() {
  if (client) {
    client.removeAllListeners();
    client = null;
  }
  setTimeout(connectBot, 10000); // Retry after 10s
}

// Start the bot
connectBot();
