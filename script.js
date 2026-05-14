const sites = {
  ifood: {
    name: 'iFood Demo',
    url: 'https://teste.plisfood.local/ifood-demo',
    color: '#ea1d2c',
    badge: 'Entrega média: 25-35 min',
    description: 'Uma vitrine inspirada em aplicativos de delivery, com restaurantes, pratos e carrinho simulados para testes.',
    items: [
      { emoji: '🍔', title: 'Burger Artesanal', meta: '4,8 ★ • Lanches', desc: 'Hambúrguer alto, queijo, molho especial e batata crocante.', price: 34.9 },
      { emoji: '🥗', title: 'Salada Energia', meta: '4,7 ★ • Saudável', desc: 'Folhas frescas, frango grelhado, grãos e molho cítrico.', price: 28.5 },
      { emoji: '🍝', title: 'Massa da Casa', meta: '4,9 ★ • Italiano', desc: 'Penne ao molho pomodoro, parmesão e manjericão.', price: 39.9 }
    ]
  },
  pizza: {
    name: 'Pizza Hub',
    url: 'https://teste.plisfood.local/pizza-hub',
    color: '#f97316',
    badge: 'Combos familiares',
    description: 'Simulação de uma pizzaria interna com sabores, promoções e adicionais para montar um pedido fictício.',
    items: [
      { emoji: '🍕', title: 'Pizza Meia a Meia', meta: 'Grande • 8 fatias', desc: 'Escolha dois sabores e acompanhe com molho da casa.', price: 59.9 },
      { emoji: '🥤', title: 'Combo Pizza + Refri', meta: 'Promoção', desc: 'Pizza grande, refrigerante 2L e borda recheada.', price: 74.9 },
      { emoji: '🧀', title: 'Borda Extra', meta: 'Adicional', desc: 'Borda cremosa com cheddar ou catupiry.', price: 9.9 }
    ]
  },
  market: {
    name: 'Mercado Rápido',
    url: 'https://teste.plisfood.local/mercado-rapido',
    color: '#16a34a',
    badge: 'Itens em até 20 min',
    description: 'Mercadinho simulado para testar navegação entre categorias de conveniência, bebidas e sobremesas.',
    items: [
      { emoji: '🥛', title: 'Kit Café da Manhã', meta: 'Padaria', desc: 'Leite, pão, queijo, frutas e café moído.', price: 42.7 },
      { emoji: '🍫', title: 'Doces Sortidos', meta: 'Conveniência', desc: 'Chocolate, cookies e snacks para compartilhar.', price: 25.4 },
      { emoji: '🧃', title: 'Bebidas Geladas', meta: 'Bebidas', desc: 'Sucos, água e refrigerantes em seleção gelada.', price: 18.8 }
    ]
  },
  sushi: {
    name: 'Sushi Express',
    url: 'https://teste.plisfood.local/sushi-express',
    color: '#7c3aed',
    badge: 'Experiência premium',
    description: 'Ambiente de teste para uma loja japonesa, com cards de combinados e compra dentro do app.',
    items: [
      { emoji: '🍣', title: 'Combinado 32 peças', meta: 'Mais pedido', desc: 'Sashimis, uramakis, niguiris e hot rolls variados.', price: 89.9 },
      { emoji: '🍱', title: 'Bento Executivo', meta: 'Almoço', desc: 'Gohan, proteína, legumes, sunomono e guioza.', price: 46.0 },
      { emoji: '🥟', title: 'Guioza Crocante', meta: 'Entrada', desc: 'Porção com seis unidades e molho oriental.', price: 24.9 }
    ]
  }
};

let activeSite = 'ifood';
let cart = [];

const siteFrame = document.querySelector('#siteFrame');
const addressBar = document.querySelector('#addressBar');
const cartCount = document.querySelector('#cartCount');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderSite(siteKey) {
  const site = sites[siteKey];
  activeSite = siteKey;
  addressBar.textContent = site.url;
  siteFrame.style.setProperty('--site-color', site.color);
  siteFrame.innerHTML = `
    <article class="site-hero">
      <div>
        <p class="eyebrow">Site emulado dentro do app</p>
        <h2>${site.name}</h2>
        <p>${site.description}</p>
      </div>
      <span class="site-badge">${site.badge}</span>
    </article>
    <div class="restaurant-grid">
      ${site.items.map((item, index) => `
        <article class="restaurant-card">
          <div class="card-image" aria-hidden="true">${item.emoji}</div>
          <div>
            <h3>${item.title}</h3>
            <span class="card-meta">${item.meta}</span>
          </div>
          <p>${item.desc}</p>
          <div class="price-row">
            <strong>${formatCurrency(item.price)}</strong>
            <button class="add-button" data-index="${index}" type="button">Adicionar</button>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.length
    ? cart.map(item => `<li><span>${item.title}</span><strong>${formatCurrency(item.price)}</strong></li>`).join('')
    : '<li><span>Nenhum item adicionado ainda.</span><strong>—</strong></li>';

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatCurrency(total);
}

document.querySelectorAll('.sidebar__site').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.sidebar__site').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active');
    renderSite(button.dataset.site);
  });
});

siteFrame.addEventListener('click', event => {
  const button = event.target.closest('.add-button');
  if (!button) return;

  const selected = sites[activeSite].items[Number(button.dataset.index)];
  cart.push({ ...selected, site: sites[activeSite].name });
  renderCart();
});

document.querySelector('#reloadButton').addEventListener('click', () => renderSite(activeSite));
document.querySelector('#clearCart').addEventListener('click', () => {
  cart = [];
  renderCart();
});

renderSite(activeSite);
renderCart();
