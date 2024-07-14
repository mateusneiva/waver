"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpEmbed = exports.InfoEmbed = exports.WarningEmbed = exports.SuccessEmbed = exports.ErrorEmbed = exports.BaseEmbed = void 0;
const discord_js_1 = require("discord.js");
const BaseEmbed = (data, color = discord_js_1.Colors.Blurple) => new discord_js_1.EmbedBuilder(data).setColor(color);
exports.BaseEmbed = BaseEmbed;
const ErrorEmbed = (text) => (0, exports.BaseEmbed)({ description: text }, discord_js_1.Colors.Red);
exports.ErrorEmbed = ErrorEmbed;
const SuccessEmbed = (text) => (0, exports.BaseEmbed)({ description: text }, discord_js_1.Colors.Green);
exports.SuccessEmbed = SuccessEmbed;
const WarningEmbed = (text) => (0, exports.BaseEmbed)({ description: text }, discord_js_1.Colors.DarkOrange);
exports.WarningEmbed = WarningEmbed;
const InfoEmbed = (text) => (0, exports.BaseEmbed)({ description: text }, discord_js_1.Colors.Blurple);
exports.InfoEmbed = InfoEmbed;
function HelpEmbed(filename) {
    const { data } = require(filename);
    return (0, exports.BaseEmbed)().setDescription(`**Usage:** ${data.usage} \n **Description:** ${data.description}`).setAuthor({ name: data.name }).setColor('#78A1FD');
}
exports.HelpEmbed = HelpEmbed;
