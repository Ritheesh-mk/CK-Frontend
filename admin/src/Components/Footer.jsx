
export const KolamPattern = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" 
    viewBox="0 0 200 200" 
    preserveAspectRatio="xMidYMid slice"
  >
   
    {Array.from({ length: 120 }, (_, i) => {
      const x = (i * 41) % 200;
      const y = (i * 67) % 200;
      const size = 0.8 + (i % 3) * 0.7;
      const spiceColors = ['#ffd700', '#ff6347', '#ffa500', '#ff4444', '#ffb347', '#ffd700'];
      const color = spiceColors[i % spiceColors.length];
      return (
        <circle 
          key={`spice-${i}`}
          cx={x} 
          cy={y} 
          r={size} 
          fill={color} 
          opacity="0.6"
        />
      );
    })}

    
    <g transform="translate(100,100)">
      
      {Array.from({ length: 18 }, (_, i) => {
        const angle = (i * 20) * Math.PI / 180;
        const radius = 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <g key={`outer-spice-${i}`} transform={`translate(${x},${y}) rotate(${i * 20})`}>
            <ellipse cx="0" cy="0" rx="5" ry="2.5" fill="#ffd700" opacity="0.8"/>
            <ellipse cx="0" cy="0" rx="3" ry="1.5" fill="#ffa500" opacity="0.9"/>
            <circle cx="0" cy="0" r="1" fill="#ff6347" opacity="0.7"/>
          </g>
        );
      })}

     
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i * 25.7) * Math.PI / 180;
        const radius = 32;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <g key={`middle-spice-${i}`} transform={`translate(${x},${y})`}>
            <path 
              d="M-3,-4 Q0,-7 3,-4 Q5,0 3,4 Q0,7 -3,4 Q-5,0 -3,-4" 
              fill="#ff6347" 
              opacity="0.8"
            />
            <circle cx="0" cy="0" r="2" fill="#ffb347" opacity="0.7"/>
            <circle cx="0" cy="0" r="1" fill="#ffd700" opacity="0.9"/>
          </g>
        );
      })}

      
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 36) * Math.PI / 180;
        const radius = 16;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <g key={`inner-spice-${i}`}>
            <circle cx={x} cy={y} r="2.5" fill="#ffa500" opacity="0.8"/>
            <circle cx={x} cy={y} r="1.5" fill="#ffd700" opacity="0.9"/>
          </g>
        );
      })}

      {/* Central golden burst */}
      <circle cx="0" cy="0" r="8" fill="none" stroke="#ffd700" strokeWidth="2.5" opacity="0.7"/>
      <circle cx="0" cy="0" r="5" fill="#ffa500" opacity="0.5"/>
      <circle cx="0" cy="0" r="2" fill="#ffb347" opacity="0.8"/>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = Math.cos(angle) * 6;
        const y = Math.sin(angle) * 6;
        return <circle key={`center-${i}`} cx={x} cy={y} r="1.2" fill="#ffd700" opacity="0.9"/>;
      })}
    </g>

    {/* Golden masala powder swirls - perfect for green */}
    <path 
      d="M15,25 Q45,5 75,25 Q105,45 135,25 Q165,5 195,25" 
      stroke="#ffd700" 
      strokeWidth="3" 
      fill="none" 
      opacity="0.4"
    />
    <path 
      d="M5,55 Q35,35 65,55 Q95,75 125,55 Q155,35 185,55" 
      stroke="#ffa500" 
      strokeWidth="2.5" 
      fill="none" 
      opacity="0.5"
    />
    <path 
      d="M25,85 Q55,105 85,85 Q115,65 145,85 Q175,105 200,85" 
      stroke="#ffb347" 
      strokeWidth="3" 
      fill="none" 
      opacity="0.4"
    />
    <path 
      d="M5,115 Q35,135 65,115 Q95,95 125,115 Q155,135 185,115" 
      stroke="#ff6347" 
      strokeWidth="2.5" 
      fill="none" 
      opacity="0.5"
    />
    <path 
      d="M15,145 Q45,125 75,145 Q105,165 135,145 Q165,125 195,145" 
      stroke="#ffb347" 
      strokeWidth="3" 
      fill="none" 
      opacity="0.4"
    />
    <path 
      d="M5,175 Q35,155 65,175 Q95,195 125,175 Q155,155 185,175" 
      stroke="#ffbb33" 
      strokeWidth="2.5" 
      fill="none" 
      opacity="0.5"
    />

    {/* Corner golden spice clusters */}
    {[
      { x: 30, y: 30 },
      { x: 170, y: 30 },
      { x: 170, y: 170 },
      { x: 30, y: 170 }
    ].map((corner, i) => (
      <g key={`corner-cluster-${i}`} transform={`translate(${corner.x},${corner.y})`}>
        {Array.from({ length: 12 }, (_, j) => {
          const angle = (j * 30) * Math.PI / 180;
          const radius = 6 + (j % 4) * 3;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const colors = ['#ffd700', '#ffa500', '#ffb347', '#ff6347'];
          return (
            <circle 
              key={`cluster-${j}`}
              cx={x} 
              cy={y} 
              r="2" 
              fill={colors[j % colors.length]} 
              opacity="0.7"
            />
          );
        })}
        {/* Central bright spot */}
        <circle cx="0" cy="0" r="3" fill="#ffdd44" opacity="0.6"/>
      </g>
    ))}

    {/* Spice trail effects - golden streams */}
    {Array.from({ length: 25 }, (_, i) => {
      const x1 = (i * 43) % 180 + 10;
      const y1 = (i * 71) % 180 + 10;
      const x2 = x1 + 20;
      const y2 = y1 + 12;
      const colors = ['#ffd700', '#ffa500', '#ffb347', '#ff6347'];
      return (
        <line 
          key={`trail-${i}`}
          x1={x1} 
          y1={y1} 
          x2={x2} 
          y2={y2} 
          stroke={colors[i % colors.length]} 
          strokeWidth="1.2" 
          opacity="0.4"
        />
      );
    })}

    {/* Golden masala powder clouds */}
    {Array.from({ length: 8 }, (_, i) => {
      const cx = 25 + i * 22;
      const cy = 35 + (i % 3) * 60;
      return (
        <g key={`cloud-${i}`}>
          <ellipse cx={cx} cy={cy} rx="12" ry="6" fill="#ffbb33" opacity="0.2"/>
          <ellipse cx={cx-3} cy={cy-2} rx="8" ry="4" fill="#ffa500" opacity="0.15"/>
          <ellipse cx={cx+3} cy={cy+2} rx="6" ry="3" fill="#ffd700" opacity="0.25"/>
        </g>
      );
    })}

    {/* Additional sparkle effects for richness */}
    {Array.from({ length: 40 }, (_, i) => {
      const x = (i * 59) % 200;
      const y = (i * 83) % 200;
      const size = 0.3 + (i % 2) * 0.4;
      return (
        <circle 
          key={`sparkle-${i}`}
          cx={x} 
          cy={y} 
          r={size} 
          fill="#ffffcc" 
          opacity="0.8"
        />
      );
    })}

    {/* Flowing spice streams */}
    <path 
      d="M0,40 Q50,20 100,40 Q150,60 200,40" 
      stroke="#ffcc00" 
      strokeWidth="1.5" 
      fill="none" 
      opacity="0.3"
      strokeDasharray="3,2"
    />
    <path 
      d="M0,80 Q50,100 100,80 Q150,60 200,80" 
      stroke="#ffaa00" 
      strokeWidth="1.5" 
      fill="none" 
      opacity="0.3"
      strokeDasharray="3,2"
    />
    <path 
      d="M0,120 Q50,100 100,120 Q150,140 200,120" 
      stroke="#ffcc00" 
      strokeWidth="1.5" 
      fill="none" 
      opacity="0.3"
      strokeDasharray="3,2"
    />
    <path 
      d="M0,160 Q50,180 100,160 Q150,140 200,160" 
      stroke="#ffaa00" 
      strokeWidth="1.5" 
      fill="none" 
      opacity="0.3"
      strokeDasharray="3,2"
    />
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
                <span>No.5, Muthu Veethi, Girimariamman Kovil Street, Peelamedu, Coimbatore – 641 004.</span>
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
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.极4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91 97870 01188</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@aarums.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-emerald-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span>+91 90354 98000 (WhatsApp)</span>
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
                  href="https://wa.me/919034598000?text=Hello, I'm interested in your products"
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