import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Home } from 'lucide-react';
import '../styles/global.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'All Jobs', icon: <Home size={20} /> },
    { path: '/add-job', label: 'Add Job', icon: <Plus size={20} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-secondary-black border-b border-border-color shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-dark-green to-medium-green rounded-lg flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Job Portal</h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-dark-green text-white shadow-lg'
                      : 'text-text-gray hover:text-white hover:bg-secondary-black'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;