import { createServer as e } from "node:http";
import { existsSync as t, mkdirSync as n, readFileSync as r, renameSync as i, writeFileSync as a } from "node:fs";
import { dirname as o, extname as s, join as c, resolve as l } from "node:path";
import { fileURLToPath as u } from "node:url";
import { networkInterfaces as d } from "node:os";
//#region lib/game/cards.ts
var f = {
	explode: {
		name: "Portlovchi mushuk",
		en: "Exploding Kitten",
		color: "#ff714c",
		icon: "bomb",
		description: "Defuse bo‘lmasa, o‘yindan chiqasiz."
	},
	defuse: {
		name: "Zararsizlantirish",
		en: "Defuse",
		color: "#c8f47d",
		icon: "shield",
		description: "Portlashdan saqlaydi. Mushukni dastaga yashirin qaytarasiz."
	},
	attack: {
		name: "Hujum",
		en: "Attack ×2",
		color: "#ffb464",
		icon: "zap",
		description: "Navbatlaringiz tugaydi. Keyingi o‘yinchi 2 navbat oladi. Hujumlar qo‘shiladi."
	},
	targeted: {
		name: "Nishonli hujum",
		en: "Targeted Attack",
		color: "#f6a37b",
		icon: "target",
		description: "Tanlagan raqibingizga 2 navbat bering. Hujumlar qo‘shiladi."
	},
	skip: {
		name: "O‘tkazib yuborish",
		en: "Skip",
		color: "#8ecded",
		icon: "skip",
		description: "Bitta navbatni karta tortmasdan tugating."
	},
	see: {
		name: "Kelajakni ko‘rish",
		en: "See the Future ×3",
		color: "#c5a4f1",
		icon: "eye",
		description: "Dastaning ustidagi 3 kartani faqat o‘zingiz ko‘ring."
	},
	alter: {
		name: "Kelajakni o‘zgartirish",
		en: "Alter the Future ×3",
		color: "#bdb4ff",
		icon: "sparkles",
		description: "Ustki 3 kartani ko‘ring va tartibini o‘zgartiring."
	},
	shuffle: {
		name: "Aralashtirish",
		en: "Shuffle",
		color: "#82d8c7",
		icon: "shuffle",
		description: "Dastadagi barcha kartalarni tasodifiy aralashtiring."
	},
	bottom: {
		name: "Pastdan tortish",
		en: "Draw from the Bottom",
		color: "#eed08c",
		icon: "layers",
		description: "Dastaning eng pastidan karta olib, bitta navbatni tugating."
	},
	favor: {
		name: "Iltimos",
		en: "Favor",
		color: "#ed9dc7",
		icon: "gift",
		description: "Raqib sizga o‘zi tanlagan bitta kartasini beradi."
	},
	nope: {
		name: "Yo‘q!",
		en: "Nope",
		color: "#ff8a86",
		icon: "ban",
		description: "Harakatni bekor qiling. Yana bir Nope uni qayta yoqadi. Defuse va portlashga ishlamaydi."
	},
	feral: {
		name: "Yovvoyi mushuk",
		en: "Feral Cat",
		color: "#c3d5a1",
		icon: "cat",
		description: "Juftlik va uchlikda istalgan oddiy mushuk o‘rniga ishlaydi."
	},
	taco: {
		name: "Tako mushuk",
		en: "Tacocat",
		color: "#f4cb82",
		icon: "cat",
		description: "Bir xil ikki karta: tasodifiy karta oling. Uchta: kerakli kartani so‘rang."
	},
	melon: {
		name: "Tarvuz mushuk",
		en: "Cattermelon",
		color: "#91d598",
		icon: "cat",
		description: "Yakka holda ishlamaydi. Juftlik yoki uchlik uchun yig‘ing."
	},
	potato: {
		name: "Kartoshka mushuk",
		en: "Hairy Potato Cat",
		color: "#d9b295",
		icon: "cat",
		description: "Yakka holda ishlamaydi. Juftlik yoki uchlik uchun yig‘ing."
	},
	beard: {
		name: "Soqolli mushuk",
		en: "Beard Cat",
		color: "#adbdde",
		icon: "cat",
		description: "Yakka holda ishlamaydi. Juftlik yoki uchlik uchun yig‘ing."
	},
	rainbow: {
		name: "Kamalak mushuk",
		en: "Rainbow-Ralphing Cat",
		color: "#d9ace7",
		icon: "cat",
		description: "Yakka holda ishlamaydi. Juftlik yoki uchlik uchun yig‘ing."
	}
}, p = [
	"taco",
	"melon",
	"potato",
	"beard",
	"rainbow",
	"feral"
], m = class extends Error {
	constructor(e, t = 400) {
		super(e), this.status = t;
	}
};
function h(e, t) {
	if (!e) throw new m(t);
}
function g() {
	return crypto.randomUUID();
}
function _(e) {
	if (e <= 0) return 0;
	let t = new Uint32Array(1), n = 4294967296 - 4294967296 % e;
	do
		crypto.getRandomValues(t);
	while (t[0] >= n);
	return t[0] % e;
}
function v(e) {
	for (let t = e.length - 1; t > 0; t--) {
		let n = _(t + 1);
		[e[t], e[n]] = [e[n], e[t]];
	}
	return e;
}
function y(e, t, n = Date.now()) {
	e.log.push({
		id: g(),
		text: t,
		time: n
	}), e.log = e.log.slice(-50);
}
function b(e, t, n, r = Date.now()) {
	return {
		code: e,
		capacity: t,
		host: n.id,
		status: "lobby",
		players: [n],
		deck: [],
		discard: [],
		turn: 0,
		due: 1,
		attacked: !1,
		phase: null,
		winner: null,
		log: [{
			id: g(),
			text: `${n.name} xonani yaratdi.`,
			time: r
		}],
		revision: 0,
		created: r,
		updated: r,
		requests: []
	};
}
function x(e, t, n = Date.now()) {
	return {
		id: g(),
		name: e,
		secretHash: t,
		hand: [],
		alive: !0,
		ready: !1,
		lastSeen: n,
		left: !1
	};
}
function S(e, t) {
	h(e.status === "lobby", "O‘yin boshlangan. Keyingi davrani kuting."), h(e.players.length < e.capacity, "Xona to‘lgan."), h(!e.players.some((e) => e.name.toLocaleLowerCase() === t.name.toLocaleLowerCase()), "Bu ism band. Boshqa ism kiriting."), e.players.push(t), y(e, `${t.name} qo‘shildi.`);
}
function C(e) {
	return e.players.filter((e) => e.alive && !e.left);
}
function w(e) {
	for (let t = 1; t <= e.players.length; t++) {
		let n = (e.turn + t) % e.players.length;
		if (e.players[n].alive && !e.players[n].left) {
			e.turn = n;
			return;
		}
	}
}
function T(e) {
	let t = C(e);
	return t.length <= 1 ? (e.status = "finished", e.winner = t[0]?.id ?? null, e.phase = null, y(e, t[0] ? `${t[0].name} g‘olib bo‘ldi!` : "Davra tugadi."), !0) : !1;
}
function E(e) {
	e.due--, e.due <= 0 && (e.due = 1, e.attacked = !1, w(e));
}
function D(e, t) {
	h(e.players[e.turn]?.id === t.id, "Hozir sizning navbatingiz emas.");
}
function O(e, t) {
	h(t.id === e.host, "Faqat xona egasi boshlaydi."), h(e.status === "lobby", "O‘yin allaqachon boshlangan."), h(e.players.length >= 2, "Kamida 2 o‘yinchi kerak."), h(e.players.every((t) => t.ready || t.id === e.host), "Barcha do‘stlaringiz tayyor bo‘lishini kuting.");
	let n = e.players.length, r = n <= 3 ? 0 : n <= 7 ? 1 : 2, i = {
		defuse: [3, 7],
		attack: [2, 3],
		targeted: [2, 3],
		skip: [4, 6],
		see: [3, 3],
		alter: [2, 4],
		shuffle: [2, 4],
		bottom: [3, 4],
		favor: [2, 4],
		nope: [4, 5],
		feral: [2, 4],
		taco: [3, 4],
		melon: [3, 4],
		potato: [3, 4],
		beard: [3, 4],
		rainbow: [3, 4]
	}, a = [];
	for (let [e, t] of Object.entries(i)) {
		let i = r === 2 ? t[0] + t[1] : t[r];
		e === "defuse" && (i -= n);
		for (let t = 0; t < i; t++) a.push({
			id: g(),
			type: e
		});
	}
	v(a);
	for (let t of e.players) t.alive = !0, t.left = !1, t.hand = [{
		id: g(),
		type: "defuse"
	}, ...a.splice(0, 7)];
	for (let e = 0; e < n - 1; e++) a.push({
		id: g(),
		type: "explode"
	});
	e.deck = v(a), e.discard = [], e.turn = _(n), e.due = 1, e.attacked = !1, e.status = "playing", e.phase = null, e.winner = null, y(e, `Kartalar tarqatildi. Birinchi navbat: ${e.players[e.turn].name}.`);
}
function k(e, t, n = !1) {
	let r = n ? e.deck.pop() : e.deck.shift();
	if (h(r, "Dastada karta qolmadi."), r.type === "explode") {
		let n = t.hand.findIndex((e) => e.type === "defuse");
		n >= 0 ? (e.discard.push(t.hand.splice(n, 1)[0]), e.phase = {
			kind: "defuse",
			actor: t.id,
			card: r,
			deadline: Date.now() + 9e4
		}, y(e, `${t.name} portlovchi mushuk tortdi va Defuse ishlatdi.`)) : (t.alive = !1, t.hand = [], e.discard.push(r), y(e, `${t.name} portladi va o‘yindan chiqdi.`), T(e) || (e.due = 1, e.attacked = !1, w(e)));
	} else t.hand.push(r), y(e, `${t.name} ${n ? "pastdan " : ""}karta tortdi.`), E(e);
}
function A(e, t) {
	let n = e.phase;
	if (!n || n.kind !== "pending") return;
	if (e.phase = null, n.canceled) {
		y(e, "Harakat Nope bilan bekor qilindi.", t);
		return;
	}
	let r = e.players.find((e) => e.id === n.actor);
	if (!r?.alive || r.left) return;
	let i = e.players.find((e) => e.id === n.target && e.alive && !e.left);
	switch (n.effect) {
		case "skip":
			E(e);
			break;
		case "attack":
		case "targeted": {
			if (n.effect === "targeted" && !i) return;
			let r = e.attacked ? e.due + 2 : 2;
			i ? e.turn = e.players.indexOf(i) : w(e), e.due = r, e.attacked = !0, y(e, `${e.players[e.turn].name} ${r} navbat bajaradi.`, t);
			break;
		}
		case "shuffle":
			v(e.deck), y(e, "Dasta aralashtirildi.", t);
			break;
		case "see":
		case "alter":
			e.phase = {
				kind: "future",
				actor: r.id,
				alter: n.effect === "alter",
				cards: e.deck.slice(0, 3),
				deadline: t + 6e4
			};
			break;
		case "bottom":
			k(e, r, !0);
			break;
		case "favor":
			i?.hand.length && (e.phase = {
				kind: "favor",
				actor: r.id,
				target: i.id,
				deadline: t + 45e3
			});
			break;
		case "pair":
			i?.hand.length && (r.hand.push(i.hand.splice(_(i.hand.length), 1)[0]), y(e, `${r.name} ${i.name}dan bitta tasodifiy karta oldi.`, t));
			break;
		case "triple":
			if (i) {
				let a = i.hand.findIndex((e) => e.type === n.ask);
				a >= 0 ? (r.hand.push(i.hand.splice(a, 1)[0]), y(e, `${r.name} so‘ralgan kartani oldi.`, t)) : y(e, `${i.name}da so‘ralgan karta yo‘q.`, t);
			}
			break;
	}
}
function j(e, t = Date.now()) {
	let n = e.phase;
	if (!n || n.deadline > t) return !1;
	if (n.kind === "pending") A(e, t);
	else if (n.kind === "defuse") e.deck.splice(_(e.deck.length + 1), 0, n.card), e.phase = null, E(e), y(e, "Mushuk dastaga yashirin qaytarildi.", t);
	else if (n.kind === "future") e.phase = null, y(e, "Kelajakni ko‘rish tugadi.", t);
	else if (n.kind === "favor") {
		let r = e.players.find((e) => e.id === n.target), i = e.players.find((e) => e.id === n.actor);
		r?.hand.length && i?.alive && i.hand.push(r.hand.splice(_(r.hand.length), 1)[0]), e.phase = null, y(e, "Iltimos bajarildi.", t);
	}
	return !0;
}
function M(e) {
	let t = e.filter((e) => e.type !== "feral");
	if (!t.length) return !0;
	let n = t[0].type;
	return t.every((e) => e.type === n) && (e.length === t.length || p.includes(n));
}
function N(e, t) {
	if (e.status === "lobby") {
		e.players = e.players.filter((e) => e.id !== t.id), e.host === t.id && (e.host = e.players[0]?.id ?? ""), y(e, `${t.name} xonadan chiqdi.`);
		return;
	}
	if (t.left) return;
	let n = e.players[e.turn]?.id === t.id, r = e.phase, i = !1;
	if (r && r.actor === t.id ? (r.kind === "defuse" && (i = !0), e.phase = null) : r && (r.kind === "favor" || r.kind === "pending") && r.target === t.id && (e.phase = null), t.alive && !i) {
		let t = e.deck.findIndex((e) => e.type === "explode");
		t >= 0 && e.discard.push(e.deck.splice(t, 1)[0]);
	}
	t.alive = !1, t.left = !0, t.hand = [], e.host === t.id && (e.host = e.players.find((e) => !e.left)?.id ?? ""), y(e, `${t.name} davradan chiqdi.`), e.status === "playing" && !T(e) && n && (e.due = 1, e.attacked = !1, w(e));
}
function P(e, t, n, r = Date.now()) {
	let i = e.players.find((e) => e.id === t && !e.left);
	if (h(i, "Xonadagi o‘rningiz topilmadi."), i.lastSeen = r, n.type === "leave") {
		N(e, i);
		return;
	}
	if (n.type === "kick") {
		h(i.id === e.host, "Faqat xona egasi chiqarishi mumkin.");
		let t = e.players.find((e) => e.id === n.target && e.id !== i.id && !e.left);
		h(t, "O‘yinchi topilmadi."), h(r - t.lastSeen > 6e4, "Faqat 60 soniyadan beri uzilgan o‘yinchini chiqarish mumkin."), N(e, t);
		return;
	}
	if (n.type === "claim-host") {
		let t = e.players.find((t) => t.id === e.host);
		h(!t || t.left || r - t.lastSeen > 6e4, "Xona egasi hali ulangan."), e.host = i.id, y(e, `${i.name} xona egasi bo‘ldi.`);
		return;
	}
	if (n.type === "ready") {
		h(e.status === "lobby", "O‘yin boshlangan."), i.ready = !!n.ready;
		return;
	}
	if (n.type === "start") {
		O(e, i);
		return;
	}
	if (n.type === "rematch") {
		h(i.id === e.host && e.status === "finished", "Qayta o‘ynashni xona egasi boshlaydi."), e.players = e.players.filter((e) => !e.left), e.players.forEach((e) => {
			e.hand = [], e.alive = !0, e.ready = !1;
		}), e.status = "lobby", e.deck = [], e.discard = [], e.phase = null, e.winner = null, y(e, "Yangi davraga tayyorlaning.");
		return;
	}
	if (h(e.status === "playing", "Hozir o‘yin davom etmayapti."), h(i.alive, "Siz bu davradan chiqdingiz."), n.type === "nope" || n.type === "pass") {
		let t = e.phase;
		if (h(t?.kind === "pending", "Hozir bekor qilinadigan harakat yo‘q."), n.type === "nope") {
			let n = i.hand.findIndex((e) => e.type === "nope");
			h(n >= 0, "Sizda Nope yo‘q."), e.discard.push(i.hand.splice(n, 1)[0]), t.canceled = !t.canceled, t.deadline = r + 1e4, t.passed = [], y(e, `${i.name}: ${t.canceled ? "YO‘Q!" : "HA! (Nope ustiga Nope)"}`, r);
		} else t.passed.includes(i.id) || t.passed.push(i.id), C(e).every((e) => t.passed.includes(e.id)) && A(e, r);
		return;
	}
	if (n.type === "reinsert") {
		let t = e.phase;
		h(t?.kind === "defuse" && t.actor === i.id, "Hozir mushukni qaytara olmaysiz."), h(Number.isInteger(n.position) && n.position >= 0 && n.position <= e.deck.length, "Karta o‘rnini tanlang."), e.deck.splice(n.position, 0, t.card), e.phase = null, y(e, "Mushuk dastaga yashirin qaytarildi.", r), E(e);
		return;
	}
	if (n.type === "future-done") {
		let t = e.phase;
		h(t?.kind === "future" && t.actor === i.id, "Kelajak ko‘rinishi yopiq."), t.alter && (h(Array.isArray(n.order) && n.order.length === t.cards.length && new Set(n.order).size === t.cards.length && n.order.every((e) => t.cards.some((t) => t.id === e)), "Kartalar tartibi noto‘g‘ri."), e.deck.splice(0, t.cards.length, ...n.order.map((e) => t.cards.find((t) => t.id === e)))), e.phase = null, y(e, t.alter ? "Ustki kartalar qayta tartiblandi." : "Kelajakni ko‘rish tugadi.", r);
		return;
	}
	if (n.type === "give") {
		let t = e.phase;
		h(t?.kind === "favor" && t.target === i.id, "Hozir karta berishingiz shart emas.");
		let a = i.hand.findIndex((e) => e.id === n.cards?.[0]);
		h(a >= 0, "Beriladigan kartani tanlang."), e.players.find((e) => e.id === t.actor).hand.push(i.hand.splice(a, 1)[0]), e.phase = null, y(e, `${i.name} bitta karta berdi.`, r);
		return;
	}
	if (h(!e.phase, "Avval joriy harakat tugashini kuting."), D(e, i), n.type === "draw") {
		k(e, i);
		return;
	}
	h(n.type === "play", "Noma’lum harakat."), h(Array.isArray(n.cards) && n.cards.length >= 1 && n.cards.length <= 3, "1, 2 yoki 3 karta tanlang."), h(new Set(n.cards).size === n.cards.length, "Bir kartani qayta tanlab bo‘lmaydi.");
	let a = n.cards.map((e) => i.hand.find((t) => t.id === e));
	h(a.every(Boolean), "Karta qo‘lingizda yo‘q.");
	let o = a, s = o[0].type;
	if (o.length > 1 ? (h(M(o), "Juftlik yoki uchlik bir xil turdan bo‘lishi kerak."), s = o.length === 2 ? "pair" : "triple", s === "triple" && h(typeof n.ask == "string" && n.ask in f && n.ask !== "explode", "So‘raladigan karta turini tanlang.")) : h(![
		"defuse",
		"nope",
		"explode",
		...p
	].includes(s), "Bu karta yakka holda o‘ynalmaydi."), [
		"favor",
		"targeted",
		"pair",
		"triple"
	].includes(s)) {
		let t = e.players.find((e) => e.id === n.target && e.id !== i.id && e.alive && !e.left);
		h(t, "Raqibni tanlang."), s !== "targeted" && h(t.hand.length > 0, "Bu raqibda karta yo‘q.");
	}
	i.hand = i.hand.filter((e) => !n.cards.includes(e.id)), e.discard.push(...o), e.phase = {
		kind: "pending",
		actor: i.id,
		effect: s,
		target: n.target,
		ask: n.ask,
		canceled: !1,
		deadline: r + 1e4,
		passed: []
	}, y(e, `${i.name}: ${s === "pair" ? "juftlik" : s === "triple" ? `uchlik — ${f[n.ask].en}` : f[s].en}.`, r);
}
function F(e, t, n = Date.now()) {
	let r = e.players.find((e) => e.id === t && !e.left);
	h(r, "Xonadan chiqarilgansiz.");
	let i = e.phase, a = null;
	if (i) {
		let { kind: e, actor: t, deadline: n } = i;
		a = {
			kind: e,
			actor: t,
			deadline: n
		}, e === "pending" && (a = {
			...a,
			effect: i.effect,
			target: i.target,
			canceled: i.canceled,
			passed: i.passed
		}), e === "favor" && (a = {
			...a,
			target: i.target
		}), e === "future" && (a = {
			...a,
			alter: i.alter,
			...t === r.id ? { cards: i.cards } : {}
		});
	}
	return {
		code: e.code,
		capacity: e.capacity,
		host: e.host,
		status: e.status,
		revision: e.revision,
		serverTime: n,
		me: r.id,
		players: e.players.filter((e) => !e.left).map((e) => ({
			id: e.id,
			name: e.name,
			alive: e.alive,
			ready: e.ready,
			cardCount: e.hand.length,
			online: n - e.lastSeen < 3e4,
			canKick: n - e.lastSeen > 6e4
		})),
		hand: r.hand,
		deckCount: e.deck.length,
		discard: e.discard.slice(-1)[0] ?? null,
		discardCount: e.discard.length,
		turn: e.players[e.turn]?.id,
		due: e.due,
		phase: a,
		winner: e.winner,
		log: e.log.slice(-25)
	};
}
//#endregion
//#region lib/game/service.ts
var I = (e, t = 200) => new Response(JSON.stringify(e), {
	status: t,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-store",
		"X-Content-Type-Options": "nosniff"
	}
});
async function L(e) {
	let t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e));
	return Array.from(new Uint8Array(t)).map((e) => e.toString(16).padStart(2, "0")).join("");
}
function R() {
	let e = crypto.getRandomValues(new Uint8Array(32));
	return Array.from(e).map((e) => e.toString(16).padStart(2, "0")).join("");
}
function z() {
	let e = crypto.getRandomValues(new Uint8Array(6));
	return Array.from(e).map((e) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[e % 32]).join("");
}
function B(e) {
	if (typeof e != "string") throw new m("Ismingizni kiriting.");
	let t = e.trim().replace(/\s+/g, " ");
	if (t.length < 2 || t.length > 20 || /[\p{Cc}\p{Cf}<>]/u.test(t)) throw new m("Ism 2–20 ta belgidan iborat bo‘lsin.");
	return t;
}
async function V(e, t, n) {
	try {
		let r = new URL(e.url);
		if (e.method === "POST") {
			let t = e.headers.get("origin");
			if (t && t !== r.origin) throw new m("Boshqa saytdan so‘rovga ruxsat yo‘q.", 403);
		}
		let i = {};
		if (e.method === "POST") {
			if (Number(e.headers.get("content-length")) > 16e3) throw new m("So‘rov juda katta.", 413);
			let t = await e.text();
			if (t.length > 16e3) throw new m("So‘rov juda katta.", 413);
			try {
				i = JSON.parse(t);
			} catch {
				throw new m("So‘rov noto‘g‘ri.");
			}
			if (!i || typeof i != "object" || Array.isArray(i)) throw new m("So‘rov noto‘g‘ri.");
		}
		if (!n) {
			if (e.method !== "POST") return I({ error: "POST kerak." }, 405);
			let n = B(i.name), r = R(), a = x(n, await L(r));
			if (i.type === "create") {
				let e = Number(i.capacity);
				if (!Number.isInteger(e) || e < 2 || e > 10) throw new m("Xona 2–10 kishilik bo‘lishi kerak.");
				for (let n = 0; n < 5; n++) {
					let n = b(z(), e, a);
					if (await t.create(n)) return I({
						room: F(n, a.id),
						session: {
							code: n.code,
							playerId: a.id,
							token: r
						}
					}, 201);
				}
				throw new m("Xona yaratilmadi. Qayta urinib ko‘ring.", 503);
			}
			if (i.type !== "join") throw new m("Noma’lum so‘rov.");
			let o = String(i.code ?? "").trim().toUpperCase();
			if (!/^[A-Z2-9]{6}$/.test(o)) throw new m("6 belgili xona kodini kiriting.");
			for (let e = 0; e < 5; e++) {
				let e = await t.get(o);
				if (!e || Date.now() - e.updated > 864e5) throw new m("Xona topilmadi yoki muddati tugagan.", 404);
				let n = e.revision;
				if (S(e, a), e.revision++, e.updated = Date.now(), await t.save(e, n)) return I({
					room: F(e, a.id),
					session: {
						code: e.code,
						playerId: a.id,
						token: r
					}
				}, 201);
			}
			throw new m("Xonaga ulanish band. Yana urinib ko‘ring.", 409);
		}
		if (!/^[A-Z2-9]{6}$/.test(n)) throw new m("Xona kodi noto‘g‘ri.", 404);
		let a = e.headers.get("authorization")?.replace(/^Bearer /, "");
		if (!a || a.length !== 64) throw new m("Xonaga qayta kiring.", 401);
		let o = await L(a);
		for (let r = 0; r < 4; r++) {
			let r = await t.get(n);
			if (!r || Date.now() - r.updated > 864e5) throw new m("Xona topilmadi yoki muddati tugagan.", 404);
			let a = r.players.find((e) => e.secretHash === o && !e.left);
			if (!a) throw new m("Xonadagi o‘rningiz topilmadi. Qayta kiring.", 401);
			let s = r.revision, c = Date.now(), l = j(r, c);
			if (e.method === "POST") {
				if (typeof i.requestId != "string" || i.requestId.length > 80) throw new m("So‘rov identifikatori kerak.");
				if (r.requests.includes(i.requestId)) return I({ room: F(r, a.id) });
				if (i.revision !== s) throw new m("O‘yin yangilandi. Harakatni qayta tanlang.", 409);
				if (typeof i.type != "string") throw new m("Harakat turi kerak.");
				if (i.type !== "leave" && l) {
					if (r.revision++, r.updated = c, await t.save(r, s)) return I({
						room: F(r, a.id),
						error: "Harakat muddati tugadi. Yangilangan holatdan davom eting."
					}, 409);
					continue;
				}
				P(r, a.id, i, c), r.requests.push(i.requestId), r.requests = r.requests.slice(-80), l = !0;
			} else if (e.method !== "GET") return I({ error: "Ruxsat etilmagan usul." }, 405);
			if (c - a.lastSeen > 12e3 && (a.lastSeen = c, l = !0), l && (r.revision++, r.updated = c, !await t.save(r, s))) {
				if (e.method === "POST") throw new m("Boshqa harakat keldi. Qayta urinib ko‘ring.", 409);
				continue;
			}
			return i.type === "leave" ? I({ left: !0 }) : I({ room: F(r, a.id, c) });
		}
		throw new m("Xona band. Qayta urinib ko‘ring.", 409);
	} catch (e) {
		return e instanceof m ? I({ error: e.message }, e.status) : (console.error("Game request failed", e), I({ error: "Ulanishda muammo. Birozdan so‘ng qayta urinib ko‘ring." }, 503));
	}
}
//#endregion
//#region lan/server.ts
var H = o(u(import.meta.url)), U = l(H, "client"), W = l(H, "data");
n(W, { recursive: !0 });
var G = {
	async get(e) {
		let n = c(W, e + ".json");
		return t(n) ? JSON.parse(r(n, "utf8")) : null;
	},
	async create(e) {
		let n = c(W, e.code + ".json");
		return t(n) ? !1 : (a(n, JSON.stringify(e), { flag: "wx" }), !0);
	},
	async save(e, n) {
		let o = c(W, e.code + ".json");
		if (!t(o) || JSON.parse(r(o, "utf8")).revision !== n) return !1;
		let s = o + ".tmp";
		return a(s, JSON.stringify(e)), i(s, o), !0;
	}
}, K = {
	".html": "text/html; charset=utf-8",
	".js": "application/javascript",
	".css": "text/css",
	".png": "image/png",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
	".ico": "image/x-icon",
	".webp": "image/webp"
}, q = Number(process.env.PORT || 3e3), J = e(async (e, n) => {
	try {
		let i = e.headers.host || `localhost:${q}`, a = new URL(e.url || "/", `http://${i}`);
		if (a.pathname.startsWith("/api/rooms")) {
			if (!/^\/api\/rooms(?:\/[A-Z2-9]{6})?$/.test(a.pathname)) {
				n.writeHead(404), n.end("Topilmadi");
				return;
			}
			let t = "";
			for await (let r of e) if (t += r.toString(), t.length > 16e3) {
				n.writeHead(413), n.end();
				return;
			}
			let r = new Headers();
			for (let [t, n] of Object.entries(e.headers)) n && r.set(t, Array.isArray(n) ? n.join(",") : n);
			let i = await V(new Request(a, {
				method: e.method,
				headers: r,
				...e.method === "POST" ? { body: t } : {}
			}), G, a.pathname.split("/")[3]);
			n.writeHead(i.status, Object.fromEntries(i.headers)), n.end(await i.text());
			return;
		}
		if (e.method !== "GET" && e.method !== "HEAD") {
			n.writeHead(405), n.end();
			return;
		}
		let o = decodeURIComponent(a.pathname), c = l(U, "." + (o === "/" ? "/index.html" : o));
		if (c !== U && !c.startsWith(U + "/") && !c.startsWith(U + "\\")) {
			n.writeHead(403), n.end();
			return;
		}
		if (!t(c)) {
			n.writeHead(404), n.end("Topilmadi");
			return;
		}
		n.writeHead(200, {
			"Content-Type": K[s(c)] || "application/octet-stream",
			"X-Content-Type-Options": "nosniff",
			"Cache-Control": "no-cache"
		}), n.end(e.method === "HEAD" ? void 0 : r(c));
	} catch (e) {
		console.error("So‘rov xatosi:", e), n.headersSent || n.writeHead(500), n.end("Ulanishda xato.");
	}
});
J.on("error", (e) => {
	console.error("Server ochilmadi:", e.message), process.exitCode = 1;
}), J.listen(q, "0.0.0.0", () => {
	console.log("\nPORTLOVCHI MUSHUKLAR · LAN\n"), console.log(`Shu kompyuterda: http://localhost:${q}`);
	for (let e of Object.values(d())) for (let t of e || []) t.family === "IPv4" && !t.internal && console.log(`Do‘stlaringiz uchun: http://${t.address}:${q}`);
	console.log("\nHamma bir Wi-Fi tarmog‘ida bo‘lsin. Shu oynani ochiq qoldiring.\nTo‘xtatish: Ctrl+C. O‘yinlar data papkasida saqlanadi.\n");
});
//#endregion
