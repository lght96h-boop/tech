import { useState, useEffect } from "react";
import { Logo } from "./components/Logo";
import { BrandSVGs } from "./components/BrandLogos";
import { OrderModal } from "./components/OrderModal";
import { carBrands, categories, products, Product } from "./data/cars";

type Tab = "home" | "catalog" | "cart" | "support";

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filteredProducts = products.filter(p => {
    const matchCat = !selectedCategory || p.category === selectedCategory;
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSupport = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({ action: "support_request" }));
    }
    // Open support chat via bot
    const botToken = "8522642079:AAE6tS0Z8eiAjm2u23aKAEudfv-KyqsIVsc";
    void botToken; // reserved for API use
    window.open("https://t.me/CarTechSupportBot", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-[#111] border-b border-gray-800 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <button
              onClick={handleSupport}
              className="w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-base transition-colors active:scale-90"
              title="Техподдержка"
            >
              🎧
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className="relative w-9 h-9 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-base transition-colors active:scale-90"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">

        {/* HOME TAB */}
        {activeTab === "home" && (
          <div>
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0000] via-[#111] to-[#0a0a0a] mx-4 mt-4 rounded-2xl border border-gray-800 p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/5 rounded-full translate-y-6 -translate-x-6 blur-lg" />
              <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-2">Запчасти по всему СНГ</p>
              <h1 className="text-white font-black text-2xl leading-tight mb-2">
                Оригинал и<br/>аналоги в наличии
              </h1>
              <p className="text-gray-400 text-sm mb-4">Быстрая доставка · Гарантия · Лучшие цены</p>
              <button
                onClick={() => setActiveTab("catalog")}
                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                Перейти в каталог →
              </button>
            </div>

            {/* Popular Brands */}
            <div className="px-4 mt-6">
              <h2 className="text-white font-bold text-base mb-3">Популярные марки</h2>
              <div className="grid grid-cols-4 gap-3">
                {carBrands.slice(0, 8).map(brand => {
                  const BrandLogo = BrandSVGs[brand.id];
                  return (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand.id);
                        setActiveTab("catalog");
                      }}
                      className="flex flex-col items-center gap-2 p-2 rounded-xl bg-[#111] border border-gray-800 hover:border-red-700 active:scale-95 transition-all"
                    >
                      {BrandLogo ? <BrandLogo size={38} /> : <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl">{brand.logo}</div>}
                      <span className="text-gray-400 text-[10px] font-semibold">{brand.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories preview */}
            <div className="px-4 mt-6">
              <h2 className="text-white font-bold text-base mb-3">Категории</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 6).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab("catalog");
                    }}
                    className="flex items-center gap-3 p-3.5 bg-[#111] border border-gray-800 hover:border-red-700 active:scale-95 rounded-xl transition-all text-left"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">{cat.name}</p>
                      <p className="text-gray-600 text-xs">{cat.count.toLocaleString()} товаров</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hot deals */}
            <div className="px-4 mt-6 mb-2">
              <h2 className="text-white font-bold text-base mb-3">🔥 Горячие предложения</h2>
              <div className="space-y-3">
                {products.filter(p => p.oldPrice).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={() => setSelectedProduct(product)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="px-4 mt-4 mb-2">
              <button
                onClick={handleSupport}
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 hover:border-red-700 active:scale-95 rounded-2xl p-4 flex items-center gap-4 transition-all"
              >
                <div className="w-12 h-12 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center justify-center text-2xl">
                  🎧
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Нужна помощь?</p>
                  <p className="text-gray-400 text-xs">Техническая поддержка 24/7</p>
                </div>
                <span className="ml-auto text-red-500 text-lg">→</span>
              </button>
            </div>
          </div>
        )}

        {/* CATALOG TAB */}
        {activeTab === "catalog" && (
          <div>
            {/* Search */}
            <div className="px-4 pt-4 pb-3 sticky top-[61px] bg-[#0a0a0a] z-30">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Поиск запчастей..."
                  className="w-full bg-[#111] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            {/* Brand filter */}
            <div className="px-4 mb-3">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!selectedBrand ? "bg-red-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800"}`}
                >
                  Все марки
                </button>
                {carBrands.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.id === selectedBrand ? null : b.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedBrand === b.id ? "bg-red-600 text-white" : "bg-[#111] text-gray-400 border border-gray-800"}`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category pills */}
            <div className="px-4 mb-4">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!selectedCategory ? "bg-gray-700 text-white" : "bg-[#111] text-gray-400 border border-gray-800"}`}
                >
                  Все
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id === selectedCategory ? null : c.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${selectedCategory === c.id ? "bg-gray-700 text-white" : "bg-[#111] text-gray-400 border border-gray-800"}`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected brand info */}
            {selectedBrand && (
              <div className="px-4 mb-3">
                <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-3 flex items-center gap-3">
                  {(() => { const B = BrandSVGs[selectedBrand]; return B ? <B size={32} /> : null; })()}
                  <div>
                    <p className="text-red-400 text-xs font-semibold">Выбранная марка</p>
                    <p className="text-white font-bold">{carBrands.find(b => b.id === selectedBrand)?.name}</p>
                  </div>
                  <button onClick={() => setSelectedBrand(null)} className="ml-auto text-gray-500 text-xl">×</button>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="px-4 space-y-3 pb-4">
              <p className="text-gray-500 text-xs">{filteredProducts.length} товаров</p>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="text-gray-400 font-semibold">Ничего не найдено</p>
                  <p className="text-gray-600 text-sm mt-1">Попробуйте изменить фильтры или запрос</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={() => setSelectedProduct(product)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* CART TAB */}
        {activeTab === "cart" && (
          <div className="px-4 pt-4">
            <h2 className="text-white font-black text-xl mb-4">Корзина</h2>
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🛒</p>
                <p className="text-gray-400 font-bold text-lg mb-2">Корзина пуста</p>
                <p className="text-gray-600 text-sm mb-6">Добавьте запчасти из каталога</p>
                <button
                  onClick={() => setActiveTab("catalog")}
                  className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-sm active:scale-95 transition-all"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-5">
                  {cart.map(item => (
                    <div key={item.product.id} className="bg-[#111] border border-gray-800 rounded-2xl p-4 flex gap-3">
                      <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {item.product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold leading-tight truncate">{item.product.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{item.product.brand}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-red-500 font-black">{(item.product.price * item.qty).toLocaleString()} ₽</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.qty === 1) removeFromCart(item.product.id);
                                else setCart(prev => prev.map(i => i.product.id === item.product.id ? { ...i, qty: i.qty - 1 } : i));
                              }}
                              className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 font-bold active:scale-90 transition-transform"
                            >−</button>
                            <span className="text-white font-bold text-sm w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => setCart(prev => prev.map(i => i.product.id === item.product.id ? { ...i, qty: i.qty + 1 } : i))}
                              className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold active:scale-90 transition-transform"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Товаров: {cartCount}</span>
                    <span className="text-gray-400 text-sm">Доставка: уточняется</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                    <span className="text-white font-bold">Итого</span>
                    <span className="text-white font-black text-2xl">{cartTotal.toLocaleString()} ₽</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(cart[0].product)}
                  className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all"
                >
                  Оформить заказ →
                </button>
                <button
                  onClick={() => setCart([])}
                  className="w-full mt-2 text-gray-500 text-sm py-2 active:scale-95 transition-all"
                >
                  Очистить корзину
                </button>
              </>
            )}
          </div>
        )}

        {/* SUPPORT TAB */}
        {activeTab === "support" && (
          <div className="px-4 pt-4">
            <h2 className="text-white font-black text-xl mb-4">Поддержка</h2>

            <div className="bg-gradient-to-br from-red-950/50 to-gray-900 border border-red-900/50 rounded-2xl p-5 mb-4 text-center">
              <div className="text-5xl mb-3">🎧</div>
              <h3 className="text-white font-bold text-lg mb-1">Техническая поддержка</h3>
              <p className="text-gray-400 text-sm mb-4">Наши специалисты помогут подобрать запчасть, ответят на вопросы по заказу и доставке.</p>
              <button
                onClick={handleSupport}
                className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3.5 rounded-xl text-sm transition-all"
              >
                💬 Написать в поддержку
              </button>
            </div>

            <div className="space-y-3">
              {[
                { icon: "⏰", title: "Режим работы", desc: "Пн–Вс, 09:00 – 21:00 (МСК)" },
                { icon: "📦", title: "Доставка", desc: "По всему СНГ. СДЭК, Почта, ПВЗ" },
                { icon: "🔄", title: "Возврат", desc: "14 дней с момента получения" },
                { icon: "💳", title: "Оплата", desc: "Наличные, карта, СБП, криптовалюта" },
                { icon: "✅", title: "Гарантия", desc: "На все товары от 6 до 24 месяцев" },
              ].map(item => (
                <div key={item.title} className="bg-[#111] border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#111] border-t border-gray-800 z-40">
        <div className="grid grid-cols-4">
          {([
            { id: "home", label: "Главная", icon: "🏠" },
            { id: "catalog", label: "Каталог", icon: "📋" },
            { id: "cart", label: "Корзина", icon: "🛒", badge: cartCount },
            { id: "support", label: "Помощь", icon: "🎧" },
          ] as { id: Tab; label: string; icon: string; badge?: number }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all active:scale-90 ${activeTab === tab.id ? "text-red-500" : "text-gray-500"}`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute top-1.5 right-5 bg-red-600 text-white text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                  {tab.badge}
                </span>
              ) : null}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
        {/* iOS safe area */}
        <div className="h-safe-area-inset-bottom" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </nav>

      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onOrder: () => void;
  onAddToCart: () => void;
}

function ProductCard({ product, onOrder, onAddToCart }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-colors">
      <div className="flex gap-3">
        {/* Image */}
        <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-gray-800">
          {product.image}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide">{product.brand}</p>
              <p className="text-white font-semibold text-sm leading-tight mt-0.5 line-clamp-2">{product.name}</p>
            </div>
            {discount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg flex-shrink-0">
                -{discount}%
              </span>
            )}
          </div>

          <p className="text-gray-600 text-[10px] mt-0.5">Арт: {product.partNumber}</p>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-gray-400 text-xs">{product.rating}</span>
            <span className={`text-[10px] font-semibold ${product.inStock ? "text-green-500" : "text-orange-400"}`}>
              {product.inStock ? "● В наличии" : "● Под заказ"}
            </span>
          </div>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
        <div>
          {product.oldPrice && (
            <p className="text-gray-600 text-xs line-through">{product.oldPrice.toLocaleString()} ₽</p>
          )}
          <p className="text-white font-black text-xl">{product.price.toLocaleString()} ₽</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAddToCart}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 active:scale-90 rounded-xl flex items-center justify-center text-lg transition-all"
            title="В корзину"
          >
            🛒
          </button>
          <button
            onClick={onOrder}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
