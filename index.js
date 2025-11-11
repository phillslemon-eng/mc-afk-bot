const { createBot } = require('mineflayer-bedrock');
const http = require('http');

http.createServer((req, res) => res.end('AFK BOT ALIVE')).listen(3000);

let bot;

function startBot() {
  if (bot) return;

  console.log('Starting bot...');

  bot = createBot({
    host: 'VortexLifesteal-OXwN.aternos.me',
    port: 951444,
    username: 'AFKBot24',
    version: '1.21.120'
  });

  bot.once('spawn', () => {
    console.log('BOT SPAWNED - 24/7 LOCKED');
    bot.chat('AFK Bot online - server never dies');

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
      console.log('AFK Jump');
    }, 240000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
    cleanup();
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...');
    cleanup();
  });
}

function cleanup() {
  if (bot) {
    bot.removeAllListeners();
    bot = null;
  }
  setTimeout(startBot, 5000);
}

startBot();
  client.on('error', () => cleanup());
  client.on('close', () => cleanup());
}

function cleanup() {
  if (client) {
    client.removeAllListeners();
    client = null;
  }
  setTimeout(connect, 5000); // 5 sec reconnect
}

connect();      source_name: 'AFKBot24',
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
