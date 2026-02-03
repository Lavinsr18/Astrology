import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useWishlist } from "../components/layout/WishlistContext";
import StarBackground from "../components/ui/StarBackground";



export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center relative">
        <StarBackground />
        <div className="text-center">
          <Heart className="mx-auto w-14 h-14 text-pink-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-white/60 mb-6">
            Save items you love to see them here
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      <StarBackground />

      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">
          ❤️ My Wishlist
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="
                bg-white/5 border border-white/10
                rounded-2xl overflow-hidden
                hover:border-primary/40 transition
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-square bg-black/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* REMOVE */}
                <button
                 onClick={() => removeFromWishlist(product._id)}
                  className="
                    absolute top-3 right-3
                    bg-black/60 hover:bg-red-500
                    p-2 rounded-full text-white
                    transition
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1">
                  {product.name}
                </h3>

                <p className="text-sm text-white/60 mb-3">
                  {product.use} • {product.stones}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>

                  <Link
                    href={`/product/${product.id}`}
                    className="
                      flex items-center gap-2
                      px-4 py-2 rounded-lg
                      bg-primary text-white text-sm
                    "
                  >
                    <ShoppingCart size={16} />
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
