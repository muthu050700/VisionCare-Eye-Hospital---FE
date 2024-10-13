import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">Eye Hospital</h2>
            <p className="mt-2 text-sm">
              Your vision is our priority. Providing quality eye care services
              for all ages.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 md:mb-0">
            <div>
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="mt-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Services</h3>
              <ul className="mt-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Eye Exams
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Surgery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Pediatrics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Vision Therapy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Contact Us</h3>
              <ul className="mt-2">
                <li>
                  <a href="tel:+1234567890" className="hover:text-blue-300">
                    +1 234 567 890
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@eyehospital.com"
                    className="hover:text-blue-300"
                  >
                    info@eyehospital.com
                  </a>
                </li>
                <li>123 Eye St, Vision City</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-6 border-t border-blue-400 pt-6">
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="hover:text-blue-300">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
          </div>
          <p className="mt-4 text-center text-sm">
            © {new Date().getFullYear()} Eye Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
