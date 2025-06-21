import React from 'react';
import APODViewer from './components/APODViewer';
import MarsPhotos from './components/MarsPhotos';
import NEOList from './components/NEOList';
import EPICGallery from './components/EPICGallery';
import Header from './components/Header';
import Footer from './components/Footer';
import NEOChart from './components/NEOChart';
function App() {
  return (
    <div>
      <Header />
      <APODViewer />
      <MarsPhotos />
      <NEOList />
      <NEOChart />
      <EPICGallery />
      <Footer />
    </div>
  );
}

export default App;
