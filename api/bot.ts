import { Telegraf } from "telegraf";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

// Example commands
bot.start((ctx) => ctx.reply("👋 Welcome to Smart Sales Tracker!"));
bot.command("addsale", (ctx) => ctx.reply("Please enter sale details..."));
bot.command("sales_today", (ctx) => ctx.reply("Fetching today's sales..."));

// Respond to normal messages
bot.on("text", (ctx) => {
	ctx.reply(`You said: ${ctx.message.text}`);
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method === "POST") {
		try {
			await bot.handleUpdate(req.body);
			res.status(200).send("OK");
		} catch (err) {
			console.error("Bot error:", err);
			res.status(500).send("Error");
		}
	} else {
		res.status(200).send("Bot is live 🚀");
	}
}
