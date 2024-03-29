import { Command, CommandContext } from '../../deps.ts';
import type { Args, User } from '../../deps.ts'
import { config } from '../../config.ts';

export default class PriomsgCommand extends Command {
	name = 'priomsg';
	category = 'ntfy';
  description = 'Send high priority message';
  usage = ' [user] [message]';
	ownerOnly = true;
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
		const user = ctx.args!.user as User;
		
		if (!user.id) {
			return ctx.message.reply('No user specified.');
		} else if (!message) {
			return ctx.message.reply('Please provide a message.');
		}

		const headers = new Headers({
			accept: "application/json",
		});

		headers.append('Title', `${ctx.message.author.username}#${ctx.message.author.discriminator} (Discord)`);
		headers.append('Tags', `left_speech_bubble`);
		headers.append('Priority', 'urgent');

		await fetch(`https://${config.ntfyServer}/${user.id}`, {
			method: 'POST',
			body: `${message}`,
			headers: headers,
		});

		ctx.channel.send(`Message: \`${message}\` sent!`);
	}
}