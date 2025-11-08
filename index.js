const bedrock = require('bedrock-protocol');

const client = bedrock.createClient({
  host: 'VortexLifestealSMP.enderman.cloud',
  port: 29897,
  username: 'AFKBot24',
  version: '1.21.120'  // Your exact version
});

client.on('start_game', () => {
  console.log('✅ Bot joined pure Bedrock server! 24/7 alive!');
  
  // Send chat (AFK proof)
  client.write('text', {
    type: 'chat',
    needs_translation: false,
    source_name: 'AFKBot24',
    message: 'AFK Bot online - server stays up!',
    platform_chat_id: '',
    xuid: ''
  });

  // AFK: Random move/jump every 4 mins (Bedrock idle timeout)
  setInterval(() => {
    const rand = Math.random();
    if (rand < 0.3) {
      client.write('move_player', {
        runtime_entity_id: client.runtimeEntityId,
        position: client.position.offset(0, 0, 0.1),  // Tiny jump
        pitch: 0,
        yaw: 0,
        head_yaw: 0,
        mode: 'normal',
        on_ground: false,
        ridden_runtime_entity_id: 0,
        teleport: { teleport: false }
      });
      console.log('🔄 AFK Jump');
    } else if (rand < 0.6) {
      client.write('move_player', {
        runtime_entity_id: client.runtimeEntityId,
        position: client.position.offset(0.1 * (Math.random() - 0.5), 0, 0),  // Tiny walk
        pitch: 0,
        yaw: 0,
        head_yaw: 0,
        mode: 'normal',
        on_ground: true,
        ridden_runtime_entity_id: 0,
        teleport: { teleport: false }
      });
      console.log('🔄 AFK Walk');
    }
  }, 240000);  // 4 mins
});

client.on('disconnect', () => {
  console.log('Disconnected. Reconnecting in 5s...');
  setTimeout(() => client.connect(), 5000);
});

client.on('error', (err) => console.log('Error:', err.message));
