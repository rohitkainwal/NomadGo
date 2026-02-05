import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  IoCalendarOutline, 
  IoTimeOutline, 
  IoLocationSharp, 
  IoPerson,
  IoCar,
  IoCheckmarkCircle,
  IoCard,
  IoWallet,
  IoPhonePortrait,
  IoArrowBack
} from 'react-icons/io5';
import { FaCcVisa, FaCcMastercard, FaCcApplePay, FaGooglePay, FaPaypal } from 'react-icons/fa';
import { RiSecurePaymentFill } from 'react-icons/ri';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const widgetData = location.state || {
    from: 'New York City',
    to: 'JFK Airport',
    pickupDate: '2024-02-20',
    travelTime: '14:30',
    travelers: '2 Travelers',
    cabType: 'Sedan'
  };

  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    agreeToTerms: false
  });

  // Redirect if no data
  useEffect(() => {
    if (!widgetData.from) {
      navigate('/');
    }
  }, [widgetData, navigate]);

  const steps = [
    { id: 1, title: 'Trip Details', icon: IoCar },
    { id: 2, title: 'Passenger Info', icon: IoPerson },
    { id: 3, title: 'Payment', icon: IoCard },
    { id: 4, title: 'Confirmation', icon: IoCheckmarkCircle }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: IoCard },
    { id: 'wallet', name: 'Wallet', icon: IoWallet },
    { id: 'upi', name: 'UPI', icon: IoPhonePortrait }
  ];

  const cards = [
    { type: 'visa', last4: '4242', name: 'Visa', icon: FaCcVisa },
    { type: 'mastercard', last4: '8888', name: 'MasterCard', icon: FaCcMastercard }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle booking completion
      console.log('Booking completed!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 font-inter">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 group transition-all duration-300"
        >
          <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Steps */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40 dark:border-gray-700/40">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`relative z-10 flex flex-col items-center ${index !== steps.length - 1 ? 'w-32' : ''}`}>
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          transition-all duration-500 mb-3
                          ${isCompleted ? 'scale-110' : ''}
                          ${isActive 
                            ? 'bg-gradient-to-br shadow-lg' 
                            : isCompleted 
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          }
                        `}
                        style={isActive ? {
                          background: 'linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-dark)))'
                        } : {}}
                        >
                          {isCompleted ? (
                            <IoCheckmarkCircle size={24} />
                          ) : (
                            <Icon size={20} className={isActive ? 'text-white' : ''} />
                          )}
                        </div>
                        <span className={`
                          text-sm font-medium whitespace-nowrap
                          ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}
                        `}>
                          {step.title}
                        </span>
                      </div>
                      
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-1 mx-2 -mt-6">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted 
                              ? 'bg-emerald-400' 
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Form */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/40 dark:border-gray-700/40">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Trip Details */}
                {activeStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trip Details</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Trip Summary Card */}
                      <div className="md:col-span-2">
                        <div className="bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                                <IoCar size={24} style={{ color: 'rgb(var(--color-primary))' }} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{widgetData.cabType}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Premium Ride</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹1,249</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Total Fare</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <IoLocationSharp className="text-blue-500" size={20} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{widgetData.from}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Location</p>
                              </div>
                            </div>
                            
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                            
                            <div className="flex items-center gap-4">
                              <IoLocationSharp className="text-emerald-500" size={20} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{widgetData.to}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Destination</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pickup Date
                        </label>
                        <div className="relative">
                          <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="date"
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            value={widgetData.pickupDate}
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pickup Time
                        </label>
                        <div className="relative">
                          <IoTimeOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="time"
                            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            value={widgetData.travelTime}
                            readOnly
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Travelers
                        </label>
                        <div className="relative">
                          <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <select
                            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            value={widgetData.travelers}
                            readOnly
                          >
                            <option>{widgetData.travelers}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Ride Type
                        </label>
                        <div className="relative">
                          <IoCar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <select
                            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            value={widgetData.cabType}
                            readOnly
                          >
                            <option>{widgetData.cabType}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Passenger Info */}
                {activeStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Passenger Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300 min-h-[100px]"
                          placeholder="Any special instructions for the driver..."
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                          I agree to the <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>. I confirm that all information provided is accurate.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {activeStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <RiSecurePaymentFill size={20} />
                        <span className="text-sm font-medium">Secure Payment</span>
                      </div>
                    </div>
                    
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setPaymentMethod(method.id)}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                paymentMethod === method.id
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <Icon size={24} className={paymentMethod === method.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'} />
                                <span className={`text-sm font-medium ${
                                  paymentMethod === method.id ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                }`}>
                                  {method.name}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Card Details Form */}
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <div className="flex items-center gap-4 mb-4">
                            {cards.map(card => (
                              <div key={card.type} className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-700">
                                <card.icon size={24} className="text-gray-700 dark:text-gray-300" />
                                <span className="text-sm font-medium">•••• {card.last4}</span>
                              </div>
                            ))}
                            <button className="p-3 text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors">
                              + Add New Card
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Card Number
                              </label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-3.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:border-transparent focus:ring-blue-500/20 transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Payment Options */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Quick Payment</p>
                        <div className="flex gap-3">
                          <button className="p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors">
                            <FaCcApplePay size={24} />
                          </button>
                          <button className="p-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                            <FaGooglePay size={24} className="text-gray-700" />
                          </button>
                          <button className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                            <FaPaypal size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {activeStep === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                        <IoCheckmarkCircle size={48} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Booking Confirmed!</h2>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Your ride has been successfully booked. A confirmation has been sent to your email.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Booking Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                            <p className="font-mono font-bold text-gray-900 dark:text-white">NMG-2024-7890</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Passenger</p>
                            <p className="font-medium text-gray-900 dark:text-white">{formData.fullName || 'John Doe'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Time</p>
                            <p className="font-medium text-gray-900 dark:text-white">{widgetData.travelTime}, Today</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Driver Contact</p>
                            <p className="font-medium text-gray-900 dark:text-white">Rajesh Kumar • +91 98765 43210</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle Number</p>
                            <p className="font-medium text-gray-900 dark:text-white">MH 01 AB 1234</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₹1,249</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                  {activeStep > 1 && activeStep < 4 && (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-8 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Back
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className={`ml-auto px-10 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${activeStep === 4 ? 'hover:scale-105' : 'hover:scale-[1.02]'}`}
                    style={{
                      background: activeStep === 4 
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-primary-dark)))'
                    }}
                  >
                    {activeStep === 4 ? 'Download Receipt' : activeStep === 3 ? 'Pay Now ₹1,249' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Summary & Help */}
          <div className="space-y-8">
            {/* Trip Summary */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40 dark:border-gray-700/40">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Fare Breakdown</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Base Fare', amount: '₹850' },
                  { label: 'Distance (25 km)', amount: '₹275' },
                  { label: 'Peak Time Charges', amount: '₹124' },
                  { label: 'GST (18%)', amount: '₹225' },
                  { label: 'Platform Fee', amount: '₹75' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{item.amount}</span>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</span>
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>₹1,249</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">Free cancellation</span> up to 30 minutes before pickup. No cancellation charges.
                </p>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-blue-900/20 dark:to-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100/50 dark:border-blue-800/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">24/7</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">24/7 Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Call +91 1800-123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <IoCheckmarkCircle size={20} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Safety First</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified drivers & sanitized cars</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Live Chat Support
              </button>
            </div>

            {/* Driver Info Preview */}
            {activeStep >= 3 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40 dark:border-gray-700/40">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Driver</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold text-xl">
                    RK
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Rajesh Kumar</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">4.9 • 2,347 rides</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Toyota Innova • White • MH 01 AB 1234</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;