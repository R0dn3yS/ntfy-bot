import { Command, CommandContext } from '../../deps.ts';
import type { Args, User } from '../../deps.ts'
import { config } from '../../config.ts';

export default class MsgCommand extends Command {
	name = 'msg';
	aliases = ['message'];
	category = 'ntfy';
	args: Args[] = [
		{
			name: 'user',
			match: 'user',
		},
		{
			name: 'message',
			match: 'rest',
		},
	];
	async execute(ctx: CommandContext) {
		const message = ctx.args!.message as string;
		const user = ctx.args!.message as User;
		
		if (!user.id) {
			return ctx.message.reply('No user specified.');
		} else if (!message) {
			return ctx.message.reply('Please provide a message.');
		}

		const headers = new Headers({
			accept: "application/json",
		});

		headers.append('Title', 'Discord Notification');

		await fetch(`https://${config.ntfyServer}/${!user.id}`, {
			method: 'POST',
			body: `${message}`,
			headers: headers,
		});

		ctx.channel.send(`Message: \`${message}\` sent!`);
	}
}