import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HousePage from './pages/HousePage'
import RoomPage from './pages/RoomPage'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room" element={<RoomPage />} />
        <Route path="/house" element={<HousePage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
