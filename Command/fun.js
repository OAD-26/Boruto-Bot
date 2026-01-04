module.exports = {
  name: "fun",
  description: "Fun commands!",
  execute(message, args) {
    if (args[0] === "say") {
      message.channel.send(args.slice(1).join(" "));
    } else if (args[0] === "mock") {
      const text = args.slice(1).join(" ");
      let mockText = "";
      for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
          mockText += text[i].toUpperCase();
        } else {
          mockText += text[i].toLowerCase();
        }
      }
      message.channel.send(mockText);
    } else if (args[0] === "reverse") {
      message.channel.send(args.slice(1).join(" ").split("").reverse().join(""));
    } else {
      message.channel.send("Available fun commands: say, mock, reverse");
    }
  },
};