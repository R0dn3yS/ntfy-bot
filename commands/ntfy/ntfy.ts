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
		const message = ctx.args!.message;
		
		if (!message) {
			return ctx.message.reply('Please provide a message.');
		}

		await fetch(`https://${config.ntfyServer}/ntfy-bot`, {
			method: 'POST',
			body: `${message}`
		});

		ctx.channel.send(`Message: \`${message}\` sent!`);
	}
}