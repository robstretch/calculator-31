import { Routes, Route } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { FinancialCalculators } from './pages/categories/FinancialCalculators';
import { HealthCalculators } from './pages/categories/HealthCalculators';
import { EducationCalculators } from './pages/categories/EducationCalculators';
import { MathCalculators } from './pages/categories/MathCalculators';
import { ConstructionCalculators } from './pages/categories/ConstructionCalculators';
import { SportsCalculators } from './pages/categories/SportsCalculators';
import { LifestyleCalculators } from './pages/categories/LifestyleCalculators';

// Import all calculator components
import { MortgageCalculator } from './pages/calculators/MortgageCalculator';
import { AutoLoanCalculator } from './pages/calculators/AutoLoanCalculator';
import { BMICalculator } from './pages/calculators/BMICalculator';
import { GradeCalculator } from './pages/calculators/GradeCalculator';
import { PaycheckCalculator } from './pages/calculators/PaycheckCalculator';
import { CalorieCalculator } from './pages/calculators/CalorieCalculator';
import { GPACalculator } from './pages/calculators/GPACalculator';
import { TaxCalculator } from './pages/calculators/TaxCalculator';
import { FractionCalculator } from './pages/calculators/FractionCalculator';
import { TimeCalculator } from './pages/calculators/TimeCalculator';
import { InflationCalculator } from './pages/calculators/InflationCalculator';
import { AgeCalculator } from './pages/calculators/AgeCalculator';
import { TipCalculator } from './pages/calculators/TipCalculator';
import { ConcreteCalculator } from './pages/calculators/ConcreteCalculator';
import { CDCalculator } from './pages/calculators/CDCalculator';
import { DerivativeCalculator } from './pages/calculators/DerivativeCalculator';
import { DueDateCalculator } from './pages/calculators/DueDateCalculator';
import { TDEECalculator } from './pages/calculators/TDEECalculator';
import { SquareFootageCalculator } from './pages/calculators/SquareFootageCalculator';
import { MortgagePayoffCalculator } from './pages/calculators/MortgagePayoffCalculator';
import { OneRepMaxCalculator } from './pages/calculators/OneRepMaxCalculator';
import { HelocCalculator } from './pages/calculators/HelocCalculator';
import { SnowDayCalculator } from './pages/calculators/SnowDayCalculator';
import { RothIraCalculator } from './pages/calculators/RothIraCalculator';
import { GasCalculator } from './pages/calculators/GasCalculator';
import { BMRCalculator } from './pages/calculators/BMRCalculator';
import { BACCalculator } from './pages/calculators/BACCalculator';
import { MedianCalculator } from './pages/calculators/MedianCalculator';
import { BottleneckCalculator } from './pages/calculators/BottleneckCalculator';
import { BAHCalculator } from './pages/calculators/BAHCalculator';
import { RoundingCalculator } from './pages/calculators/RoundingCalculator';
import { ParlayCalculator } from './pages/calculators/ParlayCalculator';
import { RREFCalculator } from './pages/calculators/RREFCalculator';
import { TimeClockCalculator } from './pages/calculators/TimeClockCalculator';
import { SquareRootCalculator } from './pages/calculators/SquareRootCalculator';
import { OptionsProfitCalculator } from './pages/calculators/OptionsProfitCalculator';
import { BraSizeCalculator } from './pages/calculators/BraSizeCalculator';
import { DeathCalculator } from './pages/calculators/DeathCalculator';
import { GematriaCalculator } from './pages/calculators/GematriaCalculator';
import { RVLoanCalculator } from './pages/calculators/RVLoanCalculator';
import { BoatLoanCalculator } from './pages/calculators/BoatLoanCalculator';
import { PayRaiseCalculator } from './pages/calculators/PayRaiseCalculator';
import { NumerologyCalculator } from './pages/calculators/NumerologyCalculator';
import { PuppyWeightCalculator } from './pages/calculators/PuppyWeightCalculator';
import { MacroCalculator } from './pages/calculators/MacroCalculator';
import { BettingOddsCalculator } from './pages/calculators/BettingOddsCalculator';
import { MulchCalculator } from './pages/calculators/MulchCalculator';
import { APYCalculator } from './pages/calculators/APYCalculator';
import { HeightCalculator } from './pages/calculators/HeightCalculator';
import { OvulationCalculator } from './pages/calculators/OvulationCalculator';
import { ZScoreCalculator } from './pages/calculators/ZScoreCalculator';
import { MaxBenchCalculator } from './pages/calculators/MaxBenchCalculator';
import { A1CCalculator } from './pages/calculators/A1CCalculator';
import { DogPregnancyCalculator } from './pages/calculators/DogPregnancyCalculator';
import { CatAgeCalculator } from './pages/calculators/CatAgeCalculator';
import { WeddingAlcoholCalculator } from './pages/calculators/WeddingAlcoholCalculator';
import { DrywallCalculator } from './pages/calculators/DrywallCalculator';
import { PoolSaltCalculator } from './pages/calculators/PoolSaltCalculator';
import { ArrowSpeedCalculator } from './pages/calculators/ArrowSpeedCalculator';
import { ERACalculator } from './pages/calculators/ERACalculator';
import { GravelCalculator } from './pages/calculators/GravelCalculator';
import { PartialFractionCalculator } from './pages/calculators/PartialFractionCalculator';
import { FenceCalculator } from './pages/calculators/FenceCalculator';
import { LotteryTaxCalculator } from './pages/calculators/LotteryTaxCalculator';
import { DifferentialEquationCalculator } from './pages/calculators/DifferentialEquationCalculator';
import { StandardDeviationCalculator } from './pages/calculators/StandardDeviationCalculator';
import { StairCalculator } from './pages/calculators/StairCalculator';
import { MaleDelusionCalculator } from './pages/calculators/MaleDelusionCalculator';
import { PercentageCalculator } from './pages/calculators/PercentageCalculator';
import { GratuityCalculator } from './pages/calculators/GratuityCalculator';
import { CDInterestCalculator } from './pages/calculators/CDInterestCalculator';
import { SandCalculator } from './pages/calculators/SandCalculator';
import { SnowboardSizeCalculator } from './pages/calculators/SnowboardSizeCalculator';
import { WordleCalculator } from './pages/calculators/WordleCalculator';
import { AquariumCalculator } from './pages/calculators/AquariumCalculator';
import { VADisabilityCalculator } from './pages/calculators/VADisabilityCalculator';
import { PizzaDoughCalculator } from './pages/calculators/PizzaDoughCalculator';
import { GraduationYearCalculator } from './pages/calculators/GraduationYearCalculator';
import { LoveCalculator } from './pages/calculators/LoveCalculator';
import { SubnetCalculator } from './pages/calculators/SubnetCalculator';
import { TopsoilCalculator } from './pages/calculators/TopsoilCalculator';
import { MidpointCalculator } from './pages/calculators/MidpointCalculator';
import { SlopeCalculator } from './pages/calculators/SlopeCalculator';
import { SocialSecurityCalculator } from './pages/calculators/SocialSecurityCalculator';
import { InvestmentCalculator } from './pages/calculators/InvestmentCalculator';
import { IntegralCalculator } from './pages/calculators/IntegralCalculator';
import { TimeDurationCalculator } from './pages/calculators/TimeDurationCalculator';
import { FactoringCalculator } from './pages/calculators/FactoringCalculator';
import { PercentageIncreaseCalculator } from './pages/calculators/PercentageIncreaseCalculator';
import { FourOhOneKCalculator } from './pages/calculators/FourOhOneKCalculator';
import { CreditCardCalculator } from './pages/calculators/CreditCardCalculator';
import { OsrsSkillCalculator } from './pages/calculators/OsrsSkillCalculator';
import { GCDCalculator } from './pages/calculators/GCDCalculator';
import { ASQCalculator } from './pages/calculators/ASQCalculator';
import { VoriciCalculator } from './pages/calculators/VoriciCalculator';
import { MoonPhaseCalculator } from "./pages/calculators/MoonPhaseCalculator";
import { TattooCalculator } from "./pages/calculators/TattooCalculator";
import { RugCalculator } from "./pages/calculators/RugCalculator";
import { SpecificHeatCalculator } from "./pages/calculators/SpecificHeatCalculator";
import { RoofPitchCalculator } from "./pages/calculators/RoofPitchCalculator";
import { TScoreCalculator } from "./pages/calculators/TScoreCalculator";
import { AlimonyCalculator } from "./pages/calculators/AlimonyCalculator";
import { DiamondCalculator } from "./pages/calculators/DiamondCalculator";
import { PoolVolumeCalculator } from "./pages/calculators/PoolVolumeCalculator";
import { DogAgeCalculator } from "./pages/calculators/DogAgeCalculator";
import { IPCalculator } from "./pages/calculators/IPCalculator";
import { PHCalculator } from "./pages/calculators/PHCalculator";
import { XInterceptCalculator } from "./pages/calculators/XInterceptCalculator";
import { LHopitalCalculator } from "./pages/calculators/LHopitalCalculator";
import { BloodTypeCalculator } from "./pages/calculators/BloodTypeCalculator";
import { MotorcycleLoanCalculator } from "./pages/calculators/MotorcycleLoanCalculator";
import { PeptideCalculator } from "./pages/calculators/PeptideCalculator";
import { BattingAverageCalculator } from "./pages/calculators/BattingAverageCalculator";
import { GoldenRatioCalculator } from "./pages/calculators/GoldenRatioCalculator";
import { HeightPercentileCalculator } from "./pages/calculators/HeightPercentileCalculator";
import { VertexCalculator } from "./pages/calculators/VertexCalculator";
import { FiberCalculator } from "./pages/calculators/FiberCalculator";
import { CaffeineCalculator } from "./pages/calculators/CaffeineCalculator";
import { AtomicMassCalculator } from "./pages/calculators/AtomicMassCalculator";
import { CentroidCalculator } from "./pages/calculators/CentroidCalculator";
import { BabyEyeColorCalculator } from "./pages/calculators/BabyEyeColorCalculator";
import { SATCalculator } from "./pages/calculators/SATCalculator";
import { SimpsonsRuleCalculator } from "./pages/calculators/SimpsonsRuleCalculator";
import { ProRataCalculator } from "./pages/calculators/ProRataCalculator";
import { CookingCalculator } from "./pages/calculators/CookingCalculator";
import { InflectionPointCalculator } from "./pages/calculators/InflectionPointCalculator";
import { ProjectileMotionCalculator } from "./pages/calculators/ProjectileMotionCalculator";
import { FOILCalculator } from "./pages/calculators/FOILCalculator";
import { WPMCalculator } from "./pages/calculators/WPMCalculator";
import { DownloadTimeCalculator } from "./pages/calculators/DownloadTimeCalculator";
import { ChemistryCalculator } from './pages/calculators/ChemistryCalculator';
import { BlackjackCalculator } from './pages/calculators/BlackjackCalculator';
import { PlantSpacingCalculator } from './pages/calculators/PlantSpacingCalculator';
import { MoleCalculator } from './pages/calculators/MoleCalculator';
import { ProteinCalculator } from './pages/calculators/ProteinCalculator';
import { StampDutyCalculator } from './pages/calculators/StampDutyCalculator';
import { MaintenanceCalorieCalculator } from './pages/calculators/MaintenanceCalorieCalculator';
import { BulkingCalculator } from './pages/calculators/BulkingCalculator';
import { GearRatioCalculator } from './pages/calculators/GearRatioCalculator';
import { LBMCalculator } from './pages/calculators/LBMCalculator';
import { CAGRCalculator } from './pages/calculators/CAGRCalculator';
import { CuttingCalculator } from './pages/calculators/CuttingCalculator';
import { WeddingCashGiftCalculator } from './pages/calculators/WeddingCashGiftCalculator';
import { DINCalculator } from './pages/calculators/DINCalculator';
import { AreaBetweenCurvesCalculator } from './pages/calculators/AreaBetweenCurvesCalculator';
import { DuctCalculator } from './pages/calculators/DuctCalculator';
import { PaverCalculator } from './pages/calculators/PaverCalculator';
import { BiologicalAgeCalculator } from './pages/calculators/BiologicalAgeCalculator';
import { FactorioCalculator } from './pages/calculators/FactorioCalculator';
import { TreeRemovalCalculator } from './pages/calculators/TreeRemovalCalculator';
import { HeronsCalculator } from './pages/calculators/HeronsCalculator';
import { HoleCalculator } from './pages/calculators/HoleCalculator';
import { PokerOddsCalculator } from './pages/calculators/PokerOddsCalculator';
import { WronskianCalculator } from './pages/calculators/WronskianCalculator';
import { TorqueCalculator } from './pages/calculators/TorqueCalculator';
import { FogCalculator } from './pages/calculators/FogCalculator';
import { MortgagePointsCalculator } from './pages/calculators/MortgagePointsCalculator';
import { PregnancyCalculator } from './pages/calculators/PregnancyCalculator';
import { ConeCalculator } from './pages/calculators/ConeCalculator';

