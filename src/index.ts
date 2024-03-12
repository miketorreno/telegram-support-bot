import { Context, Config } from './interfaces';
import cache from './cache';
import { InputFile } from "grammy";
import { Menu } from "@grammyjs/menu";
import * as db from './db';

import * as middleware from './middleware';
import * as commands from './commands';
import * as permissions from './permissions';
import * as inline from './inline';
import * as text from './text';
import * as files from './files';
import * as error from './error';

import * as webserver from './addons/web';
import * as signal from './addons/signal';
import TelegramAddon from './addons/telegram';

let defaultBot: TelegramAddon;

/**
 * Create Bot
 * @return {Bot}
 */
function createBot() {
  if (cache.config != null && cache.config.bot_token != null) {
    if (cache.config.bot_token == 'YOUR_BOT_TOKEN') {
      console.error('Please change your bot token in config/config.yaml');
      process.exit(1);
    }
    defaultBot = new TelegramAddon(cache.config.bot_token);
  }
  cache.config.autoreply_confirmation = cache.config.autoreply_confirmation === undefined ? true : cache.config.autoreply_confirmation
  cache.config.language.confirmationMessage = cache.config.language.confirmationMessage || cache.config.language.contactMessage // left for backward compatibility
  cache.config.clean_replies = cache.config.clean_replies === undefined ? false : cache.config.clean_replies // left for backward compatibility
  cache.config.pass_start = cache.config.pass_start === undefined ? false : cache.config.pass_start // left for backward compatibility


  return defaultBot;
}

/**
 * Main function
 * @param {TelegramAddon} bot
 * @param {boolean} logs
 */
