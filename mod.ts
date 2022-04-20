import { CommandClient, Intents } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '%',
	owners: config.owners,
});

client.once('ready', () => {
	console.log(`${client.user?.username} is ready!`);
	client.setPresence({
		name: 'notifications',
		type: 'LISTENING',
	});
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.connect(config.token, Intents.All);