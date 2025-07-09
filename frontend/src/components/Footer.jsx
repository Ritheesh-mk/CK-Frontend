
export const KolamPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M20,20 Q40,10 60,20 T100,20" stroke="#ffffff" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="3" fill="#ffffff" />
      <path d="M20,80 Q40,90 60,80 T100,80" stroke="#ffffff" strokeWidth="0.5" fill="none" />
      <path d="M20,30 L30,40 L40,30 L50,40 L60,30 L70,40 L80,30" stroke="#ffffff" strokeWidth="0.5" fill="none" />
      <path d="M20,70 L30,60 L40,70 L50,60 L60,70 L70,60 L80,70" stroke="#ffffff" strokeWidth="0.5" fill="none" />
    </svg>
  );
const Footer=()=>{

    return(
        <>
          <footer id="contact" className="bg-gradient-to-b from-emerald-800 to-emerald-900 text-white pt-16 pb-8 relative">
        <KolamPattern/>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Aaru Agencies</h3>
              <p className="mb-4">
                Providing authentic Indian spices and masalas since 1995. 
                Our commitment to quality and tradition has made us a trusted name.
              </p>
              <div className="flex items-center mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>3/128 VKR Gate Pannimadai(post), Coimbatore - 641017 India</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-300 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#popular-products" className="hover:text-emerald-300 transition-colors">Products</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-emerald-300 transition-colors">Contact</a>
                </li>
                <li>
                  <button onClick={() =>{}} className="hover:text-emerald-300 transition-colors text-left w-full">
                    Bulk Orders
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Contact Information */}
            <div>
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 97870 01188</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>aaruagencies@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span>+91 97870 01188 (WhatsApp)</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <h4 className="text-lg font-bold mb-3">Business Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <p>Sunday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
            
            {/* WhatsApp Contact */}
            <div>
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl p-6 border border-emerald-600">
                <h4 className="text-xl font-bold mb-4">Place Order via WhatsApp</h4>
                <p className="mb-4">
                  Message us directly on WhatsApp for quick orders and inquiries.
                </p>
                <a 
                  href="https://wa.me/919787001188?text=Hello, I'm interested in your products"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-emerald-700 mt-12 pt-6 text-center text-emerald-300">
            <p>© {new Date().getFullYear()} Aaru Agencies. All rights reserved.</p>
            <p className="mt-2">Authentic Indian Spices & Masalas</p>
            <p className="mt-1 text-emerald-400">தமிழ்நாட்டின் சுவையான மசாலாப் பொருட்கள்</p>
          </div>
        </div>
      </footer>
        </>
    )
}
export default Footer;  