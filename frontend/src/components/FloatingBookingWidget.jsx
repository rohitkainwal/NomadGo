import { useState } from 'react';
import { 
  IoLocationSharp, 
  IoCalendarOutline, 
  IoPeopleOutline, 
  IoCar, 
  IoTimeOutline, 
  IoSearch, 
  IoChevronDown, 
  IoAirplaneOutline, 
  IoNavigateOutline,
  IoCalendar,
  IoPerson
} from 'react-icons/io5';
import { MdSwapHoriz, MdHotel } from 'react-icons/md';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { GiTravelDress } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const FloatingBookingWidget = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Local');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    returnDate: '',
    guests: '2 Adults',
    rooms: '1 Room',
    cabType: 'One Way',
    travelers: '1 Traveler',
    tripType: 'One Way',
    travelDate: '',
    travelTime: '',
    packageType: 'All',
    duration: '3-5 Days',
    budget: '₹15,000 - ₹25,000'
  });

  const tabs = [
    { id: 'Local', label: 'Local', icon: IoCar },
    { id: 'Airport', label: 'Airport', icon: IoAirplaneOutline },
    { id: 'Outstation', label: 'Outstation', icon: IoNavigateOutline },
    { id: 'Packages', label: 'Holiday', icon: FaUmbrellaBeach },
  ];

  const packageTypes = ['All', 'Beach', 'Hill Station', 'Heritage', 'Adventure'];
  const durations = ['3-5 Days', '5-7 Days', '7-10 Days', '10+ Days'];
  const budgets = ['₹10,000 - ₹15,000', '₹15,000 - ₹25,000', '₹25,000 - ₹40,000', '₹40,000+'];

  // Unified field styling
  const fieldClassName = `
    w-full pl-12 pr-4 py-3.5
    bg-white/70 dark:bg-gray-800/70
    border border-gray-300/50 dark:border-gray-700/50
    rounded-xl outline-none
    text-gray-800 dark:text-gray-100
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    transition-all duration-300
    focus:bg-white dark:focus:bg-gray-800
    focus:border-[rgb(var(--color-primary))]
    focus:shadow-lg focus:shadow-[rgb(var(--color-primary))]/10
    hover:border-gray-400 dark:hover:border-gray-500
    backdrop-blur-sm
    font-normal
  `;

  const selectClassName = `
    ${fieldClassName}
    appearance-none
    pr-10
    cursor-pointer
  `;

  const StepLabel = ({ num, text, active = true }) => (
    <div className="flex items-center gap-2 mb-2">
      <div className={`
        flex items-center justify-center w-5 h-5 
        rounded-lg text-[10px] font-medium
        transition-all duration-300
        ${active 
          ? 'text-white shadow-sm' 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
        }
      `}
      style={active ? { backgroundColor: 'rgb(var(--color-primary))' } : {}}
      >
        {num}
      </div>
      <span className={`
        text-[11px] font-medium uppercase tracking-wider
        transition-colors duration-300
        ${active 
          ? 'text-gray-700 dark:text-gray-200' 
          : 'text-gray-400 dark:text-gray-500'
        }
      `}>
        {text}
      </span>
    </div>
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If Holiday tab is selected, show coming soon message
    if (activeTab === 'Packages') {
      alert('🚧 Holiday packages coming soon! Currently focusing on taxi bookings.');
      // Optionally switch to Local tab
      setActiveTab('Local');
      return;
    }
    
    // Validate required fields for taxi booking
    if (!formData.from || !formData.to || !formData.pickupDate || !formData.travelTime) {
      alert('⚠️ Please fill all required fields: Pickup, Dropoff, Date, and Time');
      return;
    }
    
    // Prepare data for navigation
    const bookingData = {
      type: activeTab.toLowerCase(), // 'local', 'airport', 'outstation'
      from: formData.from,
      to: formData.to,
      pickupDate: formData.pickupDate,
      travelTime: formData.travelTime,
      travelers: parseInt(formData.travelers.split(' ')[0]), // Extract number from "1 Traveler"
      cabType: formData.cabType,
      journeyType: formData.cabType === 'Round Trip' ? 'round_trip' : 'one_way'
    };
    
    // Navigate to booking page with data
    navigate('/booking', { state: bookingData });
    
    // Optional: Clear form after submission
    setFormData({
      ...formData,
      from: '',
      to: '',
      pickupDate: '',
      travelTime: ''
    });
  };

  // Get current date for min date restriction
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const renderRideBooking = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Trip Type Selection */}
      <div className="flex justify-center gap-8 mb-6">
        {['One Way', 'Round Trip'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFormData({...formData, cabType: type})}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl
              text-sm font-medium transition-all duration-300
              ${formData.cabType === type 
                ? 'text-white shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }
            `}
            style={formData.cabType === type ? { 
              backgroundColor: 'rgb(var(--color-primary))',
              boxShadow: '0 4px 20px rgba(var(--color-primary), 0.3)'
            } : {}}
          >
            <div className={`
              w-3 h-3 rounded-full border-2 transition-all duration-300
              ${formData.cabType === type 
                ? 'border-white bg-white/20' 
                : 'border-gray-300 dark:border-gray-600'
              }
            `}>
              {formData.cabType === type && (
                <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto mt-0.5" />
              )}
            </div>
            {type}
          </button>
        ))}
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Pickup Location */}
        <div className="md:col-span-3">
          <StepLabel num="01" text="Pickup" />
          <div className="relative group">
            <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="text" 
              placeholder="Enter pickup location" 
              className={fieldClassName}
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex md:col-span-1 justify-center pb-2">
          <button 
            type="button"
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors duration-300 group"
            onClick={() => setFormData({...formData, from: formData.to, to: formData.from})}
          >
            <MdSwapHoriz size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
          </button>
        </div>

        {/* Drop Location */}
        <div className="md:col-span-3">
          <StepLabel num="02" text="Drop" />
          <div className="relative group">
            <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="text" 
              placeholder="Enter destination" 
              className={fieldClassName}
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Date */}
        <div className="md:col-span-2">
          <StepLabel num="03" text="Date" />
          <div className="relative group">
            <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="date" 
              className={fieldClassName}
              value={formData.pickupDate}
              onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
              min={getTodayDate()}
              required
            />
          </div>
        </div>

        {/* Time */}
        <div className="md:col-span-2">
          <StepLabel num="04" text="Time" />
          <div className="relative group">
            <IoTimeOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="time" 
              className={fieldClassName}
              value={formData.travelTime}
              onChange={(e) => setFormData({...formData, travelTime: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="md:col-span-1">
          <StepLabel num="05" text="Travelers" />
          <div className="relative group">
            <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-hover:scale-110 transition-transform" size={18} />
            <select 
              className={selectClassName}
              value={formData.travelers}
              onChange={(e) => setFormData({...formData, travelers: e.target.value})}
              required
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={`${num} Traveler${num > 1 ? 's' : ''}`}>
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPackageBooking = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div>
          <StepLabel num="01" text="Destination" />
          <div className="relative group">
            <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="text" 
              placeholder="Where to?" 
              className={fieldClassName}
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
            />
          </div>
        </div>

        {/* Package Type */}
        <div>
          <StepLabel num="02" text="Package Type" />
          <div className="relative group">
            <GiTravelDress className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 group-hover:scale-110 transition-transform" size={18} />
            <select 
              className={selectClassName}
              value={formData.packageType}
              onChange={(e) => setFormData({...formData, packageType: e.target.value})}
            >
              {packageTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Duration */}
        <div>
          <StepLabel num="03" text="Duration" />
          <div className="relative group">
            <IoCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-hover:scale-110 transition-transform" size={18} />
            <select 
              className={selectClassName}
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            >
              {durations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Budget */}
        <div>
          <StepLabel num="04" text="Budget" />
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 group-hover:scale-110 transition-transform">₹</div>
            <select 
              className={selectClassName}
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            >
              {budgets.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Travel Details Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Travel Date */}
        <div>
          <StepLabel num="05" text="Travel Date" />
          <div className="relative group">
            <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-hover:scale-110 transition-transform" size={18} />
            <input 
              type="date" 
              className={fieldClassName}
              value={formData.travelDate}
              onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
              min={getTodayDate()}
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <StepLabel num="06" text="Guests" />
          <div className="relative group">
            <IoPeopleOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-hover:scale-110 transition-transform" size={18} />
            <select 
              className={selectClassName}
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            >
              {['1 Adult', '2 Adults', '3 Adults', '4 Adults', '5+ Adults'].map(guest => (
                <option key={guest} value={guest}>{guest}</option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Rooms */}
        <div>
          <StepLabel num="07" text="Rooms" />
          <div className="relative group">
            <MdHotel className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 group-hover:scale-110 transition-transform" size={18} />
            <select 
              className={selectClassName}
              value={formData.rooms}
              onChange={(e) => setFormData({...formData, rooms: e.target.value})}
            >
              {['1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5+ Rooms'].map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
            <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 font-sans antialiased mt-32 relative">
      {/* Floating Tabs */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50">
        <div className="flex bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-1.5 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl 
                  text-sm font-medium transition-all duration-400
                  ${isActive 
                    ? 'text-white shadow-lg transform -translate-y-0.5' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }
                `}
                style={isActive ? { 
                  backgroundColor: 'rgb(var(--color-primary))',
                  boxShadow: '0 4px 20px rgba(var(--color-primary), 0.3)'
                } : {}}
              >
                <Icon size={18} className={`${isActive ? 'opacity-100' : 'text-gray-500 dark:text-gray-400'} transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Glass Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-10 pt-20 shadow-2xl border border-gray-200/50 dark:border-gray-700/30 transition-all duration-500">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.02] pointer-events-none" />
        
        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {activeTab !== 'Packages' ? renderRideBooking() : renderPackageBooking()}

          {/* Search Button */}
          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="group relative px-12 py-4 text-white font-medium rounded-2xl shadow-xl transition-all duration-400 hover:shadow-2xl hover:scale-[1.02] active:scale-95 text-base flex items-center gap-3 overflow-hidden"
              style={{ 
                backgroundColor: 'rgb(var(--color-primary))',
                boxShadow: '0 6px 25px rgba(var(--color-primary), 0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <IoSearch size={20} className="relative z-10 transition-transform group-hover:scale-110" />
              <span className="relative z-10 uppercase tracking-widest font-semibold text-sm">
                {activeTab === 'Packages' ? 'Search Packages' : 'Proceed to Book'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Add this to your global CSS */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(var(--color-primary), 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--color-primary), 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .dark .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(var(--color-primary), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--color-primary), 0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default FloatingBookingWidget;