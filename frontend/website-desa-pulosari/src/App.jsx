import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainRoute from "./routes/MainRoute";
import HomePage from "./pages/Homepage";
import KontakPage from "./pages/KontakPage";
import VisiMisiPage from "./pages/VisiMisiPage";
import PetaDesaPage from "./pages/PetaDesaPage";
import SejarahPage from "./pages/SejarahPage";
import PerangkatDesaPage from "./pages/PerangkatDesaPage";
import StrukturOrganisasiPage from "./pages/StrukturOrganisasiPage";
import PotensiAlamPage from "./pages/PotensiAlamPage";
import ProdukDesaPage from "./pages/ProdukDesaPage";
import BeritaDesaPage from "./pages/BeritaDesaPage";
import BeritaDesaDetail from "./pages/BeritaDesaDetail";
import GaleriDesaPage from "./pages/GaleriDesaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/visi-misi" element={<VisiMisiPage />} />
          <Route path="/peta-desa" element={<PetaDesaPage />} />
          <Route path="/sejarah" element={<SejarahPage />} />
          <Route path="/perangkat-desa" element={<PerangkatDesaPage />} />
          <Route
            path="/struktur-organisasi"
            element={<StrukturOrganisasiPage />}
          />
          <Route path="/potensi-alam" element={<PotensiAlamPage />} />
          <Route path="/produk-desa" element={<ProdukDesaPage />} />
          <Route path="/berita-desa" element={<BeritaDesaPage />} />
          <Route path="/berita-desa/:id" element={<BeritaDesaDetail />} />
          <Route path="/galeri-desa" element={<GaleriDesaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
