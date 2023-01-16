import * as readline from "readline";
import ascii$fy from "asciify-image";

let options = {
	fit: "box",
	width: 178,
	height: 100
};
let ind = 0;

async function ttascii(): Promise<string[]> {
	let temp: string[] = [];
	for (let i = 1; i <= 591; i++) {
		temp.push(<string>await ascii$fy(`./imgs/${i}.jpg`, <any>options));
		ind = i / 591;
	}
	return temp;
}

let tempInter = setInterval(() => {
	readline.cursorTo(process.stdout, 0, 0, () => {
		process.stdout.write(`${ind * 100 << 0}%`);
		readline.clearScreenDown(process.stdout);
	});
}, 500);

ttascii().then(e => {
	clearInterval(tempInter);
	let i = 0;
	let inter = setInterval(() => {
		readline.cursorTo(process.stdout, 0, 0, () => {
			process.stdout.write(e[i]);
		});
		i++;
		if (i >= 591) {
			clearInterval(inter);
			return;
		}
	}, 100);
});
