
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MinusCircle, PlusCircle, Trash2, ArrowLeft, CreditCard, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCart } from '@/contexts/CartContext';
import { restaurants } from '@/data/restaurants';
import { formatCurrency } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CartItem } from '@/data/types';

const DELIVERY_FEE = 2.99;
const SERVICE_FEE = 1.99;

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal,
    cartRestaurantId,
    updateSpecialInstructions
  } = useCart();
  
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const restaurant = cartRestaurantId 
    ? restaurants.find(r => r.id === cartRestaurantId) 
    : null;
  
  const subtotal = cartTotal;
  const tax = subtotal * 0.0825; // 8.25% tax
  const orderTotal = subtotal + DELIVERY_FEE + SERVICE_FEE + tax;

  const handleCheckout = () => {
    setAddressDialogOpen(true);
  };
  
  const handleAddressSubmit = () => {
    setAddressDialogOpen(false);
    setPaymentDialogOpen(true);
  };
  
  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDialogOpen(false);
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };
  
  const handleSpecialInstructionsChange = (cartItem: CartItem, instructions: string) => {
    updateSpecialInstructions(cartItem.id, instructions);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/">Browse Restaurants</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 mt-16 animate-fade-in">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2 p-0 h-auto">
            <Link to={restaurant ? `/restaurant/${cartRestaurantId}` : '/'}>
              <ArrowLeft size={20} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {restaurant && (
              <div className="mb-6 p-4 border rounded-md bg-card shadow-sm">
                <div className="flex items-center">
                  <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{restaurant.name}</h2>
                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 animate-slide-in-up">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-20 h-20 mb-4 md:mb-0 md:mr-4">
                      <img 
                        src={item.menuItem.imageUrl} 
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{item.menuItem.name}</h3>
                        <p className="font-medium">
                          {formatCurrency(item.menuItem.price * item.quantity)}
                        </p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                        {item.menuItem.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <MinusCircle size={18} />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusCircle size={18} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        <Input
                          placeholder="Special instructions"
                          value={item.specialInstructions || ''}
                          onChange={(e) => handleSpecialInstructionsChange(item, e.target.value)}
                          className="text-sm h-8"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24 animate-slide-in-up">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{formatCurrency(DELIVERY_FEE)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>{formatCurrency(SERVICE_FEE)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>
              
              <div className="border-t pt-3 mb-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mb-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to={restaurant ? `/restaurant/${cartRestaurantId}` : '/'}>
                  Add More Items
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Address Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delivery Address</DialogTitle>
            <DialogDescription>
              Enter your address for delivery
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center p-4 bg-primary/10 rounded-md mb-4">
              <Home className="text-primary mr-3" size={20} />
              <div className="text-sm">
                <p className="font-medium">Delivery to your address</p>
                <p className="text-muted-foreground">Enter where you want your order delivered</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Street Address</label>
                <Input 
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">City</label>
                  <Input placeholder="New York" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">ZIP Code</label>
                  <Input placeholder="10001" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Delivery Instructions (optional)</label>
                <Input placeholder="Apartment number, gate code, etc." />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddressSubmit} disabled={!address.trim()}>
              Continue to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Method</DialogTitle>
            <DialogDescription>
              Complete your order by providing payment details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center p-4 bg-primary/10 rounded-md mb-4">
              <CreditCard className="text-primary mr-3" size={20} />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">Your payment information is encrypted</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">CVC</label>
                  <Input placeholder="123" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Name on Card</label>
                <Input placeholder="John Doe" />
              </div>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
              <div className="flex items-center mt-2 text-muted-foreground text-sm">
                <MapPin size={14} className="mr-1" />
                <span>Delivering to: {address}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setPaymentDialogOpen(false);
                setAddressDialogOpen(true);
              }}
            >
              Back
            </Button>
            <Button 
              onClick={handleProcessPayment} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CartPage;
