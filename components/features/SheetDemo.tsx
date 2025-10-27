"use client";

import React, { useState } from "react";
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
import { motion } from "framer-motion";
import { useCart } from "../../components/features/CartContext";

export function CartSheet() {
  const { cart, total, increaseQty, decreaseQty, removeItem, clearCart } =
    useCart();
  const [showInvoice, setShowInvoice] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
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
                {cart.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Tu Carrito</SheetTitle>
            <SheetDescription>
              Revisa tus productos antes de pagar.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Tu carrito está vacío 🛍️
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price} x {item.qty} = ${item.price * item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <SheetFooter className="flex flex-col gap-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>

            <Button
              variant="destructive"
              className="w-full"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              Vaciar carrito
            </Button>

            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Seguir comprando
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* FACTURA GAMING */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="bg-black/90 text-white border border-purple-700 shadow-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-purple-400 tracking-widest drop-shadow-md">
              🎮 FACTURA DE COMPRA 🎮
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 mt-4"
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-purple-700 pb-1"
              >
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.qty}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-lg font-bold border-t border-purple-600 pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-center mt-4 text-sm text-purple-400"
          >
            ¡Gracias por tu compra, gamer! 🕹️
          </motion.div>

          <Button
            onClick={() => {
              setShowInvoice(false);
              clearCart();
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
