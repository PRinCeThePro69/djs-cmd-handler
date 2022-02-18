const client = require("../index");

client.on("messageCreate", async (msg) => {
    if (
        msg.author.bot ||
        !msg.guild ||
        !msg.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = msg.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, msg, args);

});
