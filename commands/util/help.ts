import { Command, CommandContext } from '../../deps.ts';

export default class HelpCommand extends Command {
  name = 'help';
  category = 'util';
  description = 'Return help menu';
  usage = '';
  ownerOnly = false;
  execute(ctx: CommandContext) {
    let helpMessage = 'ntfy commands:\n\n';

    for (const command of ctx.client.commands.list) {
      helpMessage += `${ctx.client.prefix}${command[1].name}${command[1].usage}: ${command[1].description}\n`;
    }

    helpMessage += '\n`Arguments: (optional) [required] {admin only, optional}`'

    ctx.channel.send(helpMessage);
  }
}