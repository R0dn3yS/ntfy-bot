import { CommandClient, Intents } from './deps.ts';
import { config } from './config.ts';

const client = new CommandClient({
	prefix: '%',
	owners: config.owners,
});

client.once('ready', async () => {
	console.log(`${client.user?.username} is ready!`);
	client.setPresence({
		name: 'notifications',
		type: 'LISTENING',
	});

	const headers = new Headers({
		accept: "application/json",
	});

	headers.append('Title', 'Bot Status');
	headers.append('Tags', `gear`);
	headers.append('Priority', 'low');

	await fetch(`https://${config.ntfyServer}/ntfy-bot`, {
			method: 'POST',
			body: `ntfy-bot is back online!`,
			headers: headers,
		});
});

client.commands.loader.loadDirectory('./commands', { maxDepth: 2 });

client.connect(config.token, Intents.All);