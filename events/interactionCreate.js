const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
       

        const cmd = client.commands.get(interaction.commandName);
        if (!cmd){
         await interaction.deferReply({ephemeral: true}).catch(() => {});
            return interaction.editReply({ content: "An error has occured " , ephemeral: true}) && client.commands.delete(interaction.commandName);
        }
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        console.log()
        if (!interaction.member.permissions.has(cmd.userPermissions) || '') {
            await interaction.deferReply({ephemeral: true})
            return interaction.editReply({
                content: `You don't have \`${cmd.userPermissions}\` permission to run the command.`,
                
            })
        }
        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
