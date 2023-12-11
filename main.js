// ============================================================================
//  Demo Plataformas
// 
// ============================================================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const constante = {
	FPS: 100,
	TILE_X: 50,
	TILE_Y: 50,
	COLUMNAS: 16,
	FILAS: 11,
	NRO_ESTRELLAS: 400
}

const resolucion = [constante.TILE_X * constante.COLUMNAS, constante.TILE_Y * constante.FILAS]

const lista_colores = [
	'white', 'white', 'white',
	'lightblue', 'lightskyblue', 'cyan',
	'lightyellow', 'lightyellow', 'lightyellow'
];

const objeto = {
	estrella: [],
	estrellaFija: []
}

const sonidos = {
	musica_fondo: new Audio('./audio/backgroundMusic.wav')
}

// ============================================================================
let comenzar = false;

document.addEventListener('click', (ev) => {

	console.log(ev.target.id);

	if (ev.target.id === 'canvas' && !comenzar) {
		comenzar = true;
		inicializar();
	}

});

// ============================================================================
class EstrellaFija {

	constructor() {

		const radio = numero_random(1, 3);
		const opaca = numero_random(0, 6);

		this.rect = {
			x: Math.floor(Math.random()* resolucion[0]),
			y: Math.floor(Math.random()* resolucion[1]),
			ancho: radio,
			alto: radio,
			alpha: opaca / 10 + 0.5  
		}

		// console.log(this.rect.alpha, this.rect.ancho);

		const color_rnd = Math.floor(Math.random()* lista_colores.length);
		this.color = lista_colores[color_rnd];
	}

	dibuja() {

		ctx.globalAlpha = this.rect.alpha;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.rect.x, this.rect.y, this.rect.ancho, this.rect.alto);
	}
}

// ============================================================================
class Estrella {

	constructor() {

		this.rect = {
			x: 0,
			y: 0,
			ancho: 0,
			alto: 0
		}

		this.move = {
			angulo: undefined,
			vel: undefined,
			alpha: 0.4,
		}

		this.color = 'white';

		this.check_resetEstrella(true);
	}

	dibuja() {

		this.actualiza();
		
		const x = Math.floor(this.rect.x);
		const y = Math.floor(this.rect.y);
		const ancho = Math.floor(this.rect.ancho);
		const alto = Math.floor(this.rect.alto);

		ctx.globalAlpha = this.move.alpha;
		ctx.fillStyle = this.color;
		ctx.fillRect(x, y, ancho, alto);
	}

	actualiza() {

		this.rect.x += Math.cos(this.move.angulo) * this.move.vel;
		this.rect.y += Math.sin(this.move.angulo) * this.move.vel;

		this.rect.ancho += this.move.vel / 100;
		this.rect.alto = this.rect.ancho;
		this.move.alpha += this.move.vel / 2000;

		this.check_resetEstrella(false);
	}

	check_resetEstrella(inicial) {

		const ancho = this.rect.ancho * 2;
		const alto = this.rect.alto * 2;

		if (this.rect.x + ancho > resolucion[0] || this.rect.x < -ancho || this.rect.y + alto > resolucion[1] || this.rect.y < -alto || inicial) {

			const grados_rnd = numero_random(0, 359);

			this.rect.x = numero_random(Math.floor(canvas.width / 2) - 2, Math.floor(canvas.width / 2) + 2);
			this.rect.y = numero_random(Math.floor(canvas.height / 2) - 2, Math.floor(canvas.height / 2) + 2);
			this.rect.ancho = 1.0;
			this.rect.alto = 1.0;

			this.move.angulo = (grados_rnd * Math.PI) / 180;
			this.move.vel = numero_random(1, 4);
			this.move.alpha = 0.4;

			const index = Math.floor(Math.random()* lista_colores.length);
			this.color = lista_colores[index];
		}
	}
}

// ============================================================================
function numero_random(min, max) {
	return Math.floor(Math.random()* (max - min) + min);
}

// ============================================================================
function dibuja_texto(txt, x, y, font, align, color, alpha) {

	ctx.save();

	ctx.font = font;
	ctx.textAlign = align;
	ctx.shadowColor = 'white';
	ctx.shadowBlur = 8;
	// ctx.fillStyle = lista_colores[Math.floor(Math.random()* lista_colores.length)];
	ctx.fillStyle = color;
	ctx.globalAlpha = alpha;
	ctx.fillText(txt, x, y);

	ctx.restore();
}

// ============================================================================
function inicializar() {

	sonidos.musica_fondo.play();
	sonidos.musica_fondo.loop = true;
	
	// -------------------------------------------------
	for (let i = 0; i < constante.NRO_ESTRELLAS; i ++) {
		objeto.estrellaFija.push(new EstrellaFija());
		objeto.estrella.push(new Estrella());
	}

	setInterval(() => {
		bucle_principal();
	}, 1000 / constante.FPS);
}

// ============================================================================
window.onload = () => {

	canvas.width = resolucion[0];
	canvas.height = resolucion[1];

	ctx.scale(1, 1);

	ctx.fillStyle = 'rgb(0, 0, 35)';
	ctx.fillRect(0, 0, resolucion[0], resolucion[1]);

	dibuja_texto('Toque para comenzar...', Math.floor(resolucion[0] / 2), Math.floor(resolucion[1] / 2), '24px arial', 'center', 'lightyellow', 1);

}

// ===================================================================
function bucle_principal() {

	ctx.fillStyle = 'rgb(0, 0, 35)';
	ctx.fillRect(0, 0, resolucion[0], resolucion[1]);

	objeto.estrellaFija.forEach(star => {
		star.dibuja();
	});

	objeto.estrella.forEach(star => {
		star.dibuja();
	});

	dibuja_texto('Centro IMI', Math.floor(resolucion[0] / 2), resolucion[1] - 30, '24px arial', 'center', 'lightyellow', 1);
}
