const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('AFK Bot ALIVE 24/7'));
app.listen(3000, () => console.log('Ping server on'));

let client = null;

function connect() {
  if (client) return;

  console.log('Connecting...');

  client = bedrock.createClient({
    host: 'VortexLifestealSMP.enderman.cloud',
    port: 29897,
    username: 'AFKBot24',
    version: '1.21.120',
    offline: true,
    skipPing: true
  });

  // IGNORE ALL PACKETS THAT CRASH
  client.on('packet', (packet) => {
    if (packet.data?.name === 'script_message' || packet.data?.name === 'command_request') {
      console.log('IGNORED CRASH PACKET:', packet.data.name);
      return; // BLOCK IT
    }
  });

  client.on('spawn', () => {
    console.log('Bot SPAWNED! 24/7 ON');
    client.write('text', {
      type: 'chat',
      message: 'AFK Bot online!',
      source_name: 'AFKBot24',
      needs_translation: false,
      xuid: '',
      platform_chat_id: ''
    });
  });

  client.on('error', () => cleanup());
  client.on('close', () => cleanup());
}

function cleanup() {
  if (client) {
    client.removeAllListeners();
    client = null;
  }
  setTimeout(connect, 8000); // 8 sec reconnect
}

connect();
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
