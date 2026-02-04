import { useCart } from "../components/layout/CartContext";
import { Link } from "wouter";
import StarBackground from "../components/ui/StarBackground";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  if (cart.length === 0) {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center relative text-white">
      <StarBackground />

      <div className="text-center max-w-md px-6">
        {/* ICON / EMOJI */}
        <div className="text-6xl mb-4">🛒</div>

        <h2 className="text-3xl font-bold mb-2">
          Your Cart is Empty
        </h2>

        <p className="text-white/60 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          href="/shop"
          className="
            inline-block
            px-8 py-3
            bg-primary text-black
            rounded-xl font-semibold
            hover:scale-105 transition
          "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}


  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto text-white">
      <StarBackground />
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cart.map(item => (
  <div key={item.product._id}
          className="flex items-center justify-between border-b border-white/10 py-4"
        >
          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={item.product.image}
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {item.product.name}
              </h3>
              <p className="text-white/60">
                ₹{item.product.price}
              </p>

              {/* QTY */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product._id,
                      Math.max(1, item.qty - 1)
                    )
                  }
                  className="px-3 py-1 bg-white/10 rounded"
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.qty + 1)
                  }
                  className="px-3 py-1 bg-white/10 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <p className="font-bold text-primary text-lg">
              ₹{item.product.price * item.qty}
            </p>

            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* SUMMARY */}
       <div className="
        mt-8 mb-8 flex flex-col sm:flex-row
        justify-between items-center
        gap-6
        bg-black/40 backdrop-blur
        border border-white/10
        rounded-2xl p-6
      ">
        <p className="text-xl">
          Subtotal:
          <span className="font-bold text-primary ml-2">
            ₹{subtotal}
          </span>
        </p>

        <Link
          href="/checkout"
          className="
            px-10 py-3
            bg-primary text-black
            rounded-xl font-semibold
            hover:scale-105 transition
          "
        >
          Checkout
        </Link>
      </div>
      
      </div>
  );
}
