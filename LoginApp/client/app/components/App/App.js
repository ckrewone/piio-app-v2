import React, { Component } from 'react';

import Footer from '../Footer/Footer';


const App = ({ children }) => (
     <div className="bg">

          <main>
               {children}
          </main>

          <Footer />
     </div>
);

export default App;
