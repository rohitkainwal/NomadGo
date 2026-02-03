import { useState } from 'react';
import { IoLocationSharp, IoCalendarOutline, IoPeopleOutline, IoCar, IoTimeOutline, IoSearch, IoChevronDown } from 'react-icons/io5';
import { MdSwapHoriz } from 'react-icons/md';
import { FaUmbrellaBeach } from 'react-icons/fa';

const FloatingBookingWidget = () => {
  const [activeTab, setActiveTab] = useState('Cabs');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    returnDate: '',
    guests: '2 Adults',
    rooms: '1 Room',
    cabType: 'One Way',
    travelers: '1 Traveler',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', activeTab, formData);
  };

  const swapLocations = () => {
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const tabs = [
    { id: 'Cabs', label: 'Cabs', icon: IoCar },
    { id: 'Packages', label: 'Holiday Packages', icon: FaUmbrellaBeach },
  ];

  // Reusable styling for all Input/Select fields
  const fieldClassName = `
    w-full pl-12 pr-4 py-3.5 
    bg-white/40 dark:bg-white/5 
    border border-white/40 dark:border-white/10 
    rounded-xl outline-none font-bold 
    text-gray-900 dark:text-white 
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    transition-all duration-300
    focus:bg-white/80 dark:focus:bg-white/10
    focus:ring-4 focus:ring-blue-500/10 
    hover:border-white/60 dark:hover:border-white/20
  `;

  const StepLabel = ({ num, text }) => (
    <div className="flex items-center gap-2 mb-2 ml-1">
      <span 
        className="flex items-center justify-center w-5 h-5 text-white rounded-md text-[10px] font-black shadow-md"
        style={{ backgroundColor: 'rgb(var(--color-primary))' }}
      >
        {num}
      </span>
      <span className="text-[11px] font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider font-inter">
        {text}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 font-inter antialiased">
      <div className="relative">
        
        {/* TABS SECTION */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-1.5 rounded-xl shadow-2xl border border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  isActive ? 'text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={isActive ? { backgroundColor: 'rgb(var(--color-primary))' } : {}}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* GLASS CARD CONTAINER */}
        <div className="relative overflow-hidden bg-white/70 dark:bg-black/60 backdrop-blur-2xl rounded-[24px] p-6 md:p-8 pt-16 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-white/40 dark:border-white/10 transition-all duration-500">
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'Cabs' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Cab Trip Type */}
                <div className="flex flex-wrap justify-center gap-8 mb-6 pb-6 border-b border-black/5 dark:border-white/5">
                  {['One Way', 'Round Trip', 'Hourly Rental'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="cabType"
                        checked={formData.cabType === type}
                        onChange={() => setFormData({...formData, cabType: type})}
                        className="w-5 h-5 accent-[rgb(var(--color-primary))] cursor-pointer"
                      />
                      <span className={`text-[15px] font-bold ${formData.cabType === type ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-3">
                    <StepLabel num="01" text="Pickup From" />
                    <div className="relative">
                      <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 z-10" size={20} />
                      <input
                        type="text"
                        placeholder="Enter City"
                        value={formData.from}
                        className={fieldClassName}
                        onChange={(e) => setFormData({...formData, from: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="hidden md:flex md:col-span-1 justify-center pb-1">
                    <button type="button" onClick={swapLocations} className="p-2.5 bg-white/80 dark:bg-white/10 rounded-lg shadow-md hover:scale-110 active:scale-95 transition-all border border-white/40">
                      <MdSwapHoriz size={24} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  <div className="md:col-span-3">
                    <StepLabel num="02" text="Drop To" />
                    <div className="relative">
                      <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 z-10" size={20} />
                      <input
                        type="text"
                        placeholder="Enter Destination"
                        value={formData.to}
                        className={fieldClassName}
                        onChange={(e) => setFormData({...formData, to: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <StepLabel num="03" text="Travel Date" />
                    <div className="relative">
                      <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={20} />
                      <input type="date" className={fieldClassName} />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <StepLabel num="04" text="Time" />
                    <div className="relative">
                      <IoTimeOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 z-10" size={20} />
                      <input type="time" className={fieldClassName} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* RESTORED: HOLIDAY PACKAGES SECTION */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <StepLabel num="01" text="Destination" />
                  <div className="relative">
                    <IoLocationSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={20} />
                    <input
                      type="text"
                      placeholder="Where to?"
                      className={fieldClassName}
                    />
                  </div>
                </div>

                <div>
                  <StepLabel num="02" text="Month of Travel" />
                  <div className="relative">
                    <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 z-10" size={20} />
                    <select className={`${fieldClassName} appearance-none cursor-pointer`}>
                      <option>February 2026</option>
                      <option>March 2026</option>
                    </select>
                    <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <StepLabel num="03" text="Duration" />
                  <div className="relative">
                    <IoTimeOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 z-10" size={20} />
                    <select className={`${fieldClassName} appearance-none cursor-pointer`}>
                      <option>3-5 Nights</option>
                      <option>6-9 Nights</option>
                    </select>
                    <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <StepLabel num="04" text="Travelers" />
                  <div className="relative">
                    <IoPeopleOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={22} />
                    <select className={`${fieldClassName} appearance-none cursor-pointer`}>
                      <option>2 Adults, 0 Children</option>
                      <option>Family (2A + 1C)</option>
                    </select>
                    <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* SEARCH BUTTON */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="group relative px-10 py-3.5 text-white font-bold rounded-xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-base flex items-center gap-3 overflow-hidden"
                style={{ backgroundColor: 'rgb(var(--color-primary))' }}
              >
                <IoSearch size={22} />
                <span className="uppercase tracking-tight">Search {activeTab}</span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 group-hover:animate-shine" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingBookingWidget;