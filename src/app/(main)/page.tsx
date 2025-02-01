import BenefitsSection from './components/sections/BenefitsSection';
import LandingSection from './components/sections/LandingSection/LandingSection';
import ProgramsSection from './components/sections/ProgramsSection';
import SignupSection from './components/sections/SignupSection';
import UpcomingPrograms from './components/sections/UpcomingPrograms';

export default function Home() {
  return (
    <>
      <LandingSection />
      <ProgramsSection />
      <UpcomingPrograms />
      <BenefitsSection />
      <SignupSection />
    </>
  );
}
