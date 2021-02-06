const { MessageAttachment } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')
const Canvas = require('canvas')
const path = require('path')

function CheckName(str) {
    if (str.length < 19) return str
    let oldArrayString = []
    let newArrString = []

    oldArrayString = str.split('#')
    newArrString.push(oldArrayString[0].substr(0, 14))
    newArrString.push(oldArrayString[1])
    return newArrString.join('#')
}

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

async function welcomeImage(member) {
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await loadImage(path.join(__dirname, 'sakura.png'))
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`MemberCount: ${member.guild.memberCount}`, canvas.width / 2.7, canvas.height / 1.3);

    ctx.strokeStyle = '#7d0b2b'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'welcome.png')
}

async function goodbyeImage(membe) {
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await loadImage(path.join(__dirname, 'sakura.png'))
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`Goodbye,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.strokeStyle = '#7d0b2b'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'goodbye.png')
}

module.exports = { welcomeImage, goodbyeImage, levelupCard }