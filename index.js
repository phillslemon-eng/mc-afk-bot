const bedrock = require('bedrock-protocol');

let client = null;

function connectBot() {
  if (client) return;

  console.log('Connecting to Bedrock server...');

  client = bedrock.createClient({
    host: 'VortexLifestealSMP.enderman.cloud',
    port: 29897,
    username: 'AFKBot24',
    version: '1.21.120',
    offline: true,
    skipPing: true
  });

  client.on('spawn', () => {  // ← WAIT FOR FULL SPAWN
    console.log('Bot SPAWNED! Position ready. Server 24/7');

    client.write('text', {
      type: 'chat',
      message: 'AFK Bot online - server stays alive!',
      source_name: 'AFKBot24',
      needs_translation: false,
      xuid: '',
      platform_chat_id: ''
    });

    // AFK Jump every 4 mins — ONLY AFTER SPAWN
    setInterval(() => {
      if (client?.runtimeEntityId && client?.position) {
        const pos = client.position;
        client.write('move_player', {
          runtime_entity_id: client.runtimeEntityId,
          position: { x: pos.x, y: pos.y + 0.1, z: pos.z },
          pitch: 0, yaw: 0, head_yaw: 0,
          mode: 'normal',
          on_ground: false,
          ridden_runtime_entity_id: 0,
          teleport: { teleport: false }
        });
        console.log('AFK Jump');
      }
    }, 240000);
  });

  client.on('error', (err) => {
    console.log('Error:', err.message);
    cleanupAndReconnect();
  });

  client.on('close', () => {
    console.log('Disconnected. Reconnecting...');
    cleanupAndReconnect();
  });
}

function cleanupAndReconnect() {
  if (client) {
    client.removeAllListeners();
    client = null;
  }
  setTimeout(connectBot, 10000);
}

connectBot();          position: {
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
