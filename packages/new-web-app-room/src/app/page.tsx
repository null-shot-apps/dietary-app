'use client';

import { useState } from 'react';

export default function Dashboard() {
  // Daily goals
  const dailyCalorieGoal = 2000;
  const dailyProteinGoal = 150; // grams
  const dailyCarbsGoal = 200; // grams
  const dailyFatsGoal = 65; // grams

  // Current intake (example data - will be dynamic later)
  const [currentCalories, setCurrentCalories] = useState(1250);
  const [currentProtein, setCurrentProtein] = useState(85);
  const [currentCarbs, setCurrentCarbs] = useState(120);
  const [currentFats, setCurrentFats] = useState(42);

  // Calculate remaining and percentages
  const remainingCalories = dailyCalorieGoal - currentCalories;
  const proteinPercent = (currentProtein / dailyProteinGoal) * 100;
  const carbsPercent = (currentCarbs / dailyCarbsGoal) * 100;
  const fatsPercent = (currentFats / dailyFatsGoal) * 100;
  const caloriesPercent = (currentCalories / dailyCalorieGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nutrition Dashboard</h1>
          <p className="text-slate-300">Track your daily calories and macros</p>
        </header>

        {/* Main Calorie Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold mb-2">{currentCalories}</div>
            <div className="text-xl text-slate-300">calories consumed</div>
          </div>
          
          {/* Calorie Progress Bar */}
          <div className="relative w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(caloriesPercent, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-lg">
            <span className="text-slate-300">Remaining</span>
            <span className={`font-semibold ${remainingCalories >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {remainingCalories >= 0 ? remainingCalories : 0} cal
            </span>
          </div>
          <div className="text-center text-sm text-slate-400 mt-2">
            Goal: {dailyCalorieGoal} cal/day
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Protein Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Protein</h3>
              <span className="text-2xl">🥩</span>
            </div>
            <div className="text-3xl font-bold mb-2">{currentProtein}g</div>
            <div className="text-sm text-slate-300 mb-3">of {dailyProteinGoal}g</div>
            
            {/* Progress Circle */}
            <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                style={{ width: `${Math.min(proteinPercent, 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-slate-400 mt-1">
              {Math.round(proteinPercent)}%
            </div>
          </div>

          {/* Carbs Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Carbs</h3>
              <span className="text-2xl">🍞</span>
            </div>
            <div className="text-3xl font-bold mb-2">{currentCarbs}g</div>
            <div className="text-sm text-slate-300 mb-3">of {dailyCarbsGoal}g</div>
            
            {/* Progress Circle */}
            <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${Math.min(carbsPercent, 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-slate-400 mt-1">
              {Math.round(carbsPercent)}%
            </div>
          </div>

          {/* Fats Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Fats</h3>
              <span className="text-2xl">🥑</span>
            </div>
            <div className="text-3xl font-bold mb-2">{currentFats}g</div>
            <div className="text-sm text-slate-300 mb-3">of {dailyFatsGoal}g</div>
            
            {/* Progress Circle */}
            <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-500"
                style={{ width: `${Math.min(fatsPercent, 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-slate-400 mt-1">
              {Math.round(fatsPercent)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

