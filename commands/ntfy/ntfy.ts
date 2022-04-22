import { Command, CommandContext } from '../../deps.ts';
import type { Args } from '../../deps.ts'
import { config } from '../../config.ts';

export default class NtfyCommand extends Command {
	name = 'ntfy';
	aliases = ['notify'];
	category = 'ntfy';
	args: Args[] = [
		{
			name: 'message',
			match: 'rest',
		},
	];
	async execute(ctx: CommandContext) {
		const message = ctx.args!.message as string;
		
		if (!message) {
			return ctx.message.reply('Please provide a message.');
		}

		const headers = new Headers({
			accept: "application/json",
		});

		headers.append('Title', `${ctx.message.author.username}#${ctx.message.author.discriminator} (Discord)`);
		headers.append('Tags', `left_speech_bubble`);

		await fetch(`https://${config.ntfyServer}/ntfy-bot`, {
			method: 'POST',
			body: `${message}`,
			headers: headers,
		});

		ctx.channel.send(`Message: \`${message}\` sent!`);
	}
}