export function App() {
  return (
    <>
      <Helmet>
        <title>Calculator.info - Free Online Calculators</title>
        <meta name="description" content="Free online calculators for finance, health, education, math, and more. Easy to use and accurate calculations for all your needs." />
      </Helmet>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/all" element={<DirectoryPage />} />
          
          {/* Category Routes */}
          <Route path="/financial" element={<FinancialCalculators />} />
          <Route path="/health" element={<HealthCalculators />} />
          <Route path="/education" element={<EducationCalculators />} />
          <Route path="/math" element={<MathCalculators />} />
          <Route path="/construction" element={<ConstructionCalculators />} />
          <Route path="/sports" element={<SportsCalculators />} />
          <Route path="/lifestyle" element={<LifestyleCalculators />} />

          {/* Calculator Routes */}
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/auto-loan-calculator" element={<AutoLoanCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/grade-calculator" element={<GradeCalculator />} />
          <Route path="/paycheck-calculator" element={<PaycheckCalculator />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/gpa-calculator" element={<GPACalculator />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/fraction-calculator" element={<FractionCalculator />} />
          <Route path="/time-calculator" element={<TimeCalculator />} />
          <Route path="/inflation-calculator" element={<InflationCalculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          <Route path="/cd-calculator" element={<CDCalculator />} />
          <Route path="/derivative-calculator" element={<DerivativeCalculator />} />
          <Route path="/due-date-calculator" element={<DueDateCalculator />} />
          <Route path="/tdee-calculator" element={<TDEECalculator />} />
          <Route path="/square-footage-calculator" element={<SquareFootageCalculator />} />
          <Route path="/mortgage-payoff-calculator" element={<MortgagePayoffCalculator />} />
          <Route path="/one-rep-max-calculator" element={<OneRepMaxCalculator />} />
          <Route path="/heloc-calculator" element={<HelocCalculator />} />
          <Route path="/snow-day-calculator" element={<SnowDayCalculator />} />
          <Route path="/roth-ira-calculator" element={<RothIraCalculator />} />
          <Route path="/gas-calculator" element={<GasCalculator />} />
          <Route path="/bmr-calculator" element={<BMRCalculator />} />
          <Route path="/bac-calculator" element={<BACCalculator />} />
          <Route path="/median-calculator" element={<MedianCalculator />} />
          <Route path="/bottleneck-calculator" element={<BottleneckCalculator />} />
          <Route path="/bah-calculator" element={<BAHCalculator />} />
          <Route path="/rounding-calculator" element={<RoundingCalculator />} />
          <Route path="/parlay-calculator" element={<ParlayCalculator />} />
          <Route path="/rref-calculator" element={<RREFCalculator />} />
          <Route path="/time-clock-calculator" element={<TimeClockCalculator />} />
          <Route path="/square-root-calculator" element={<SquareRootCalculator />} />
          <Route path="/options-profit-calculator" element={<OptionsProfitCalculator />} />
          <Route path="/bra-size-calculator" element={<BraSizeCalculator />} />
          <Route path="/death-calculator" element={<DeathCalculator />} />
          <Route path="/gematria-calculator" element={<GematriaCalculator />} />
          <Route path="/rv-loan-calculator" element={<RVLoanCalculator />} />
          <Route path="/boat-loan-calculator" element={<BoatLoanCalculator />} />
          <Route path="/pay-raise-calculator" element={<PayRaiseCalculator />} />
          <Route path="/numerology-calculator" element={<NumerologyCalculator />} />
          <Route path="/puppy-weight-calculator" element={<PuppyWeightCalculator />} />
          <Route path="/macro-calculator" element={<MacroCalculator />} />
          <Route path="/betting-odds-calculator" element={<BettingOddsCalculator />} />
          <Route path="/mulch-calculator" element={<MulchCalculator />} />
          <Route path="/apy-calculator" element={<APYCalculator />} />
          <Route path="/height-calculator" element={<HeightCalculator />} />
          <Route path="/ovulation-calculator" element={<OvulationCalculator />} />
          <Route path="/z-score-calculator" element={<ZScoreCalculator />} />
          <Route path="/max-bench-calculator" element={<MaxBenchCalculator />} />
          <Route path="/a1c-calculator" element={<A1CCalculator />} />
          <Route path="/dog-pregnancy-calculator" element={<DogPregnancyCalculator />} />
          <Route path="/cat-age-calculator" element={<CatAgeCalculator />} />
          <Route path="/wedding-alcohol-calculator" element={<WeddingAlcoholCalculator />} />
          <Route path="/drywall-calculator" element={<DrywallCalculator />} />
          <Route path="/pool-salt-calculator" element={<PoolSaltCalculator />} />
          <Route path="/arrow-speed-calculator" element={<ArrowSpeedCalculator />} />
          <Route path="/era-calculator" element={<ERACalculator />} />
          <Route path="/gravel-calculator" element={<GravelCalculator />} />
          <Route path="/partial-fraction-calculator" element={<PartialFractionCalculator />} />
          <Route path="/fence-calculator" element={<FenceCalculator />} />
          <Route path="/lottery-tax-calculator" element={<LotteryTaxCalculator />} />
          <Route path="/differential-equation-calculator" element={<DifferentialEquationCalculator />} />
          <Route path="/standard-deviation-calculator" element={<StandardDeviationCalculator />} />
          <Route path="/stair-calculator" element={<StairCalculator />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/male-delusion-calculator" element={<MaleDelusionCalculator />} />
          <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
          <Route path="/cd-interest-calculator" element={<CDInterestCalculator />} />
          <Route path="/sand-calculator" element={<SandCalculator />} />
          <Route path="/snowboard-size-calculator" element={<SnowboardSizeCalculator />} />
          <Route path="/wordle-calculator" element={<WordleCalculator />} />
          <Route path="/aquarium-calculator" element={<AquariumCalculator />} />
          <Route path="/va-disability-calculator" element={<VADisabilityCalculator />} />
          <Route path="/pizza-dough-calculator" element={<PizzaDoughCalculator />} />
          <Route path="/graduation-year-calculator" element={<GraduationYearCalculator />} />
          <Route path="/love-calculator" element={<LoveCalculator />} />
          <Route path="/subnet-calculator" element={<SubnetCalculator />} />
          <Route path="/topsoil-calculator" element={<TopsoilCalculator />} />
          <Route path="/midpoint-calculator" element={<MidpointCalculator />} />
          <Route path="/slope-calculator" element={<SlopeCalculator />} />
          <Route path="/social-security-calculator" element={<SocialSecurityCalculator />} />
          <Route path="/investment-calculator" element={<InvestmentCalculator />} />
          <Route path="/integral-calculator" element={<IntegralCalculator />} />
          <Route path="/time-duration-calculator" element={<TimeDurationCalculator />} />
          <Route path="/factoring-calculator" element={<FactoringCalculator />} />
          <Route path="/percentage-increase-calculator" element={<PercentageIncreaseCalculator />} />
          <Route path="/401k-calculator" element={<FourOhOneKCalculator />} />
          <Route path="/credit-card-calculator" element={<CreditCardCalculator />} />
          <Route path="/skill-calculator-osrs" element={<OsrsSkillCalculator />} />
          <Route path="/gcd-calculator" element={<GCDCalculator />} />
          <Route path="/asq-calculator" element={<ASQCalculator />} />
          <Route path="/vorici-calculator" element={<VoriciCalculator />} />
          <Route path="/moon-phase-calculator" element={<MoonPhaseCalculator />} />
          <Route path="/tattoo-calculator" element={<TattooCalculator />} />
          <Route path="/rug-calculator" element={<RugCalculator />} />
          <Route path="/specific-heat-calculator" element={<SpecificHeatCalculator />} />
          <Route path="/roof-pitch-calculator" element={<RoofPitchCalculator />} />
          <Route path="/t-score-calculator" element={<TScoreCalculator />} />
          <Route path="/alimony-calculator" element={<AlimonyCalculator />} />
          <Route path="/diamond-calculator" element={<DiamondCalculator />} />
          <Route path="/pool-volume-calculator" element={<PoolVolumeCalculator />} />
          <Route path="/dog-age-calculator" element={<DogAgeCalculator />} />
          <Route path="/ip-calculator" element={<IPCalculator />} />
          <Route path="/ph-calculator" element={<PHCalculator />} />
          <Route path="/x-intercept-calculator" element={<XInterceptCalculator />} />
          <Route path="/lhopital-calculator" element={<LHopitalCalculator />} />
          <Route path="/blood-type-calculator" element={<BloodTypeCalculator />} />
          <Route path="/motorcycle-loan-calculator" element={<MotorcycleLoanCalculator />} />
          <Route path="/peptide-calculator" element={<PeptideCalculator />} />
          <Route path="/batting-average-calculator" element={<BattingAverageCalculator />} />
          <Route path="/golden-ratio-calculator" element={<GoldenRatioCalculator />} />
          <Route path="/height-percentile-calculator" element={<HeightPercentileCalculator />} />
          <Route path="/vertex-calculator" element={<VertexCalculator />} />
          <Route path="/fiber-calculator" element={<FiberCalculator />} />
          <Route path="/caffeine-calculator" element={<CaffeineCalculator />} />
          <Route path="/atomic-mass-calculator" element={<AtomicMassCalculator />} />
          <Route path="/centroid-calculator" element={<CentroidCalculator />} />
          <Route path="/baby-eye-color-calculator" element={<BabyEyeColorCalculator />} />
          <Route path="/sat-calculator" element={<SATCalculator />} />
          <Route path="/pro-rata-calculator" element={<ProRataCalculator />} />
          <Route path="/simpsons-rule-calculator" element={<SimpsonsRuleCalculator />} />
          <Route path="/cooking-calculator" element={<CookingCalculator />} />
          <Route path="/inflection-point-calculator" element={<InflectionPointCalculator />} />
          <Route path="/projectile-motion-calculator" element={<ProjectileMotionCalculator />} />
          <Route path="/foil-calculator" element={<FOILCalculator />} />
          <Route path="/wpm-calculator" element={<WPMCalculator />} />
          <Route path="/download-time-calculator" element={<DownloadTimeCalculator />} />
          <Route path="/chemistry-calculator" element={<ChemistryCalculator />} />
          <Route path="/blackjack-calculator" element={<BlackjackCalculator />} />
          <Route path="/plant-spacing-calculator" element={<PlantSpacingCalculator />} />
          <Route path="/mole-calculator" element={<MoleCalculator />} />
          <Route path="/protein-calculator" element={<ProteinCalculator />} />
          <Route path="/stamp-duty-calculator" element={<StampDutyCalculator />} />
          <Route path="/maintenance-calorie-calculator" element={<MaintenanceCalorieCalculator />} />
          <Route path="/bulking-calculator" element={<BulkingCalculator />} />
          <Route path="/gear-ratio-calculator" element={<GearRatioCalculator />} />
          <Route path="/lbm-calculator" element={<LBMCalculator />} />
          <Route path="/cagr-calculator" element={<CAGRCalculator />} />
          <Route path="/cutting-calculator" element={<CuttingCalculator />} />
          <Route path="/wedding-cash-gift-calculator" element={<WeddingCashGiftCalculator />} />
          <Route path="/din-calculator" element={<DINCalculator />} />
          <Route path="/duct-calculator" element={<DuctCalculator />} />
          <Route path="/area-between-curves-calculator" element={<AreaBetweenCurvesCalculator />} />
          <Route path="/paver-calculator" element={<PaverCalculator />} />
          <Route path="/biological-age-calculator" element={<BiologicalAgeCalculator />} />
          <Route path="/factorio-calculator" element={<FactorioCalculator />} />
          <Route path="/tree-removal-calculator" element={<TreeRemovalCalculator />} />
          <Route path="/herons-calculator" element={<HeronsCalculator />} />
          <Route path="/hole-calculator" element={<HoleCalculator />} />
          <Route path="/poker-odds-calculator" element={<PokerOddsCalculator />} />
          <Route path="/wronskian-calculator" element={<WronskianCalculator />} />
          <Route path="/torque-calculator" element={<TorqueCalculator />} />
          <Route path="/fog-calculator" element={<FogCalculator />} />
          <Route path="/mortgage-points-calculator" element={<MortgagePointsCalculator />} />
          <Route path="/pregnancy-calculator" element={<PregnancyCalculator />} />
          <Route path="/cone-calculator" element={<ConeCalculator />} />
        </Routes>
      </Layout>
    </>
  );
}