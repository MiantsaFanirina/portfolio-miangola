import { Hero } from '../../components/Hero/Hero';
import { Statement } from '../../components/Statement/Statement';
import { SelectedWork } from '../../components/SelectedWork/SelectedWork';
import { Immersive } from '../../components/Immersive/Immersive';
import { Bento } from '../../components/Bento/Bento';
import { Editorial } from '../../components/Editorial/Editorial';
import { About } from '../../components/About/About';
import { Services } from '../../components/Services/Services';
import { Contact } from '../../components/Contact/Contact';

export function Home() {
  return (
    <main className="page-enter">
      <Hero />
      <Statement />
      <SelectedWork />
      <Immersive />
      <Bento />
      <Editorial />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
