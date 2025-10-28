"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../supabase/client";

export function CartSheet() {
  const { cart, total, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const [showInvoice, setShowInvoice] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [user, setUser] = useState({ id: "", name: "", puntos: 0 });

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Manejar cambio de puntos a usar
  const handlePointsChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (user.puntos) value = Math.min(value, user.puntos);
    setPointsToUse(value);
  };

  // Cada punto = 1% de descuento
  const discountPercent = Math.min(pointsToUse, user.puntos || 0);
  const totalWithDiscount = total * (1 - discountPercent / 100);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const discount = Math.min(pointsToUse, user.puntos || 0);

    // Actualizar puntos en Supabase
    const { data, error } = await supabase
      .from("users")
      .update({ puntos: user.puntos - discount })
      .eq("id", user.id);

    if (error) {
      console.error("Error al actualizar puntos en Supabase:", error);
      return;
    }

    // Actualizar estado local y localStorage **inmediatamente**
    setUser(prev => {
      const updated = { ...prev, puntos: prev.puntos - discount };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });

    // Abrir factura
    setShowInvoice(true);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button className="relative">
            <FaShoppingCart className="text-white text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-[3px]">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Tu Carrito</SheetTitle>
            <SheetDescription>Revisa tus productos antes de pagar.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">Tu carrito está vacío 🛍️</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price} x {item.qty} = ${item.price * item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => decreaseQty(item.id)}>-</Button>
                    <span>{item.qty}</span>
                    <Button variant="outline" size="sm" onClick={() => increaseQty(item.id)}>+</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>🗑</Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input de puntos con preview de descuento */}
          {cart.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-white">Usar puntos para descuento (%):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={user?.puntos || 0}
                  value={pointsToUse}
                  onChange={handlePointsChange}
                  className="flex-1 p-2 rounded bg-gray-800 text-white"
                  placeholder={`Tienes ${user?.puntos || 0} puntos`}
                />
                <span className="text-sm text-green-400 font-bold">
                  -{discountPercent}%
                </span>
              </div>
              <span className="text-xs text-gray-400">Cada punto = 1% de descuento</span>
              <span className="text-xs text-white mt-1">Tienes {user.puntos} puntos restantes</span>
            </div>
          )}

          <SheetFooter className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalWithDiscount.toFixed(2)}</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>

            <Button variant="destructive" className="w-full" onClick={clearCart} disabled={cart.length === 0}>
              Vaciar carrito
            </Button>

            <SheetClose asChild>
              <Button variant="outline" className="w-full">Seguir comprando</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* FACTURA */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="bg-black/90 text-white border border-purple-700 shadow-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-purple-400 tracking-widest drop-shadow-md">
              🎮 FACTURA DE COMPRA 🎮
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-purple-700 pb-1">
                <span>{item.name}</span>
                <span>${item.price} x {item.qty}</span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-bold border-t border-purple-600 pt-2">
              <span>Total</span>
              <span>${totalWithDiscount.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="text-sm text-green-400">
                Se aplicaron {pointsToUse} puntos ({discountPercent}%) de descuento
              </div>
            )}
          </div>

          <Button
            onClick={() => {
              setShowInvoice(false);
              clearCart();
              setPointsToUse(0);
            }}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-700 mt-3"
          >
            Cerrar factura
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