function main(bot: TelegramAddon = defaultBot, logs = true) {
  cache.bot = defaultBot;
  bot.sendMessage(cache.config.staffchat_id, 'Bot started');
  // Check addon
  if (cache.config.signal_enabled) {
    signal.init(function (ctx: Context, msg: any[]) {
      console.log(msg);
      text.handleText(bot, ctx, msg);
    });
  }

  // Start webserver
  if (cache.config.web_server) {
    webserver.init(bot);
  }
  // Init error handling
  error.init(logs);

  // Use session and check for permissions on message
  bot.use(bot.initSession());

  bot.use((ctx: Context, next: () => any) => {
    // Check dev mode
    if (cache.config.dev_mode) {
      middleware.reply(
        ctx,
        `_Dev mode is on: You might notice 
      some delay in messages, no replies or other errors._`,
        { parse_mode: cache.config.parse_mode },
      );
    }
    permissions.checkPermissions(ctx, next, cache.config);
  });

  // Init category keys
  const keys = inline.initInline(bot);

  // Menu
  const mainMenu = new Menu("main-menu")
    .text("Issues", (ctx) => ctx.reply('Please write us your issue'))
    .submenu("Games", "games-menu").row()
    .text("About Us", (ctx) => ctx.reply(`Company \n\n \t Sit ea proident laborum nisi nostrud exercitation reprehenderit eu. Anim nostrud duis est laborum eiusmod tempor eiusmod dolor excepteur ad laboris nostrud ipsum. Irure pariatur dolor est nulla sint est. Sit ea proident laborum nisi nostrud exercitation reprehenderit eu. Anim nostrud duis est laborum eiusmod tempor eiusmod dolor excepteur ad laboris nostrud ipsum. Irure pariatur dolor est nulla sint est.  \n \t Sit ea proident laborum nisi nostrud exercitation reprehenderit eu. Anim nostrud duis est laborum eiusmod tempor eiusmod dolor excepteur ad laboris nostrud ipsum. Irure pariatur dolor est nulla sint est.`))
    .text("Contacts", (ctx) => ctx.reply(`Contacts \n
    Support
    +2519123456789
    +2519123456789
    +2519123456789
  
    Finance
    +2519123456789`)).row();
  
  // const issues = new Menu("issues-menu")
  //   .text("Keno", (ctx) => ctx.reply('Please write us your issue'))
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");


  // const issues = new Menu("issues-menu")
  //   .text("Testing issue", (ctx) => {
  //     // console.log(ctx.update.callback_query.message.from)
  //     // console.log(ctx.update.callback_query.message.from.id)
  //     db.getOpen(
  //         ctx.update.callback_query.message.from.id,
  //         null,
  //         function(ticket: any) {
  //           if (ticket == undefined) {
  //             db.add(ctx.update.callback_query.message.from.id, 'open', null);
  //           }
  //         },
  //     );
  //     // text.handleText(bot, ctx, keys)
  //   }).row()
  //   .text("Printer issue", (ctx) => ctx.reply("Please send us TeamViewer access")).row()
  //   // .text("Printer issue", (ctx) => text.handleText(bot, ctx, keys)).row()
  //   .submenu("Password issue", "").row()
  //   .submenu("Display issue", "").row()
  //   .submenu("Timer issue", "").row()
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");

  // const games = new Menu("games-menu")
  //   .submenu("Kiron", "kiron-menu").row()
  //   .submenu("Alpha", "alpha-menu").row()
  //   .submenu("Mohio", "mohio-menu").row()
  //   .submenu("Emerald", "emerald-menu").row()
  //   .submenu("Goldenrace", "goldenrace-menu").row()
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");

  const kiron = new Menu("kiron-menu")
  //   // .text("Keno", async (ctx) => await ctx.replyWithPhoto("https://placehold.co/600x400.png"))
  //   // .text("Spin", async (ctx) => await ctx.replyWithPhoto("https://grammy.dev/images/grammY.png"))
  //   .text("Keno", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/keno-Carousel-3.jpg"))
  //   .text("Spin", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/spin-and-win-1.jpg")).row()
  //   .text("Horse Racing", async (ctx) => await ctx.replyWithPhoto(new InputFile("https://kironinteractive.com/wp-content/uploads/2022/01/Lotto-Horses-6.jpg"))).row()
  //   .text("Dog Racing", async (ctx) => await ctx.replyWithPhoto(new InputFile("https://kironinteractive.com/wp-content/uploads/2022/01/Dog-Racing-1.jpg")))
  //   .text("Car Racing", async (ctx) => await ctx.replyWithPhoto(new InputFile("https://kironinteractive.com/wp-content/uploads/2022/01/Game-Carousel-5.jpg")))
    .back("Back")
    .submenu("Main Menu", "main-menu");

  const games = new Menu("games-menu")
    .text("Keno", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/keno-Carousel-3.jpg"))
    .text("Spin", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/spin-and-win-1.jpg")).row()
    .text("Horse Racing", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/Lotto-Horses-6.jpg"))
    .text("Dog Racing", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/Dog-Racing-1.jpg"))
    .text("Car Racing", async (ctx) => await ctx.replyWithPhoto("https://kironinteractive.com/wp-content/uploads/2022/01/Game-Carousel-5.jpg")).row()
    .back("Back")
    .submenu("Main Menu", "main-menu");
  
  // const testing = new Menu("testing-menu")
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");
    
  // const alpha = new Menu("alpha-menu")
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");
  
  // const mohio = new Menu("mohio-menu")
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");
  
  // const emerald = new Menu("emerald-menu")
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");
  
  // const goldenrace = new Menu("goldenrace-menu")
  //   .back("Back")
  //   .submenu("Main Menu", "main-menu");


  // mainMenu.register([issues, games]);
  // games.register([kiron, alpha, mohio, emerald, goldenrace, testing]);
  mainMenu.register([games]);
  bot.use(mainMenu);


  // Set bots username
  // bot..getMe().then((botInfo) => bot.options.username = botInfo.username);

  // Bot commands
  bot.command('open', (ctx: Context) => commands.openCommand(ctx));
  bot.command('close', (ctx: Context) => commands.closeCommand(ctx));
  bot.command('ban', (ctx: Context) => commands.banCommand(ctx));
  bot.command('reopen', (ctx: Context) => commands.reopenCommand(ctx));
  bot.command('unban', (ctx: Context) => commands.unbanCommand(ctx));
  bot.command('clear', (ctx: Context) => commands.clearCommand(ctx));
  bot.command('id', (ctx: Context) =>
    middleware.reply(ctx, `User ID: ${ctx.from.id}\nGroup ID: ${ctx.chat.id}`, {
      parse_mode: cache.config.parse_mode,
    }),
  );
  bot.command('faq', (ctx: Context) =>
    middleware.reply(ctx, cache.config.language.faqCommandText, {
      parse_mode: cache.config.parse_mode,
    }),
  );
  bot.command('help', (ctx: Context) => commands.helpCommand(ctx));
  bot.command('links', (ctx: Context) => {
    let links = '';
    const subcategories = [];
    for (const i in cache.config.categories) {
      if (i !== undefined) {
        for (const j in cache.config.categories[i].subgroups) {
          if (j !== undefined) {
            const catName = cache.config.categories[i].subgroups[j].name;
            const id = (
              cache.config.categories[i].name +
              cache.config.categories[i].subgroups[j].name
            )
              .replace(/[\[\]\:\ "]/g, '')
              .substring(0, 63);
            if (subcategories.indexOf(id) == -1) {
              subcategories.push(id);
              if (bot.botInfo != null) {
                links += `${catName} - https://t.me/${bot.botInfo.username}?start=${id}\n`;
              }
            }
          }
        }
      }
    }
    middleware.reply(ctx, `${cache.config.language.links}:\n${links}`, {
      parse_mode: cache.config.parse_mode,
    });
  });

  if (cache.config.pass_start == false) {
    bot.command('start', async (ctx: Context) => {
      if (ctx.chat.type == 'private') {
        await ctx.reply("Hello there 👋 \nWelcome to our support bot! How can we help you?", { reply_markup: mainMenu });

        // middleware.reply(ctx, cache.config.language.startCommandText);
        if (cache.config.categories && cache.config.categories.length > 0) {
          setTimeout(
            () =>
              middleware.reply(
                ctx,
                cache.config.language.services,
                inline.replyKeyboard(keys),
              ),
            500,
          );
        }
      } else middleware.reply(ctx, cache.config.language.prvChatOnly);
    });
  }

  // Bot ons
  bot.on('callback_query', (ctx: Context) => inline.callbackQuery(ctx));
  bot.on([':photo'], (ctx: Context) => files.fileHandler('photo', bot, ctx));
  bot.on([':video'], (ctx: Context) => files.fileHandler('video', bot, ctx));
  bot.on([':document'], (ctx: Context) =>
    files.fileHandler('document', bot, ctx),
  );

  // Bot regex
  bot.hears(cache.config.language.back, (ctx: Context) =>
    middleware.reply(
      ctx,
      cache.config.language.services,
      inline.replyKeyboard(keys),
    ),
  );
  bot.hears('testing', (ctx: Context) => text.handleText(bot, ctx, keys));
  bot.hears(/(.+)/, (ctx: Context) => {
    text.handleText(bot, ctx, keys);
  });

  // Catch bot errors
  bot.catch((err: any, ctx: Context) => {
    console.log('Error: ', err);
    // Catch bot blocked by user
    try {
      middleware.reply(ctx, 'Message is not sent due to an error.');
    } catch (e) {
      console.log('Could not send error msg to chat: ', e);
    }
  });

  if (logs) {
    bot.start();
  }
}

createBot();
main();

export { createBot, main };
