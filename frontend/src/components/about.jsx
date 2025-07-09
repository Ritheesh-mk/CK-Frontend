import React from 'react';
import { Award, Leaf, Users, ChefHat, Globe, Star, Shield } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center z-0"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 rounded-full shadow-xl">
                <Star className="h-5 w-5 mr-3 text-yellow-300" />
                <span className="font-bold tracking-wider">PREMIUM INDIAN SPICES</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="block text-yellow-300">
                  Authentic
                </span>
                <span className="block text-white mt-2">Flavors of</span>
                <span className="block text-yellow-300 mt-2">INDIA</span>
              </h1>
              
              <p className="text-xl text-emerald-100 max-w-2xl leading-relaxed">
                C.K Masala - Where tradition meets perfection. Experience premium Indian spices, meticulously crafted for discerning palates worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-emerald-400/20">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-bold text-white text-sm">100% Pure</div>
                    <div className="text-emerald-100 text-xs">No Additives</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-emerald-400/20">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="font-bold text-white text-sm">Award Winning</div>
                    <div className="text-emerald-100 text-xs">Quality Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>
                
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-square bg-gray-200 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <ChefHat className="h-16 w-16 text-emerald-700 mx-auto mb-3" />
                      <span className="text-emerald-800 font-bold">Premium Spices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-emerald-800 mb-4">
            Why Choose C.K Masala
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what sets us apart in the spice industry
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">Farm-Fresh Quality</h3>
            <p className="text-gray-600">Direct partnerships with premium farms ensure the freshest, highest-quality ingredients.</p>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">Quality Assured</h3>
            <p className="text-gray-600">Rigorous testing and quality control ensure every package meets premium standards.</p>
          </div>
          
          <div className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-8 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3">Global Trust</h3>
            <p className="text-gray-600">Trusted by customers worldwide, bringing authentic Indian flavors globally.</p>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-700 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-yellow-300/50 transition-all">
                <div className="text-4xl font-black text-yellow-300 mb-2">50K+</div>
                <div className="text-lg font-bold text-white mb-1">Happy Customers</div>
                <p className="text-emerald-100 text-sm">Worldwide</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-yellow-300/50 transition-all">
                <div className="text-4xl font-black text-yellow-300 mb-2">100%</div>
                <div className="text-lg font-bold text-white mb-1">Pure & Natural</div>
                <p className="text-emerald-100 text-sm">No Additives</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-yellow-300/50 transition-all">
                <div className="text-4xl font-black text-yellow-300 mb-2">25+</div>
                <div className="text-lg font-bold text-white mb-1">Spice Varieties</div>
                <p className="text-emerald-100 text-sm">Premium Range</p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:border-yellow-300/50 transition-all">
                <div className="text-4xl font-black text-yellow-300 mb-2">40+</div>
                <div className="text-lg font-bold text-white mb-1">Years Legacy</div>
                <p className="text-emerald-100 text-sm">Trusted Brand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-50 rounded-3xl p-12 border-4 border-emerald-200 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-500 text-white px-6 py-3 rounded-full mb-8 shadow-xl">
            <Users className="h-6 w-6 mr-3" />
            <span className="font-black">JOIN THE C.K MASALA FAMILY</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-emerald-800 mb-6">
            Experience the Difference
          </h3>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Discover why food enthusiasts and professional chefs worldwide choose C.K Masala for authentic Indian flavors.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-emerald-600" />
              <div className="text-left">
                <div className="font-black text-gray-900">Taste the Tradition</div>
                <div className="text-gray-600">Premium Quality</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-emerald-600" />
              <div className="text-left">
                <div className="font-black text-gray-900">Worldwide Trust</div>
                <div className="text-gray-600">Global Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;