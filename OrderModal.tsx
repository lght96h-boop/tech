import React, { useState } from "react";
import { Product } from "../data/cars";

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<"details" | "form" | "success">("details");
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });

  if (!product) return null;

  const total = product.price * quantity;

  const handleOrder = () => {
    // Telegram WebApp API
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback?.impactOccurred("medium");
    }
    setStep("success");
  };

  const handleClose = () => {
    setStep("details");
    setQuantity(1);
    setForm({ name: "", phone: "", address: "", comment: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-lg bg-[#111] rounded-t-3xl border-t border-gray-800 z-10 max-h-[90vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        {step === "details" && (
          <div className="p-5">
            {/* Product Header */}
            <div className="flex gap-4 mb-5">
              <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-4xl border border-gray-800 flex-shrink-0">
                {product.image}
              </div>
              <div className="flex-1">
                <p className="text-xs text-red-500 font-semibold mb-1 uppercase tracking-wider">{product.brand}</p>
                <h3 className="text-white font-bold text-base leading-tight mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs">Арт: {product.partNumber}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-gray-400 text-xs">{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{product.description}</p>

            {/* Availability */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${product.inStock ? "bg-green-950 text-green-400 border border-green-800" : "bg-red-950 text-red-400 border border-red-800"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
              {product.inStock ? "В наличии" : "Под заказ (3–7 дней)"}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-gray-300 text-sm font-medium">Количество</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold active:scale-95 transition-transform"
                >−</button>
                <span className="text-white font-bold text-lg w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-bold active:scale-95 transition-transform"
                >+</button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-5 border border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Итого</span>
                <div className="text-right">
                  {product.oldPrice && (
                    <p className="text-gray-600 text-sm line-through">{(product.oldPrice * quantity).toLocaleString()} ₽</p>
                  )}
                  <p className="text-white font-black text-2xl">{total.toLocaleString()} ₽</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("form")}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all"
            >
              Оформить заказ →
            </button>
          </div>
        )}

        {step === "form" && (
          <div className="p-5">
            <button onClick={() => setStep("details")} className="text-gray-400 text-sm mb-4 flex items-center gap-1">
              ← Назад
            </button>
            <h3 className="text-white font-bold text-lg mb-5">Данные для доставки</h3>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Ваше имя *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Телефон *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Адрес доставки *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  placeholder="Город, улица, дом"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  placeholder="Уточнения по заказу, VIN-код..."
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-5 border border-gray-800">
              <p className="text-gray-400 text-xs mb-2">Товар</p>
              <p className="text-white text-sm font-semibold mb-1">{product.name} × {quantity}</p>
              <p className="text-red-500 font-black text-xl">{total.toLocaleString()} ₽</p>
            </div>

            <button
              onClick={handleOrder}
              disabled={!form.name || !form.phone || !form.address}
              className="w-full bg-red-600 disabled:bg-gray-700 disabled:text-gray-500 hover:bg-red-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all"
            >
              Подтвердить заказ ✓
            </button>
            <p className="text-gray-600 text-xs text-center mt-3">
              Нажимая кнопку, вы соглашаетесь с условиями обработки данных
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="p-5 text-center py-10">
            <div className="w-20 h-20 bg-green-950 border border-green-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-5">
              ✓
            </div>
            <h3 className="text-white font-black text-2xl mb-2">Заказ принят!</h3>
            <p className="text-gray-400 text-sm mb-2">
              Ваш заказ на <span className="text-white font-semibold">{product.name}</span> успешно оформлен.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Менеджер свяжется с вами в течение 15 минут для подтверждения.
            </p>
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Сумма заказа</span>
                <span className="text-white font-bold">{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Статус</span>
                <span className="text-yellow-400 font-semibold">На обработке</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all"
            >
              Продолжить покупки
            </button>
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
};
