const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

// Keep Render awake
app.get('/', (req, res) => res.send('AFK Bot is ALIVE 24/7'));
app.listen(3000, () => console.log('Ping server on port 3000'));

// Bot logic
let client = null;

function connect() {
  if (client) return;

  console.log('Connecting to Bedrock...');

  client = bedrock.createClient({
    host: 'VortexLifestealSMP.enderman.cloud',
    port: 29897,
    username: 'AFKBot24',
    version: '1.21.120',
    offline: true,
    skipPing: true
  });

  client.on('spawn', () => {
    console.log('Bot SPAWNED! Server 24/7');
    
    client.write('text', {
      type: 'chat',
      message: 'AFK Bot online - server stays alive!',
      source_name: 'AFKBot24',
      needs_translation: false,
      xuid: '',
      platform_chat_id: ''
    });

    setInterval(() => {
      if (client?.position && client?.runtimeEntityId) {
        const pos = client.position;
        client.write('move_player', {
          runtime_entity_id: client.runtimeEntityId,
          position: { x: pos.x, y: pos.y + 0.15, z: pos.z },
          pitch: 0, yaw: 0, head_yaw: 0,
          mode: 'normal',
          on_ground: false,
          ridden_runtime_entity_id: 0,
          teleport: { teleport: false }
        });
        console.log('AFK Jump');
      }
    }, 240000); // 4 mins
  });

  client.on('error', (err) => {
    console.log('Error:', err.message);
    cleanup();
  });

  client.on('close', () => {
    console.log('Disconnected. Reconnecting...');
    cleanup();
  });
}

function cleanup() {
  if (client) {
    client.removeAllListeners();
    client = null;
  }
  setTimeout(connect, 10000);
}

connect();
