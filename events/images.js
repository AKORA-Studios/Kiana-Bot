const { MessageAttachment } = require('discord.js')
const Canvas = require('canvas')
const path = require('path')

async function levelupCard(m, level) {
    const canvas = Canvas.createCanvas(700, 100);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(path.join(__dirname, 'levelcard.png'));

    let x = 0
    let y = 0
    let w = canvas.width
    let r = canvas.height / 15
    let h = canvas.height
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(background, 0, 0);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${m.user.tag}`, canvas.width / 7, canvas.height / 1.8);

    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Levelup in ${m.guild.name}`, canvas.width / 7, canvas.height / 1.1);

    ctx.font = '45px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(level, canvas.width / 1.15, canvas.height / 1.6);

    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(m.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 0, 0, 100, 100);
    return new MessageAttachment(canvas.toBuffer(), 'levelup.png');
}

module.exports = { levelupCard }