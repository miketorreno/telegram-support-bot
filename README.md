# <h1 align="center">Welcome to Telegram Support Bot</h1>

Telegram support bot is a support and ticketing system for Telegram.

It lets users create tickets which will be sent to a staff group and can be answered by a reply.

> Now also supports LLMs (e.g. OpenAI) to automatically assist users.

<table>
<tr>
<th><img src="https://" /></th>
<th><img src="https://" /></th>
</tr>
</table>

# Features

When a user sends a message to the support chat it will create a ticket which will be forwarded to the staff group. Any admin in the staff group may answer that ticket by just replying to it. Salutation is added automatically. Photos will be forwarded too.

- [x] File forwarding from and to user
- [x] Database for handling open and closed tickets
- [x] Restrict users
- [x] Simple anti spam system
- [x] Send tickets to different staff groups
- [x] Private reply to user
- [x] Anonymize users
- [x] Auto reply based on keywords [beta]
- [x] Web chat [beta]
- [x] **LLM support (OpenAI, OpenAI-compatible APIs)** – generate automatic responses using large language models
<!-- - [x] **Staff groups can now be on Telegram _or_ Signal** -->

# OpenAI Integration

The bot can now optionally connect to an LLM like OpenAI (or any OpenAI-compatible API) to automatically respond to users, especially for common questions or when no staff is available.

You can enable this by configuring the following in your `config.yaml`:

```yaml
use_llm: true # Will enable show_auto_replied when set to true
llm_api_key: "API_KEY"
llm_base_url: "https://api.openai.com/v1"
llm_model: "gpt-4o-mini"
llm_knowledge: >
  Q: What is support ticketing system?
  A: A support ticketing system is a software tool that turns customer questions or problems into digital records called "tickets". It helps a support team collect, sort, assign, and track requests from first contact until the issue is fixed.

  Q: How does it work?
  A: It gathers messages from email, chat, phone, or web forms into one place. 
    Each request gets a unique ticket number and file.
    The system sends the ticket to the right worker or team.
    It follows the progress of the issue until it is closed.
```

<!-- > Use cases: FAQ generation, fallback replies when no staff replies, 24/7 automated assistant, hybrid staff-AI workflows. -->

# Commands

Currently the support chat offers these commands (staff commands):

- `/open` - lists all open tickets (messages where no one has replied yet)
- `/reopen` - reopen a closed ticket
- `/close` - close a ticket manually (in case someone writes 'thank you')
- `/ban` - ban a person from writing to your chat

User commands:

- `/start` - tells the user how to use this bot
- `/help` - an overview over the commands or some explanation for the user
- `/faq` - shows the FAQ
- `/id` - returns your Telegram or Signal id and the group chat id

# Getting started

1. **Create a bot**

   To use the Telegram Bot API, you first have to get a bot account by chatting with BotFather. Write @botfather the /newbot command to create a bot. Then follow the process and copy the token you get at the end of the process. BotFather will give you a token, something like 123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ.

2. **Create a group**

   Create a new group by opening the sidebar in Telegram then clicking on New Group.

3. **Add the bot**

   After the group is created add the bot you created in the last step to it. Once added, click on the group name and you should see the group members. Long tap or right-click on the bot and make it an admin.

4. **Get the group ID**

   To get the group ID you can add @getidsbot to your group and type /id. It should return two IDs. The first one is your USER ID, the second the GROUP ID. Remember both of them.

5. **Install**

   ```bash
   git clone https://github.com/miketorreno/telegram-support-bot.git

   cd telegram-support-bot/apps/bot
   ```

6. **Configure**

   Rename the config-sample.yaml file in the config folder to config.yaml.

   ```bash
   mv config/config-sample.yaml config.yaml
   ```

   Now fill in the TOKEN, USER ID, GROUP ID:

   ```text
   bot_token: "TOKEN"
   staffchat_id: "GROUP_ID"
   owner_id: "USER_ID"
   ```

7. **Run**

   ```bash
   docker-compose up -d
   ```

# Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/miketorreno/telegram-support-bot/issues). You can also take a look at the [contributing guide](https://github.com/miketorreno/telegram-support-bot/blob/main/CONTRIBUTING.md).

# License

This project is [GPL-3.0](https://github.com/miketorreno/telegram-support-bot/blob/main/LICENSE) licensed.

---

If you need help or need a hosted solution of this feel free to contact me.
