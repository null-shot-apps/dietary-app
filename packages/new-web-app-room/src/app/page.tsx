'use client';

import { useState } from 'react';

interface FoodEntry {
  id: string;
  name: string;
  description: string;
  date: string;
  mealCategory: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default function Dashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'goals'>('dashboard');

  // Daily goals
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000);
  const [dailyProteinGoal, setDailyProteinGoal] = useState(150); // grams
  const [dailyCarbsGoal, setDailyCarbsGoal] = useState(200); // grams
  const [dailyFatsGoal, setDailyFatsGoal] = useState(65); // grams

  // Food entries
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  
  // Form state
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodDate, setFoodDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealCategory, setMealCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [foodCalories, setFoodCalories] = useState('');
  const [foodProtein, setFoodProtein] = useState('');
  const [foodCarbs, setFoodCarbs] = useState('');
  const [foodFats, setFoodFats] = useState('');

  // Calculate current totals from food entries for today
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = foodEntries.filter(entry => entry.date === today);
  
  const currentCalories = todayEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const currentProtein = todayEntries.reduce((sum, entry) => sum + entry.protein, 0);
  const currentCarbs = todayEntries.reduce((sum, entry) => sum + entry.carbs, 0);
  const currentFats = todayEntries.reduce((sum, entry) => sum + entry.fats, 0);

  // Calculate remaining and percentages
  const remainingCalories = dailyCalorieGoal - currentCalories;
  const proteinPercent = (currentProtein / dailyProteinGoal) * 100;
  const carbsPercent = (currentCarbs / dailyCarbsGoal) * 100;
  const fatsPercent = (currentFats / dailyFatsGoal) * 100;
  const caloriesPercent = (currentCalories / dailyCalorieGoal) * 100;

  // Handle form submission
  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      name: foodName,
      description: foodDescription,
      date: foodDate,
      mealCategory: mealCategory,
      calories: parseFloat(foodCalories) || 0,
      protein: parseFloat(foodProtein) || 0,
      carbs: parseFloat(foodCarbs) || 0,
      fats: parseFloat(foodFats) || 0,
    };
    
    setFoodEntries([...foodEntries, newEntry]);
    
    // Reset form
    setFoodName('');
    setFoodDescription('');
    setFoodDate(new Date().toISOString().split('T')[0]);
    setMealCategory('breakfast');
    setFoodCalories('');
    setFoodProtein('');
    setFoodCarbs('');
    setFoodFats('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nutrition Dashboard</h1>
          <p className="text-slate-300">Track your daily calories and macros</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'goals'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Goals
          </button>
        </div>

        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <>
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

        {/* Add Food Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mt-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Log Food Intake</h2>
          
          <form onSubmit={handleAddFood} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Food Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Food Name</label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Grilled Chicken"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={foodDate}
                  onChange={(e) => setFoodDate(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Meal Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Meal Category</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setMealCategory(category)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      mealCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 border border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add notes about your meal..."
                rows={3}
              />
            </div>

            {/* Nutrition Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Calories</label>
                <input
                  type="number"
                  value={foodCalories}
                  onChange={(e) => setFoodCalories(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Protein (g)</label>
                <input
                  type="number"
                  value={foodProtein}
                  onChange={(e) => setFoodProtein(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Carbs (g)</label>
                <input
                  type="number"
                  value={foodCarbs}
                  onChange={(e) => setFoodCarbs(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fats (g)</label>
                <input
                  type="number"
                  value={foodFats}
                  onChange={(e) => setFoodFats(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Add Food Entry
            </button>
          </form>
        </div>

        {/* Food Entries List */}
        {todayEntries.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mt-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6">Today's Meals</h2>
            
            <div className="space-y-4">
              {todayEntries.map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{entry.name}</h3>
                      <span className="text-xs text-purple-400 uppercase tracking-wide">
                        {entry.mealCategory}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{entry.calories}</div>
                      <div className="text-xs text-slate-400">calories</div>
                    </div>
                  </div>
                  
                  {entry.description && (
                    <p className="text-sm text-slate-300 mb-3">{entry.description}</p>
                  )}
                  
                  <div className="flex gap-4 text-sm">
                    <span className="text-blue-400">Protein: {entry.protein}g</span>
                    <span className="text-yellow-400">Carbs: {entry.carbs}g</span>
                    <span className="text-pink-400">Fats: {entry.fats}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </>
        )}

        {/* Goals Tab Content */}
        {activeTab === 'goals' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6">Set Your Daily Goals</h2>
            
            <div className="space-y-6">
              {/* Calorie Goal */}
              <div>
                <label className="block text-sm font-medium mb-2">Daily Calorie Goal</label>
                <input
                  type="number"
                  value={dailyCalorieGoal}
                  onChange={(e) => setDailyCalorieGoal(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="2000"
                />
                <p className="text-sm text-slate-400 mt-1">Recommended: 1800-2500 calories/day</p>
              </div>

              {/* Protein Goal */}
              <div>
                <label className="block text-sm font-medium mb-2">Daily Protein Goal (grams)</label>
                <input
                  type="number"
                  value={dailyProteinGoal}
                  onChange={(e) => setDailyProteinGoal(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="150"
                />
                <p className="text-sm text-slate-400 mt-1">Recommended: 0.8-1.2g per kg of body weight</p>
              </div>

              {/* Carbs Goal */}
              <div>
                <label className="block text-sm font-medium mb-2">Daily Carbs Goal (grams)</label>
                <input
                  type="number"
                  value={dailyCarbsGoal}
                  onChange={(e) => setDailyCarbsGoal(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="200"
                />
                <p className="text-sm text-slate-400 mt-1">Recommended: 45-65% of total calories</p>
              </div>

              {/* Fats Goal */}
              <div>
                <label className="block text-sm font-medium mb-2">Daily Fats Goal (grams)</label>
                <input
                  type="number"
                  value={dailyFatsGoal}
                  onChange={(e) => setDailyFatsGoal(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  placeholder="65"
                />
                <p className="text-sm text-slate-400 mt-1">Recommended: 20-35% of total calories</p>
              </div>

              {/* Save Button */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Save Goals & Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}











