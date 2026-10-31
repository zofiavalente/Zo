// ====== PERSONALIZA AQUI ======
// Escreve o nome (ou alcunha) do teu namorado entre as aspas:
const NOME_DELE = "Mamufo";
// Legendas por baixo de cada foto (foto1, foto2, …). Podes alterar à vontade.
const LEGENDAS = [
  "a Pipoca a espreitar a ver se já me perdoaste 🌿",
  "este olhar da Pipoca é por mim 🥺",
  "a Pipoca a vir dar-te um beijinho de perto 😽",
  "os meus dois preferidos 😻",
  "eu, à espera de um «sim» teu 🌼",
  "a Pipoca a receber miminhos 🐾",
  "💕", "😻", "🥰", "🐱", "💖", "💞", "🐾"
];
// Quantas fotos procurar na pasta fotos/ (foto1 … fotoN)
const MAX_FOTOS = 30;
// ===============================

document.getElementById("nome").textContent = NOME_DELE;

/* ---------- chuva de corações e gatos ---------- */
const EMOJIS = ["💕","💖","💗","💘","💞","❤️","🐱","😻","😽","🐈","😺","🐾","💓","🩷"];
const chuva = document.getElementById("chuva");

function criarGota(emoji, x) {
  const g = document.createElement("span");
  g.className = "gota";
  g.textContent = emoji || EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  g.style.left = (x ?? Math.random() * 100) + "vw";
  g.style.fontSize = (1 + Math.random() * 1.8) + "rem";
  g.style.opacity = 0.55 + Math.random() * 0.45;
  g.style.animationDuration = (5 + Math.random() * 6) + "s";
  chuva.appendChild(g);
  g.addEventListener("animationend", () => g.remove());
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(criarGota, 350);
}

/* ---------- galeria de fotos ---------- */
const EXTENSOES = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
const galeria = document.getElementById("galeria");

function carregarFoto(n, i = 0) {
  return new Promise(resolve => {
    if (i >= EXTENSOES.length) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => carregarFoto(n, i + 1).then(resolve);
    img.src = `fotos/foto${n}.${EXTENSOES[i]}`;
  });
}

(async () => {
  const resultados = await Promise.all(
    Array.from({ length: MAX_FOTOS }, (_, k) => carregarFoto(k + 1))
  );
  let total = 0;
  resultados.forEach((img, k) => {
    if (!img) return;
    img.alt = "A Pipoca a pedir desculpa por mim";
    img.loading = "lazy";
    const cartao = document.createElement("figure");
    cartao.className = "polaroid";
    const leg = document.createElement("figcaption");
    leg.className = "legenda";
    leg.textContent = LEGENDAS[k % LEGENDAS.length];
    cartao.append(img, leg);
    galeria.appendChild(cartao);
    total++;
  });
  if (total === 0) document.getElementById("sem-fotos").hidden = false;
})();

/* ---------- Perdoas-me? ---------- */
const nao = document.getElementById("nao");
const sim = document.getElementById("sim");
const resposta = document.getElementById("resposta");
const FRASES_NAO = ["Não 😿", "Tens a certeza? 🥺", "Pensa melhor… 🙀", "Olha que a Pipoca fica triste 😿",
                    "Vá lá… 😾", "Por favorzinho 🥹"];
let tentativas = 0;

function fugir() {
  tentativas++;
  nao.textContent = FRASES_NAO[tentativas % FRASES_NAO.length];
  nao.style.position = "fixed";
  nao.style.left = Math.random() * (innerWidth - nao.offsetWidth - 20) + 10 + "px";
  nao.style.top = Math.random() * (innerHeight - nao.offsetHeight - 20) + 10 + "px";
  sim.style.transform = `scale(${Math.min(1 + tentativas * 0.15, 2.2)})`;
}
nao.addEventListener("mouseenter", fugir);
nao.addEventListener("click", e => { e.preventDefault(); fugir(); });
nao.addEventListener("touchstart", e => { e.preventDefault(); fugir(); }, { passive: false });

sim.addEventListener("click", () => {
  nao.hidden = true;
  resposta.hidden = false;
  resposta.textContent = "Obrigada, Mamufo! 💖 Gosto tanto de ti. A Pipoca já está a festejar! 😻🎉";
  for (let k = 0; k < 120; k++) {
    setTimeout(() => criarGota(null, Math.random() * 100), k * 25);
  }
});
