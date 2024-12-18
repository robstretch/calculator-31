import { 
  Calculator, DollarSign, Car, Scale, GraduationCap, 
  Construction, Target, Skull, Cpu, Anchor, Fuel,
  Baby, Clock, Briefcase, Apple, Home, Building2, Dna, Gem,
  TrendingUp, Snowflake, Dog, Trees, Activity, Ruler, Moon, Coffee, Atom, Move,
  Calendar, Dumbbell, Cat, Wine, Waves, ArrowDownRight, Heart, Network,
  Brain, Eye
} from 'lucide-react';

export const categories = [
  {
    title: "Financial Calculators",
    path: "/financial",
    calculators: [
      {
        title: "Pro Rata Calculator",
        description: "Calculate share offering rights and dilution effects.",
        path: "/pro-rata-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Mortgage Calculator",
        description: "Calculate monthly mortgage payments and total interest.",
        path: "/mortgage-calculator",
        icon: <Home className="h-6 w-6" />
      },
      {
        title: "Mortgage Points Calculator",
        description: "Calculate if buying mortgage points is worth it.",
        path: "/mortgage-points-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Auto Loan Calculator",
        description: "Calculate car loan payments and total costs.",
        path: "/auto-loan-calculator",
        icon: <Car className="h-6 w-6" />
      },
      {
        title: "CD Interest Calculator",
        description: "Calculate CD returns and interest earnings.",
        path: "/cd-interest-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Paycheck Calculator",
        description: "Calculate take-home pay after taxes and deductions.",
        path: "/paycheck-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Tax Calculator",
        description: "Calculate income tax and effective tax rate.",
        path: "/tax-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "CD Calculator",
        description: "Calculate CD returns and interest earnings.",
        path: "/cd-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "HELOC Calculator",
        description: "Calculate home equity line of credit payments.",
        path: "/heloc-calculator",
        icon: <Home className="h-6 w-6" />
      },
      {
        title: "Mortgage Payoff Calculator",
        description: "Calculate mortgage payoff with extra payments.",
        path: "/mortgage-payoff-calculator",
        icon: <Home className="h-6 w-6" />
      },
      {
        title: "Roth IRA Calculator",
        description: "Calculate Roth IRA growth and retirement savings.",
        path: "/roth-ira-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "RV Loan Calculator",
        description: "Calculate RV loan payments and total costs.",
        path: "/rv-loan-calculator",
        icon: <Car className="h-6 w-6" />
      },
      {
        title: "Boat Loan Calculator",
        description: "Calculate boat loan payments and costs.",
        path: "/boat-loan-calculator",
        icon: <Anchor className="h-6 w-6" />
      },
      {
        title: "Pay Raise Calculator",
        description: "Calculate the impact of a salary increase.",
        path: "/pay-raise-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Options Profit Calculator",
        description: "Calculate potential options trading profits.",
        path: "/options-profit-calculator",
        icon: <TrendingUp className="h-6 w-6" />
      },
      {
        title: "Inflation Calculator",
        description: "Calculate inflation impact over time.",
        path: "/inflation-calculator",
        icon: <TrendingUp className="h-6 w-6" />
      },
      {
        title: "APY Calculator",
        description: "Calculate Annual Percentage Yield and returns.",
        path: "/apy-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Social Security Calculator",
        description: "Calculate estimated Social Security retirement benefits.",
        path: "/social-security-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Investment Calculator",
        description: "Calculate investment returns with compound interest.",
        path: "/investment-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "401(k) Calculator",
        description: "Plan your 401(k) retirement savings and employer match.",
        path: "/401k-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Credit Card Calculator",
        description: "Calculate credit card payoff time and total interest.",
        path: "/credit-card-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Motorcycle Loan Calculator",
        description: "Calculate motorcycle loan payments and total costs.",
        path: "/motorcycle-loan-calculator",
        icon: <Car className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Health & Fitness",
    path: "/health",
    calculators: [
      {
        title: "Pregnancy Calculator",
        description: "Calculate due date and track pregnancy milestones.",
        path: "/pregnancy-calculator",
        icon: <Baby className="h-6 w-6" />
      },
      {
        title: "Biological Age Calculator",
        description: "Calculate your biological age based on health and lifestyle factors.",
        path: "/biological-age-calculator",
        icon: <Activity className="h-6 w-6" />
      },
      {
        title: "Blood Type Calculator",
        description: "Calculate blood type inheritance and compatibility.",
        path: "/blood-type-calculator",
        icon: <Activity className="h-6 w-6" />
      },
      {
        title: "Peptide Calculator",
        description: "Calculate peptide properties and molecular weight.",
        path: "/peptide-calculator",
        icon: <Dna className="h-6 w-6" />
      },
      {
        title: "BMI Calculator",
        description: "Calculate Body Mass Index and weight category.",
        path: "/bmi-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "BMR Calculator",
        description: "Calculate Basal Metabolic Rate and caloric needs.",
        path: "/bmr-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "TDEE Calculator",
        description: "Calculate Total Daily Energy Expenditure.",
        path: "/tdee-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "Calorie Calculator",
        description: "Calculate daily caloric needs and macros.",
        path: "/calorie-calculator",
        icon: <Apple className="h-6 w-6" />
      },
      {
        title: "Macro Calculator",
        description: "Calculate optimal macronutrient ratios.",
        path: "/macro-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "One Rep Max Calculator",
        description: "Calculate your one rep maximum.",
        path: "/one-rep-max-calculator",
        icon: <Dumbbell className="h-6 w-6" />
      },
      {
        title: "BAC Calculator",
        description: "Calculate blood alcohol content estimation.",
        path: "/bac-calculator",
        icon: <Activity className="h-6 w-6" />
      },
      {
        title: "Bra Size Calculator",
        description: "Calculate bra size and get fitting recommendations.",
        path: "/bra-size-calculator",
        icon: <Ruler className="h-6 w-6" />
      },
      {
        title: "Height Calculator",
        description: "Calculate predicted adult height.",
        path: "/height-calculator",
        icon: <Ruler className="h-6 w-6" />
      },
      {
        title: "Ovulation Calculator",
        description: "Track ovulation and fertile days.",
        path: "/ovulation-calculator",
        icon: <Calendar className="h-6 w-6" />
      },
      {
        title: "Max Bench Calculator",
        description: "Calculate maximum bench press.",
        path: "/max-bench-calculator",
        icon: <Dumbbell className="h-6 w-6" />
      },
      {
        title: "A1C Calculator",
        description: "Calculate A1C levels and blood glucose.",
        path: "/a1c-calculator",
        icon: <Activity className="h-6 w-6" />
      },
      {
        title: "Contact Lens Vertex Calculator",
        description: "Calculate contact lens power from spectacle prescription.",
        path: "/vertex-calculator",
        icon: <Eye className="h-6 w-6" />
      },
      {
        title: "Fiber Calculator",
        description: "Calculate daily fiber needs and recommendations.",
        path: "/fiber-calculator",
        icon: <Apple className="h-6 w-6" />
      },
      {
        title: "Caffeine Calculator",
        description: "Track caffeine intake and metabolism.",
        path: "/caffeine-calculator",
        icon: <Coffee className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Education",
    path: "/education",
    calculators: [
      {
        title: "SAT Calculator",
        description: "Calculate SAT scores and get recommendations.",
        path: "/sat-calculator",
        icon: <GraduationCap className="h-6 w-6" />
      },
      {
        title: "Grade Calculator",
        description: "Calculate weighted grades and final scores.",
        path: "/grade-calculator",
        icon: <GraduationCap className="h-6 w-6" />
      },
      {
        title: "GPA Calculator",
        description: "Calculate Grade Point Average.",
        path: "/gpa-calculator",
        icon: <GraduationCap className="h-6 w-6" />
      },
      {
        title: "Graduation Year Calculator",
        description: "Calculate expected graduation date and academic milestones.",
        path: "/graduation-year-calculator",
        icon: <GraduationCap className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Math",
    path: "/math",
    calculators: [
      {
        title: "Area Between Curves Calculator",
        description: "Calculate the area between two functions",
        path: "/area-between-curves-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Simpson's Rule Calculator",
        description: "Calculate definite integrals using Simpson's Rule.",
        path: "/simpsons-rule-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Atomic Mass Calculator",
        description: "Calculate molecular weight and empirical formulas.",
        path: "/atomic-mass-calculator",
        icon: <Atom className="h-6 w-6" />
      },
      {
        title: "Centroid Calculator",
        description: "Calculate geometric center and center of mass.",
        path: "/centroid-calculator",
        icon: <Move className="h-6 w-6" />
      },
      {
        title: "L'Hôpital's Rule Calculator",
        description: "Evaluate limits using L'Hôpital's Rule.",
        path: "/lhopital-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "X-Intercept Calculator",
        description: "Find roots of polynomial functions.",
        path: "/x-intercept-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "pH Calculator",
        description: "Calculate pH, pOH, and ion concentrations.",
        path: "/ph-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Specific Heat Calculator",
        description: "Calculate heat energy and thermal properties.",
        path: "/specific-heat-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Fraction Calculator",
        description: "Calculate fraction operations with steps.",
        path: "/fraction-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Time Calculator",
        description: "Calculate time differences and conversions.",
        path: "/time-calculator",
        icon: <Clock className="h-6 w-6" />
      },
      {
        title: "Time Clock Calculator",
        description: "Track work hours and calculate pay.",
        path: "/time-clock-calculator",
        icon: <Clock className="h-6 w-6" />
      },
      {
        title: "Projectile Motion Calculator",
        description: "Calculate trajectory and motion of projectiles",
        path: "/projectile-motion-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "WPM Calculator",
        description: "Calculate typing speed in words per minute",
        path: "/wpm-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Download Time Calculator",
        description: "Calculate file download time based on connection speed",
        path: "/download-time-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Chemistry Calculator",
        description: "Calculate chemical equations, molarity, and stoichiometry",
        path: "/chemistry-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Mole Calculator",
        description: "Calculate moles, grams, and molarity conversions",
        path: "/mole-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Protein Calculator",
        description: "Calculate daily protein needs and meal planning",
        path: "/protein-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "Maintenance Calorie Calculator",
        description: "Calculate daily maintenance calories and macros",
        path: "/maintenance-calorie-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "Bulking Calculator",
        description: "Calculate calories and macros for muscle gain",
        path: "/bulking-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "Gear Ratio Calculator",
        description: "Calculate mechanical gear ratios and speed reduction",
        path: "/gear-ratio-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "LBM Calculator",
        description: "Calculate lean body mass and body composition",
        path: "/lbm-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "Cutting Calculator",
        description: "Calculate calorie deficit for fat loss",
        path: "/cutting-calculator",
        icon: <Scale className="h-6 w-6" />
      },
      {
        title: "CAGR Calculator",
        description: "Calculate Compound Annual Growth Rate",
        path: "/cagr-calculator",
        icon: <TrendingUp className="h-6 w-6" />
      },
      {
        title: "Stamp Duty Calculator",
        description: "Calculate stamp duty land tax for property purchases",
        path: "/stamp-duty-calculator",
        icon: <Home className="h-6 w-6" />
      },
      {
        title: "Median Calculator",
        description: "Calculate median, mean, and mode.",
        path: "/median-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Inflection Point Calculator",
        description: "Find points where concavity changes in functions",
        path: "/inflection-point-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "RREF Calculator",
        description: "Calculate Row Reduced Echelon Form.",
        path: "/rref-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Square Root Calculator",
        description: "Calculate square roots with multiple methods.",
        path: "/square-root-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Derivative Calculator",
        description: "Calculate derivatives with steps.",
        path: "/derivative-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Differential Equation Calculator",
        description: "Solve differential equations step by step.",
        path: "/differential-equation-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Standard Deviation Calculator",
        description: "Calculate standard deviation and statistics.",
        path: "/standard-deviation-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Partial Fraction Calculator",
        description: "Decompose rational expressions.",
        path: "/partial-fraction-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Rounding Calculator",
        description: "Round numbers using various methods.",
        path: "/rounding-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Z-Score Calculator",
        description: "Calculate z-scores and probabilities.",
        path: "/z-score-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Percentage Calculator",
        description: "Calculate percentages and percentage changes.",
        path: "/percentage-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Midpoint Calculator",
        description: "Calculate midpoint between two coordinates.",
        path: "/midpoint-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Slope Calculator",
        description: "Calculate slope and angle between points.",
        path: "/slope-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Integral Calculator",
        description: "Calculate antiderivatives and definite integrals.",
        path: "/integral-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Time Duration Calculator",
        description: "Calculate duration between times with breaks.",
        path: "/time-duration-calculator",
        icon: <Clock className="h-6 w-6" />
      },
      {
        title: "Factoring Calculator",
        description: "Factor polynomial expressions step by step.",
        path: "/factoring-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Percentage Increase Calculator",
        description: "Calculate percentage changes between values.",
        path: "/percentage-increase-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "GCD Calculator",
        description: "Calculate Greatest Common Divisor of numbers.",
        path: "/gcd-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "T-Score Calculator",
        description: "Calculate t-scores and statistical significance.",
        path: "/t-score-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "ASQ Calculator",
        description: "Calculate acceptance sampling quality metrics.",
        path: "/asq-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Golden Ratio Calculator",
        description: "Calculate proportions using the divine ratio (φ).",
        path: "/golden-ratio-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "FOIL Calculator",
        description: "Multiply binomials using the FOIL method",
        path: "/foil-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Heron's Formula Calculator",
        description: "Calculate triangle area using side lengths",
        path: "/herons-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Wronskian Calculator",
        description: "Calculate Wronskian determinant for linear independence",
        path: "/wronskian-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Torque Calculator",
        description: "Calculate rotational force and moment",
        path: "/torque-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Fog Calculator",
        description: "Calculate fog probability and visibility conditions",
        path: "/fog-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Cone Calculator",
        description: "Calculate cone volume, surface area, and dimensions",
        path: "/cone-calculator",
        icon: <Calculator className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Construction",
    path: "/construction",
    calculators: [
      {
        title: "Tree Removal Calculator",
        description: "Calculate tree removal costs and requirements.",
        path: "/tree-removal-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Hole Calculator",
        description: "Calculate excavation volume and materials needed.",
        path: "/hole-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Paver Calculator",
        description: "Calculate paver quantities and layout patterns.",
        path: "/paver-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Duct Calculator",
        description: "Calculate HVAC duct sizes and airflow requirements.",
        path: "/duct-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Plant Spacing Calculator",
        description: "Calculate optimal plant spacing and garden layout.",
        path: "/plant-spacing-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Roof Pitch Calculator",
        description: "Calculate roof slope and material requirements.",
        path: "/roof-pitch-calculator",
        icon: <Ruler className="h-6 w-6" />
      },
      {
        title: "Concrete Calculator",
        description: "Calculate concrete volume and materials needed.",
        path: "/concrete-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Square Footage Calculator",
        description: "Calculate area and material requirements.",
        path: "/square-footage-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Mulch Calculator",
        description: "Calculate mulch needed for landscaping.",
        path: "/mulch-calculator",
        icon: <Trees className="h-6 w-6" />
      },
      {
        title: "Drywall Calculator",
        description: "Calculate drywall materials needed.",
        path: "/drywall-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Pool Salt Calculator",
        description: "Calculate pool salt system requirements.",
        path: "/pool-salt-calculator",
        icon: <Waves className="h-6 w-6" />
      },
      {
        title: "Gravel Calculator",
        description: "Calculate gravel needed for your project.",
        path: "/gravel-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Fence Calculator",
        description: "Calculate fence materials and costs.",
        path: "/fence-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Stair Calculator",
        description: "Calculate stair dimensions and materials.",
        path: "/stair-calculator",
        icon: <ArrowDownRight className="h-6 w-6" />
      },
      {
        title: "Sand Calculator",
        description: "Calculate sand needed for your project.",
        path: "/sand-calculator",
        icon: <Construction className="h-6 w-6" />
      },
      {
        title: "Topsoil Calculator",
        description: "Calculate topsoil needed for landscaping.",
        path: "/topsoil-calculator",
        icon: <Construction className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Sports & Gaming",
    path: "/sports",
    calculators: [
      {
        title: "DIN Calculator",
        description: "Calculate ski binding release settings",
        path: "/din-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Blackjack Calculator",
        description: "Calculate optimal blackjack strategy and odds.",
        path: "/blackjack-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Batting Average Calculator",
        description: "Calculate baseball batting average and statistics.",
        path: "/batting-average-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Parlay Calculator",
        description: "Calculate parlay odds and potential payouts.",
        path: "/parlay-calculator",
        icon: <Target className="h-6 w-6" />
      },
      {
        title: "Betting Odds Calculator",
        description: "Convert betting odds and calculate payouts.",
        path: "/betting-odds-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Arrow Speed Calculator",
        description: "Calculate arrow speed and kinetic energy.",
        path: "/arrow-speed-calculator",
        icon: <Target className="h-6 w-6" />
      },
      {
        title: "ERA Calculator",
        description: "Calculate baseball ERA and pitching stats.",
        path: "/era-calculator",
        icon: <Target className="h-6 w-6" />
      },
      {
        title: "Lottery Tax Calculator",
        description: "Calculate taxes on lottery winnings.",
        path: "/lottery-tax-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Snowboard Size Calculator",
        description: "Calculate your ideal snowboard size and specs.",
        path: "/snowboard-size-calculator",
        icon: <Snowflake className="h-6 w-6" />
      },
      {
        title: "Poker Odds Calculator",
        description: "Calculate poker hand odds and probabilities.",
        path: "/poker-odds-calculator",
        icon: <Calculator className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Lifestyle",
    path: "/lifestyle",
    calculators: [
      {
        title: "Factorio Calculator",
        description: "Calculate production ratios and factory requirements.",
        path: "/factorio-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Wedding Cash Gift Calculator",
        description: "Calculate appropriate wedding gift amounts",
        path: "/wedding-cash-gift-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Cooking Calculator",
        description: "Scale recipes and convert cooking measurements.",
        path: "/cooking-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Baby Eye Color Calculator",
        description: "Predict your baby's eye color based on genetics.",
        path: "/baby-eye-color-calculator",
        icon: <Baby className="h-6 w-6" />
      },
      {
        title: "Ring Size Calculator",
        description: "Calculate ring size and international conversions.",
        path: "/ring-size-calculator",
        icon: <Gem className="h-6 w-6" />
      },
      {
        title: "Rug Size Calculator",
        description: "Calculate ideal rug dimensions for any room.",
        path: "/rug-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Tattoo Cost Calculator",
        description: "Calculate tattoo costs based on size and complexity.",
        path: "/tattoo-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Moon Phase Calculator",
        description: "Calculate moon phases and lunar events.",
        path: "/moon-phase-calculator",
        icon: <Moon className="h-6 w-6" />
      },
      {
        title: "Age Calculator",
        description: "Calculate exact age and important dates.",
        path: "/age-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Due Date Calculator",
        description: "Calculate pregnancy due date and milestones.",
        path: "/due-date-calculator",
        icon: <Baby className="h-6 w-6" />
      },
      {
        title: "Tip Calculator",
        description: "Calculate tips and split bills.",
        path: "/tip-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Gas Calculator",
        description: "Calculate fuel costs and mileage.",
        path: "/gas-calculator",
        icon: <Fuel className="h-6 w-6" />
      },
      {
        title: "Snow Day Calculator",
        description: "Calculate probability of snow day cancellation.",
        path: "/snow-day-calculator",
        icon: <Snowflake className="h-6 w-6" />
      },
      {
        title: "Death Calculator",
        description: "Calculate life expectancy based on factors.",
        path: "/death-calculator",
        icon: <Skull className="h-6 w-6" />
      },
      {
        title: "Numerology Calculator",
        description: "Calculate numerological significance.",
        path: "/numerology-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Gematria Calculator",
        description: "Calculate gematria values of words.",
        path: "/gematria-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Puppy Weight Calculator",
        description: "Calculate adult weight predictions.",
        path: "/puppy-weight-calculator",
        icon: <Dog className="h-6 w-6" />
      },
      {
        title: "BAH Calculator",
        description: "Calculate Basic Allowance for Housing.",
        path: "/bah-calculator",
        icon: <Building2 className="h-6 w-6" />
      },
      {
        title: "Bottleneck Calculator",
        description: "Calculate PC component bottlenecks.",
        path: "/bottleneck-calculator",
        icon: <Cpu className="h-6 w-6" />
      },
      {
        title: "Dog Pregnancy Calculator",
        description: "Calculate dog pregnancy timeline.",
        path: "/dog-pregnancy-calculator",
        icon: <Dog className="h-6 w-6" />
      },
      {
        title: "Cat Age Calculator",
        description: "Calculate cat age in human years.",
        path: "/cat-age-calculator",
        icon: <Cat className="h-6 w-6" />
      },
      {
        title: "Wedding Alcohol Calculator",
        description: "Calculate alcohol for wedding reception.",
        path: "/wedding-alcohol-calculator",
        icon: <Wine className="h-6 w-6" />
      },
      {
        title: "Male Delusion Calculator",
        description: "Calculate dating market expectations vs reality.",
        path: "/male-delusion-calculator",
        icon: <Brain className="h-6 w-6" />
      },
      {
        title: "Gratuity Calculator",
        description: "Calculate appropriate tips and gratuity.",
        path: "/gratuity-calculator",
        icon: <DollarSign className="h-6 w-6" />
      },
      {
        title: "Wordle Calculator",
        description: "Analyze word patterns and get Wordle suggestions.",
        path: "/wordle-calculator",
        icon: <Brain className="h-6 w-6" />
      },
      {
        title: "Aquarium Calculator",
        description: "Calculate aquarium volume, stocking, and maintenance.",
        path: "/aquarium-calculator",
        icon: <Waves className="h-6 w-6" />
      },
      {
        title: "VA Disability Calculator",
        description: "Calculate VA disability compensation and combined ratings.",
        path: "/va-disability-calculator",
        icon: <Briefcase className="h-6 w-6" />
      },
      {
        title: "Pizza Dough Calculator",
        description: "Calculate perfect pizza dough ingredients and timing.",
        path: "/pizza-dough-calculator",
        icon: <Apple className="h-6 w-6" />
      },
      {
        title: "Love Calculator",
        description: "Calculate compatibility and relationship potential.",
        path: "/love-calculator",
        icon: <Heart className="h-6 w-6" />
      },
      {
        title: "Alimony Calculator",
        description: "Calculate estimated alimony payments and duration.",
        path: "/alimony-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Diamond Calculator",
        description: "Calculate diamond value based on the 4 Cs.",
        path: "/diamond-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Pool Volume Calculator",
        description: "Calculate pool volume and chemical requirements.",
        path: "/pool-volume-calculator",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Dog Age Calculator",
        description: "Calculate dog age in human years.",
        path: "/dog-age-calculator",
        icon: <Dog className="h-6 w-6" />
      },
      {
        title: "IP Calculator",
        description: "Calculate IP network address and subnet ranges.",
        path: "/ip-calculator",
        icon: <Network className="h-6 w-6" />
      },
      {
        title: "Subnet Calculator",
        description: "Calculate IP subnets and network addresses.",
        path: "/subnet-calculator",
        icon: <Network className="h-6 w-6" />
      },
      {
        title: "OSRS Skill Calculator",
        description: "Calculate Old School RuneScape skill training requirements.",
        path: "/skill-calculator-osrs",
        icon: <Calculator className="h-6 w-6" />
      },
      {
        title: "Vorici Calculator",
        description: "Calculate optimal Path of Exile socket coloring strategies.",
        path: "/vorici-calculator",
        icon: <Calculator className="h-6 w-6" />
      }
    ]
  }
];